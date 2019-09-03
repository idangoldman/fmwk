import eventNamesValidation from '/helpers/event-names-validation';
import { DOM_EVENTS_LIST } from '/common/constants';

const EVENTS_STORE = new Map();

export const insert = (selector = '', eventNames = [], callback = undefined) => {
  const events = EVENTS_STORE.get(selector) || new Map();
  const names = eventNamesValidation(eventNames, DOM_EVENTS_LIST);
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
      const names = eventNamesValidation(eventNames, DOM_EVENTS_LIST);

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
