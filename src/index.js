import Element from '#root/src/element.js'
import Events from '#root/src/events/index.js'
import Storage from '#root/src/stores/storage.js'
import onDOMContentLoaded from '#root/src/dom-content-loaded.js'

const component = (selector, callback) => {
  onDOMContentLoaded(() => {
    const element = new Element(selector)
    const events = new Events(element)
    const local = new Storage('local')

    callback({ element, events, local })
  })
}

export default { component }
