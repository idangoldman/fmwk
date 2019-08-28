import Transmitter from '../helpers/transmitter';

const DOM_EVENTS_LIST = [
  'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'focusin',
  'focusout', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter',
  'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize',
  'scroll', 'select', 'submit', 'reset'
];

export default class Events extends Transmitter {
  constructor(element) {
    super(DOM_EVENTS_LIST);
    this.element = element;
  }

  on(name, callback) {
    this.insert(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.raw.addEventListener(type, listener, false);
    });
  }

  off(name, callback) {
    this.remove(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.raw.removeEventListener(type, listener, false);
    });
  }

  once(name, callback) {
    this.insert(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.raw.addEventListener(type, (event) => {
        this.remove(this.element.toString, type, listener);
        listener(event);
      }, { once: true, capture: false });
    });
  }
}
