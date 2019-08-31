/**
* Wrapper class for DOM elements, initiate by passing a selector.
*/
class Element {
  /**
  * Creates an element instance of the query selector passed in.
  * @param {String} selector DOM query selector
  * @throws When no query selector passed.
  * @throws When no HTML elements were found via passed query selector.
  */
  constructor(selector = '') {
    /**
     * An instance of the DOM element.
     * @member {HTMLElement}
     * @private
     */
    this.element = undefined;

    /**
     * An instance of the query selector string.
     * @member {QuerySelector}
     * @private
     */
    this.selector = selector;

    if (!selector.length) {
      throw new Error('- No query selector passed.');
    } else {
      this.element = document.querySelector(selector);

      if (this.element === null) {
        throw new Error(`- No HTML element was found with '${selector}' selector.`);
      }
    }
  }

  /**
   * Get the instance of DOM element.
   * @returns {HTMLElement}
   */
  get raw() {
    return this.element;
  }

  /**
   * Get the query selector string.
   * @returns {QuerySelector}
   */
  get toString() {
    return this.selector;
  }
}

export default Element;
