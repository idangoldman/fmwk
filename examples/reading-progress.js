import { component } from 'blah.ink/fmwk.js'

component('#indicator', ({ element, events }) => {
  element.on('before:create').update('style', {
    backgroundColor: 'rgb(99 102 241)',
    height: '0.5rem',
    left: 0,
    position: 'fixed',
    top: 0,
    transition: 'width 0.2s ease-in-out',
    width: 0
  })

  events.on('scroll', () => {
    const scrollTop = window.scrollY
    const scrollHeight = document.body.scrollHeight - document.body.clientHeight
    const scrolled = (scrollTop / scrollHeight) * 100

    element.update({ style: { width: `${scrolled}%` } })
  })
})
