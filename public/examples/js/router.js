// import { component, cookie, session, local, pubsub, models } from 'feature';
import { component, router } from 'feature';

// Thats a pretty small router.
component('#home-menu', ({ element, events }) => {
  events.on('click', '.link', event => router.redirect(event.href));
});
