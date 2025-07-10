import { component, router } from 'blah.ink/fmwk.js'

// Thats a pretty small router.
component('#home-menu', ({ events }) => {
  events.on('click', '.link', (event) => router.redirect(event.href))
})
