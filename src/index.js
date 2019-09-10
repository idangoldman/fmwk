import Element from '/element';
import Events from '/events';
import Storage from '/storage';
import onDOMContentLoaded from '/dom-content-loaded';

const component = (selector, callback) => {
  onDOMContentLoaded(() => {
    const element = new Element(selector);
    const events = new Events(element);
    const local = new Storage('local');

    callback({ element, events, local });
  });
};

export default { component };
