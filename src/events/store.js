const EVENTS_STORE = new Map();
const EVENTS_LIST = new Set([
  'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'focusin',
  'focusout', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter',
  'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize',
  'scroll', 'select', 'submit', 'reset'
]);

const validateEventNames = (name) => {
  let names = name.split(' ');

  names.every(validName => {
    if (!EVENTS_LIST.has(validName)) {
      throw new Error(`- No DOM event was found with '${validName}' name.`);
    }
  });

  return names;
};

export const insert = (selector = '', eventNames = [], callback = undefined) => {
  const events = EVENTS_STORE.get(selector) || new Map();
  const names = validateEventNames(eventNames);
  const output = [];

  names.forEach((name) => {
    if (events.size && events.has(name)) {
      const event = events.get(name);

      if (!event.has(callback)) {
        event.add(callback);
        events.set(name, event);
      }
    } else {
      events.set(name, new Set([callback]));
    }

    output.push([name, callback]);
  });

  if (events.size) {
    EVENTS_STORE.set(selector, events);
  }

  return output;
};

export const remove = (selector = '', eventNames = [], callback = undefined) => {
  const events = EVENTS_STORE.get(selector);
  const output = [];

  if (events) {
    if (eventNames.length) {
      const names = validateEventNames(eventNames);

      names.forEach((name) => {
        if (events.has(name)) {
          const event = events.get(name);

          if (!callback) {
            event.forEach(value => output.push([name, value]));
            event.clear();
          } else if (event.has(callback)) {
            output.push([name, callback]);
            event.delete(callback);
          }

          if (event.size) {
            events.set(name, event);
          } else {
            events.delete(name);
          }
        }
      });
    } else {
      events.forEach((callbacks, event) => {
        callbacks.forEach((_callback) => {
          output.push([event, _callback]);
        });
      });

      events.clear();
    }

    if (events.size) {
      EVENTS_STORE.set(selector, events);
    } else {
      EVENTS_STORE.delete(selector);
    }
  }

  return output;
};
