const EVENTS_STORE = {};
const DOM_EVENTS = [
  'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'focusin',
  'focusout', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter',
  'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize',
  'scroll', 'select', 'submit', 'reset',
];

const validateTypes = (type) => {
  const types = type.split(' ');

  if (!types.every(validType => DOM_EVENTS.includes(validType))) {
    types = [];
  }

  return types;
};

const find = (selector = '', types = [], callback = undefined) => {
  const events = EVENTS_STORE[selector] || {};
  const types = validateTypes(types);

  types.forEach((type) => {
    if (callback) {
      EVENTS_STORE[selector] = events[type] ? events[type].push(callback) : [callback];
    }
  });

  return events;
};

// const remove = (selector = '', types = [], callback = undefined) => {};

export default class Events {
  constructor(element) {
    this.element = element;
  }

  on(_type, _callback) {
    find(this.element.toString, _type, _callback).forEach((type, callback) => {
      this.element.raw.addEventListener(type, callback, false);
    });
  }

  off(_type, _callback) {
    remove(this.element.toString, _type, _callback).forEach((type, callback) => {
      this.element.raw.removeEventListener(type, callback, false);
    });
  }

  once(_type, _callback) {
    find(this.element.toString, _type, _callback).forEach((type, callback) => {
      this.element.raw.addEventListener(type, function callOnce(event) {
        event.target.removeEventListener(type, callOnce, false);
        remove(this.element.toString, _type, _callback);
        callback(event);
      });
    });
  }
  //
  // trigger(type, data) {
  //   this.element.raw.;
  // }
}
