import Transmitter from 'helpers/transmitter'
import { STORAGE_EVENTS_LIST } from 'helpers/constants'

export default class Storage extends Transmitter {
  constructor(type = 'local', prefix = 'store-') {
    super(STORAGE_EVENTS_LIST)
    this.prefix = prefix
    this.store = window[type + 'Storage']
  }

  _get(key) {
    return JSON.parse(
      this.store.getItem(this.prefix + key)
    )
  }

  get(key) {
    const value = this._get(...arguments)

    this.emit('get', key, [key, value])
    return value
  }

  _set(key, value) {
    return this.store.setItem(
      this.prefix + key, JSON.stringify(value)
    )
  }

  set(key, value) {
    const result = this._set(...arguments)

    this.emit('set', key, [key, value])
    return result
  }

  remove(key) {
    const result = this.store.removeItem(this.prefix + key)
    this.emit('remove', key, [key, result])
    return result
  }

  clear() {
    this.emit('clear')
    return this.store.clear()
  }

  empty(key) {
    const oldValue = this._get(key)
    let newValue

    if (typeof oldValue === 'string') {
      newValue = ''
    } else if (Array.isArray(oldValue)) {
      newValue = []
    } else if (typeof oldValue === 'object') {
      newValue = {}
    }

    if (newValue !== oldValue) {
      this.emit('empty', key, [key, newValue])
      return this._set(key, newValue)
    }
  }
}
