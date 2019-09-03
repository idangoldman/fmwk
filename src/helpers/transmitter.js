import eventNamesValidation from '/helpers/event-names-validation';
// import findBranch from '/helpers/find-branch';

export default class Transmitter {
  constructor(eventsList = []) {
    this.EVENTS_STORE = new Map();
    this.EVENTS_LIST = [].concat(eventsList);
  }

  on(eventNames, callback, once = false) {
    eventNamesValidation(eventNames, this.EVENTS_LIST).forEach((eventName) => {
      const callbacks = this.EVENTS_STORE.get(eventName) || new Set();

      if (!callbacks.has(callback)) {
        if (once) {
          callback = () => {
            this.remove();
            callback();
          };
        }

        callbacks.add(callback);
        this.EVENTS_STORE.set(eventName, callbacks);
      }
    });
  }

  once(eventNames, callback) {
    this.on(eventNames, callback, true);
  }

  emit(eventNames) {
    // eventNamesValidation(eventNames, this.EVENTS_LIST).forEach((eventName) =>
    //   findBranch(eventName, this.EVENTS_LIST).forEach((newstuff) => {
    //     console.log(newstuff);
    //   })
    // );
    eventNamesValidation(eventNames, this.EVENTS_LIST).forEach((eventName) => {
      const callbacks = this.EVENTS_STORE.get(eventName);

      if (callbacks && callbacks.size) {
        for (const callback of callbacks) {
          callback();
        }
      }
    });
  }

  remove(eventNames, callback) {
    eventNamesValidation(eventNames, this.EVENTS_LIST).forEach((eventName) => {
      const callbacks = this.EVENTS_STORE.get(eventName);

      if (callbacks && callbacks.has(callback)) {
        callbacks.delete(callback);
      }
    });
  }
}
