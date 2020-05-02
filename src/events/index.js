// @flow

import { insert, remove } from 'events/store';
import type ComponentElementType from 'element';

type callbackType = (?mixed) => void;

export default class Events {
  element: ComponentElementType

  constructor(element: ComponentElementType): void {
    this.element = element;
  }

  on(name: string, callback: callbackType): void {
    const insertEventCallback = ([type, listener]: [string, callbackType]): void => {
      if (this.element.instance) {
        this.element.instance.addEventListener(type, listener, false);
      }
    };

    insert(this.element.toString, name, callback).forEach(insertEventCallback);
  }

  once(name: string, callback: callbackType): void {
    const insertOnceEventCallback = ([type, listener]: [string, callbackType]) => {
      if (this.element.instance) {
        this.element.instance.addEventListener(type, (event: Event) => {
          remove(this.element.toString, type, listener);
          listener(event);
        }, {
          once: true,
          capture: false
        });
      }
    };

    insert(this.element.toString, name, callback).forEach(insertOnceEventCallback);
  }

  off(name: string, callback?: callbackType): void {
    const removeEventCallback = ([type, listener]: [string, callbackType]): void => {
      if (this.element.instance) {
        this.element.instance.removeEventListener(type, listener, false);
      }
    };

    remove(this.element.toString, name, callback).forEach(removeEventCallback);
  }
}
