import Transmitter from '#root/src/helpers/transmitter.js'
import { STORE_EVENTS_LIST } from '#root/src/stores/constants.js'

export default class CookieStore extends Transmitter {
  static DAY_IN_MILLISECONDS = 86400000;
  static DEFAULT_OPTIONS = {
    domain: '',
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
  };

  #prefix = '';
  #separator = '';

  constructor(prefix = '', separator = '') {
    super(STORE_EVENTS_LIST);

    this.#prefix = prefix;
    this.#separator = separator;
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
      let value = null;
      const fullKey = this.getFullKey(key);
      const cookies = document.cookie.split(';');

      for (let cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.split('=');
        if (cookieKey.trim() === fullKey) {
          value = decodeURIComponent(cookieValue);
        }
      }

      this.emit('get', key, [key, value]);
      return value;
    } catch (error) {
      console.error(`Error getting cookie "${key}": ${error.message}`);
      return null;
    }
  }

  set(key = '', value = '', days = 7) {
    try {
      const fullKey = this.getFullKey(key);
      const newValue = encodeURIComponent(value || '');
      let options = { ...this.constructor.DEFAULT_OPTIONS };

      if (days) {
        const today = new Date();
        const nextTime = today.getTime() + days * this.constructor.DAY_IN_MILLISECONDS;
        options.expires = today.setTime(nextTime).toUTCString();
      }

      options = Object
        .entries(options)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

      document.cookie = `${fullKey}=${newValue}; ${options}`;
      this.emit('set', key, [key, value]);
    } catch (error) {
      console.error(`Error setting cookie "${key}": ${error.message}`);
      throw error;
    }
  }

  has(key = '') {
    try {
      const fullKey = this.getFullKey(key);
      const hasValue = this.get(fullKey) !== null;
      this.emit('has', key, [key, hasValue]);
      return hasValue;
    } catch (error) {
      console.error(`Error checking cookie "${key}": ${error.message}`);
      return false;
    }
  }

  remove(key = '') {
    this.set(key, '', -1);
    this.emit('remove', key, [key, null]);
  }

  clear() {
    const cookies = document.cookie.split('; ');

    for (let cookie of cookies) {
      const [cookieKey] = cookie.split('=');
      const fullKey = cookieKey.trim()
      this.remove(fullKey);
    }

    this.emit('clear');
  }

  empty(key) {
    this.set(key, '');
    this.emit('empty', key, [key, null]);
  }

  static getDefaultEmptyValue() {
    return '';
  }
}
