const Element = (selector = '') => {
  let element;

  if (!selector.length) {
    throw new Error(`- No HTML selectors were passed.`);
  } else {
    element = document.querySelector(selector)

    if (element === null) {
      throw new Error(`- No HTML element was found with '${selector}' selector.`);
    }
  }

  return element;
};

export default Object.freeze(Element);
