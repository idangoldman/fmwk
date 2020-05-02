// @flow

import type { QuerySelectorType } from 'helpers/flow-types';

export type ComponentElementType = {|
  instance: ?HTMLElement,
  selector: QuerySelectorType,
  constructor(selector: QuerySelectorType): void,
  get toString(): QuerySelectorType
|}

class Element {
  instance: ?HTMLElement;
  selector: QuerySelectorType;

  constructor(selector: QuerySelectorType): void {
    if (!selector) {
      throw new Error('- No query selector passed.');
    } else {
      this.selector = selector;
      this.instance = document.querySelector(this.selector);

      if (this.instance === null) {
        throw new Error(`- No HTML element was found with '${selector}' selector.`);
      }
    }
  }

  get toString(): QuerySelectorType {
    return this.selector;
  }
}

export default Element;
