import Element from '~/src/element.js'
import Events from '~/src/events/index.js'
import Storage from '~/src/stores/storage.js'
import onDOMContentLoaded from '~/src/dom-content-loaded.js'

const component = (selector, callback) => {
  onDOMContentLoaded(() => {
    const element = new Element(selector)
    const events = new Events(element)
    const local = new Storage('local')

    callback({ element, events, local })
  })
}

export default { component }
