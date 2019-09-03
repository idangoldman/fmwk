import Transmitter from '/helpers/transmitter';
import { LOCALSTORAGE_EVENTS_LIST } from '/helpers/constants';

export default class LocalStorage extends Transmitter {
  constructor(prefix = 'store-') {
    super(LOCALSTORAGE_EVENTS_LIST);
    this.prefix = prefix;
  }

  _get(key) {
    return JSON.parse(
      window.localStorage.getItem(this.prefix + key)
    );
  }

  get(key) {
    const value = this._get(...arguments);

    this.emit('get', [key, value]);
    return value;
  }

  _set(key, value) {
    return window.localStorage.setItem(
      this.prefix + key, JSON.stringify(value)
    );
  }

  set(key, value) {
    const result = this._set(...arguments);

    this.emit('set', [key, value]);
    return result;
  }

  remove(key) {
    const result = window.localStorage.removeItem(this.prefix + key);

    this.emit('remove', [key, result]);
    return result;
  }

  clear() {
    this.emit('clear');
    return window.localStorage.clear();
  }

  empty(key) {
    const oldValue = this._get(key);
    let newValue;

    if (typeof oldValue === 'string') {
      newValue = '';
    } else if (Array.isArray(oldValue)) {
      newValue = [];
    } else if (typeof oldValue === 'object') {
      newValue = {};
    }

    if (newValue !== oldValue) {
      this.emit('empty', [key, newValue]);
      return this._set(key, newValue);
    }
  }
}
