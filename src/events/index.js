import { insert, remove } from '#root/src/events/store.js'

export default class Events {
  constructor(element) {
    this.element = element
  }

  on(name, callback) {
    insert(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.raw.addEventListener(type, listener, false)
    })
  }

  off(name, callback) {
    remove(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.raw.removeEventListener(type, listener, false)
    })
  }

  once(name, callback) {
    insert(this.element.toString, name, callback).forEach(([type, listener]) => {
      this.element.raw.addEventListener(type, (event) => {
        remove(this.element.toString, type, listener)
        listener(event)
      }, { once: true, capture: false })
    })
  }
}
