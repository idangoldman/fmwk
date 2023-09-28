import eventNamesValidation from '#root/src/helpers/event-names-validation.js'
import findReverseBranch from '#root/src/helpers/find-reverse-branch.js'

export default class Transmitter {
  constructor(eventsList = []) {
    this.EVENTS_STORE = new Map()
    this.EVENTS_LIST = [].concat(eventsList)
  }

  on(eventNames, dataKey, callback, once) {
    if (typeof dataKey === 'function') {
      [dataKey, callback] = [undefined, dataKey]
    }

    const validEventNames = this._validateEventNames(eventNames)

    for (let eventName of validEventNames) {
      if (dataKey) {
        eventName = `${eventName}_${dataKey}`
      }

      this._insert(eventName, callback, once)
    }
  }

  off(eventNames, dataKey, callback) {
    if (typeof dataKey === 'function') {
      [dataKey, callback] = [undefined, dataKey]
    }

    if (eventNames) {
      const validEventNames = this._validateEventNames(eventNames)

      for (let eventName of validEventNames) {
        if (dataKey) {
          eventName = `${eventName}_${dataKey}`
        }

        this._remove(eventName, callback)
      }
    } else {
      this._remove()
    }
  }

  once(eventNames, dataKey, callback) {
    this.on(eventNames, dataKey, callback, true)
  }

  emit(eventName, dataKey, data) {
    if (typeof dataKey !== 'string') {
      [dataKey, data] = [undefined, dataKey]
    }

    this._validateEventNames(eventName)

    const eventsList = findReverseBranch(eventName, this.EVENTS_LIST)

    if (dataKey) {
      eventsList.unshift(`${eventName}_${dataKey}`)
    }

    for (const storedEvents of eventsList) {
      const callbacks = this.EVENTS_STORE.get(storedEvents)

      if (callbacks && callbacks.size) {
        for (const callback of callbacks) {
          if (data) {
            callback.apply(null, data)
          } else {
            callback()
          }
        }
      }
    }
  }

  _validateEventNames(eventNames) {
    return eventNamesValidation(eventNames, this.EVENTS_LIST)
  }

  _insert(eventName, callback, once) {
    const callbacks = this.EVENTS_STORE.get(eventName) || new Set()

    if (!callbacks.has(callback)) {
      if (once) {
        const callbackOnce = (...args) => {
          callback(...args)
          this._remove(eventName, callbackOnce)
        }
        callbacks.add(callbackOnce)
      } else {
        callbacks.add(callback)
      }

      this.EVENTS_STORE.set(eventName, callbacks)
    }
  }

  _remove(eventName, callback) {
    if (eventName && callback) {
      const callbacks = this.EVENTS_STORE.get(eventName)

      if (callbacks && callbacks.has(callback)) {
        callbacks.delete(callback)
        this.EVENTS_STORE.set(eventName, callbacks)
      }
    } else if (!eventName) {
      this.EVENTS_STORE.clear()
    } else if (!callback) {
      this.EVENTS_STORE.set(eventName, new Set())
    }
  }
}
