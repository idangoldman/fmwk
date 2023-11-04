import Transmitter from '#root/src/helpers/transmitter.js'
import { STORAGE_TYPES, STORE_EVENTS_LIST } from '#root/src/stores/constants.js'

export default class Storage extends Transmitter {
  #prefix = '';
  #separator = '';

  constructor(type = 'local', prefix = '', separator = '') {
    super(STORE_EVENTS_LIST);

    this.#prefix = prefix;
    this.#separator = separator;

    if (type in STORAGE_TYPES) {
      this.store = window[STORAGE_TYPES[type]];
    } else {
      throw new Error(`Unsupported storage type "${type}"`);
    }
  }

  get prefix() {
    return this.#prefix;
  }

  get separator() {
    return this.#separator;
  }

  getFullKey(key = '') {
    return `${this.prefix}${this.separator}${key}`;
  }

  get(key = '') {
    try {
      const fullKey = this.getFullKey(key);
      const value = JSON.parse(this.store.getItem(fullKey));
      this.emit('get', key, [key, value]);
      return value;
    } catch (error) {
      console.error(`Error getting key "${key}": ${error.message}`);
      return null;
    }
  }

  set(key = '', value = '') {
    try {
      const fullKey = this.getFullKey(key);
      this.store.setItem(fullKey, JSON.stringify(value));
      this.emit('set', key, [key, value]);
    } catch (error) {
      console.error(`Error setting key "${key}": ${error.message}`);
      throw error;
    }
  }

  remove(key = '') {
    const fullKey = this.getFullKey(key);
    this.store.removeItem(fullKey);
    this.emit('remove', key, [key, null]);
  }

  clear() {
    this.store.clear();
    this.emit('clear');
  }

  empty(key) {
    const oldValue = this.get(key);
    let newValue = this.constructor.getDefaultEmptyValue(oldValue);

    if (newValue !== undefined) {
      this.set(key, newValue);
      this.emit('empty', key, [key, newValue]);
    }
  }

  static getDefaultEmptyValue(value) {
    switch (typeof value) {
      case 'string':
        return '';
      case 'number':
        return 0;
      case 'boolean':
        return false;
      case 'object':
        if (value === null) return null;
        if (Array.isArray(value)) return [];
        return {};
      default:
        return null;
    }
  }
}
