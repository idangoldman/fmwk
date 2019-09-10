import Element from '/element';
import Events from '/events';
import LocalStorage from '/storage/local';
import onDOMContentLoaded from '/dom-content-loaded';

const component = (selector, callback) => {
  onDOMContentLoaded(() => {
    const element = new Element(selector);
    const events = new Events(element);
    const local = new LocalStorage();

    callback({ element, events, local });
  });
};

export default { component };
