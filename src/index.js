import Element from './element';
import Events from './events';
import onDOMContentLoaded from './dom-content-loaded';

const feature = (selector, callback) => {
  onDOMContentLoaded(() => {
    const element = new Element(selector);
    const events = new Events(element);

    callback({ element, events });
  });
};

export default feature;
