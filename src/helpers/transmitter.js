import eventNamesValidation from '/helpers/event-names-validation';
import findReverseBranch from '/helpers/find-reverse-branch';

export default class Transmitter {
  constructor(eventsList = []) {
    this.EVENTS_STORE = new Map();
    this.EVENTS_LIST = [].concat(eventsList);
  }

  on(eventNames, callback, once = false) {
    const validEventNames = eventNamesValidation(eventNames, this.EVENTS_LIST);

    for (const eventName of validEventNames) {
      const callbacks = this.EVENTS_STORE.get(eventName) || new Set();

      if (!callbacks.has(callback)) {
        if (once) {
          const callbackOnce = (...args) => {
            callback(...args);
            this.remove(eventNames, callbackOnce);
          };
          callbacks.add(callbackOnce);
        } else {
          callbacks.add(callback);
        }

        this.EVENTS_STORE.set(eventName, callbacks);
      }
    }
  }

  once(eventNames, callback) {
    this.on(eventNames, callback, true);
  }

  emit(eventName, data) {
    const validEventName = eventNamesValidation(eventName, this.EVENTS_LIST).pop();
    const eventsList = findReverseBranch(validEventName, this.EVENTS_LIST);

    for (const storeEvent of eventsList) {
      const callbacks = this.EVENTS_STORE.get(storeEvent);

      if (callbacks && callbacks.size) {
        for (const callback of callbacks) {
          if (data) {
            callback.apply(null, data);
          } else {
            callback();
          }
        }
      }
    }
  }

  remove(eventNames, callback) {
    const validEventNames = eventNamesValidation(eventNames, this.EVENTS_LIST);

    for (const eventName of validEventNames) {
      const callbacks = this.EVENTS_STORE.get(eventName);

      if (callbacks && callbacks.has(callback)) {
        callbacks.delete(callback);
        this.EVENTS_STORE.set(eventName, callbacks);
      }
    }
  }
}
