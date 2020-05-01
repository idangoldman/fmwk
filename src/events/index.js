import { insert, remove } from 'events/store';

export default class Events {
  constructor(element) {
    this.element = element;
  }

  on(name, callback) {
    insert(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.instance.addEventListener(type, listener, false);
    });
  }

  off(name, callback) {
    remove(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.instance.removeEventListener(type, listener, false);
    });
  }

  once(name, callback) {
    insert(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.instance.addEventListener(type, (event) => {
        remove(this.element.toString, type, listener);
        listener(event);
      }, { once: true, capture: false });
    });
  }
}
