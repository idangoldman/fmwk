import Element from 'element';
import Events from 'events';
import onDOMContentLoaded from 'dom-content-loaded';

export const component = (selector, callback) => {
  onDOMContentLoaded(() => {
    const element = new Element(selector);
    const events = new Events(element);

    callback({ element, events });
  });
};
