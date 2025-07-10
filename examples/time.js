// templates/partials/time.html
// <div class="clock">
//   The time is: <strong>00:00:00 AM</strong>
// </div>

import { component } from 'blah.ink/fmwk.js'

component('footer', ({ element, events }) => {
  element.on('after:create', () => element.append('/templates/partials/time.html'))

  events.emit('interval:1s', () => {
    element.update('.clock strong', new Date().toLocaleTimeString())
  })
})
