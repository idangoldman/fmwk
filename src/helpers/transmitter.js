export default class Transmitter {
  constructor(eventNames = []) {
    this.STORE = new Map();
    this.EVENT_LIST = new Set(eventNames);
  }

  on() {
  }

  off() {
  }

  once() {
  }

  emit() {
  }

  insert(key = '', eventNames = [], callback = undefined) {
    let events = this.STORE.get(key) || new Map();
    let names = this.validateEventNames(eventNames);
    let output = [];

    names.forEach((name) => {
      if (events.size && events.has(name)) {
        let event = events.get(name);

        if (!event.has(callback)) {
          event.add(callback);
          events.set(name, event);
        }
      } else {
        events.set(name, new Set([callback]));
      }

      output.push([name, callback]);
    });

    if (events.size) {
      this.STORE.set(key, events);
    }

    return output;
  }

  remove(key = '', eventNames = [], callback = undefined) {
    const events = this.STORE.get(key);
    const output = [];

    if (events) {
      if (eventNames.length) {
        const names = this.validateEventNames(eventNames);

        names.forEach((name) => {
          if (events.has(name)) {
            const event = events.get(name);

            if (!callback) {
              event.forEach(value => output.push([name, value]));
              event.clear();
            } else if (event.has(callback)) {
              output.push([name, callback]);
              event.delete(callback);
            }

            if (event.size) {
              events.set(name, event);
            } else {
              events.delete(name);
            }
          }
        });
      } else {
        events.forEach((callbacks, event) => {
          callbacks.forEach((_callback) => {
            output.push([event, _callback]);
          });
        });

        events.clear();
      }

      if (events.size) {
        this.STORE.set(key, events);
      } else {
        this.STORE.delete(key);
      }
    }

    return output;
  }

  validateEventNames(eventName = '') {
    let names = eventName.split(' ');

    names.every(name => {
      if (!this.EVENT_LIST.has(name)) {
        throw new Error(`- No event was found with '${name}' name.`);
      }
    });

    return names;
  }
}
