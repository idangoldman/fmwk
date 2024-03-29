export default class Element {
  constructor(selector = '') {
    if (!selector.length) {
      throw new Error('No query selector passed')
    }

    this.selector = selector
    this.element = document.querySelector(selector)

    if (this.element === null) {
      throw new Error(`No HTML element was found with "${selector}" selector`)
    }
  }

  get raw() {
    return this.element
  }

  get toString() {
    return this.selector
  }
}
