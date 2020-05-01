import { component, local } from 'feature';

component('body', '/page', ({ element, events }) => {
  // What code should be written here?

  element.re_draw();
  element.render();
  element.render(local.page);

  events.on('click', event => {});
  events.on('click', '#subscribe-button, .click-button', event => {});
  events.on('click', '#subscribe-button, .click-button', true, event => {});
  events.on('click', '#subscribe-button', { preventDefault: true }, event => {});
  // events.on(['click', '#subscribe-button', preventDefault = false, stopPropagation = false], event => {});
  events.once('click', event => {});
  events.fire('focus', event => {});
  events.off('focus', event => {});
});
