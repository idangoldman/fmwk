export default class LocalStorage {
  constructor() {
    this.prefix = 'store-';
  }

  get(key) {
    return JSON.parse(
      window.localStorage.getItem(this.prefix + key)
    );
  }

  set(key, value) {
    return window.localStorage.setItem(
      this.prefix + key, JSON.stringify(value)
    );
  }

  remove(key) {
    return window.localStorage.removeItem(this.prefix + key)
  }

  clear() {
    return window.localStorage.clear();
  }

  empty(key) {
    let value = this.get(key);

    if (typeof value === 'string') {
      this.set(key, '');
    } else if (Array.isArray(value)) {
      this.set(key, []);
    } else if (typeof value === 'object') {
      this.set(key, {});
    }
  }
}
