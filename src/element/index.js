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
    this.instance = undefined;

    /**
     * An instance of the query selector string.
     * @member {QuerySelector}
     * @private
     */
    this.selector = selector;

    if (!selector.length) {
      throw new Error('- No query selector passed.');
    } else {
      this.instance = document.querySelector(selector);

      if (this.instance === null) {
        throw new Error(`- No HTML element was found with '${selector}' selector.`);
      }
    }
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
