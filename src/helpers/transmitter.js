import eventNamesValidation from '/helpers/event-names-validation';
import findReverseBranch from '/helpers/find-reverse-branch';

export default class Transmitter {
  constructor(eventsList = []) {
    this.EVENTS_STORE = new Map();
    this.EVENTS_LIST = [].concat(eventsList);
  }

  on(eventNames, dataKey, callback, once = false) {
    if (typeof dataKey === 'function') {
      callback = dataKey;
      dataKey = undefined;
    }

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

  once(eventNames, dataKey, callback) {
    this.on(eventNames, dataKey, callback, true);
  }

  emit(eventName, dataKey, data) {
    if (arguments.length === 2) {
      data = dataKey;
      dataKey = undefined;
    }

    const validEventNames = eventNamesValidation(eventName, this.EVENTS_LIST);
    const eventsList = findReverseBranch(validEventNames.pop(), this.EVENTS_LIST);

    for (const storedEvents of eventsList) {
      const callbacks = this.EVENTS_STORE.get(storedEvents);

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

  remove(eventNames, keyData, callback) {
    if (arguments.length === 2) {
      callback = keyData;
      keyData = undefined;
    }

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
