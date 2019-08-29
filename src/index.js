import Element from '/element';
import Events from '/events';
import LocalStorage from '/local-storage';
import onDOMContentLoaded from '/dom-content-loaded';

const component = (selector, callback) => {
  onDOMContentLoaded(() => {
    const element = new Element(selector);
    const events = new Events(element);
    const locals = new LocalStorage();

    callback({ element, events, locals });
  });
};

export default { component };
