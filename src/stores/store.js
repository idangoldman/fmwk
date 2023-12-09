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
      throw new Error(`Unsupported store type "${type}"`);
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
