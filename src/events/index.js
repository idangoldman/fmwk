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

  // once(name, callback) {
  //   create(this.element.toString, name, callback).forEach(([type, listener]) => {
  //     this.element.raw.addEventListener(type, function callOnce(event) {
  //       event.target.removeEventListener(type, callOnce, false);
  //       remove(this.element.toString, name, listener);
  //       listener(event);
  //     });
  //   });
  // }
  //
  // trigger(name, data) {
  //   this.element.raw.;
  // }
}
