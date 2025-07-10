import { component } from 'blah.ink/fmwk.js'

const CURSOR_TPLs = {
  default: `<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />`,
  pointer: `<path d="M20,20 L40,20 L30,40 Z" fill="orange" />`,
  click: `<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="green" />`
}

component(document, ({ element, events }) => {
  element.select('body').update('style.cursor', 'none')

  let mouseCoursor = element.create('svg.mouse-cursor', {
    height: 50,
    html: CURSOR_TPLs.default,
    style: {
      pointerEvents: 'none',
      position: 'fixed',
      viewBox: '0 0 100 100',
      width: 50
    }
  })

  let contextMenu = element.create('nav.context-menu', {
    ariaHidden: true,
    style: {
      backgroundColor: 'white',
      border: '1px solid #ddd',
      display: 'none',
      padding: '10px',
      position: 'absolute'
    },
    text: 'Custom Menu'
  })

  events.on('mousemove', ({ clientX, clientY }) => {
    mouseCoursor.update('style', {
      left: `${clientX}px`,
      top: `${clientY}px`
    })
  })

  events.on('mouseover, mouseout', 'button, a', ({ type }) => {
    let cursorTpl = CURSOR_TPLs.default

    if (type === 'mouseover') {
      cursorTpl = CURSOR_TPLs.pointer
    }

    mouseCoursor.update('html', cursorTpl)
  })

  events.on('click', () => {
    mouseCoursor.update('html', CURSOR_TPLs.click)
    events.emit('delay:1s', () => mouseCoursor.update('html', CURSOR_TPLs.default))

    if (contextMenu.get('style.display') === 'block') {
      contextMenu.update({
        ariaHidden: true,
        'style.display': 'none'
      })
    }
  })

  events.on('contextmenu:preventDefault', ({ clientX, clientY }) => {
    contextMenu.update({
      ariaHidden: false,
      style: {
        display: 'block',
        left: `${clientX}px`,
        top: `${clientY}px`
      }
    })
  })
})
