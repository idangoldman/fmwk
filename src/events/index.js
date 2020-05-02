// @flow

import type { CallbackType, EventListenerArgsType } from 'helpers/flow-types';
import type ComponentElementType from 'element';

import { insert, remove } from 'events/store';

export default class Events {
  element: ComponentElementType

  constructor(element: ComponentElementType): void {
    this.element = element;
  }

  on(name: string, callback: CallbackType): void {
    const insertEventCallback = ([type, listener]: EventListenerArgsType): void => {
      if (this.element.instance) {
        this.element.instance.addEventListener(type, listener, false);
      }
    };

    insert(this.element.toString, name, callback).forEach(insertEventCallback);
  }

  once(name: string, callback: CallbackType): void {
    const insertOnceEventCallback = ([type, listener]: EventListenerArgsType): void => {
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

  off(name: string, callback?: CallbackType): void {
    const removeEventCallback = ([type, listener]: EventListenerArgsType): void => {
      if (this.element.instance) {
        this.element.instance.removeEventListener(type, listener, false);
      }
    };

    remove(this.element.toString, name, callback).forEach(removeEventCallback);
  }
}
