import { create, remove } from './store';

export default class Events {
  constructor(element) {
    this.element = element;
  }

  on(name, callback) {
    create(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.raw.addEventListener(type, listener, false);
    });
  }

  off(name, callback) {
    remove(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.raw.removeEventListener(type, listener, false);
    });
  }

  once(name, callback) {
    create(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.raw.addEventListener(type, (event) => {
        remove(this.element.toString, type, listener);
        listener(event);
      }, { once: true, capture: false });
    });
  }

  // trigger(name, data) {
  //   this.element.raw.;
  // }
}
