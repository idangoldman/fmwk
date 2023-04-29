import eventNamesValidation from '/helpers/event-names-validation'
import { DOM_EVENTS_LIST } from '/helpers/constants'

const EVENTS_STORE = new Map()

export const insert = (selector = '', eventNames = [], callback = undefined) => {
  const events = EVENTS_STORE.get(selector) || new Map()
  const validEventNames = eventNamesValidation(eventNames, DOM_EVENTS_LIST)
  const output = []

  for (const validEventName of validEventNames) {
    if (events.size && events.has(validEventName)) {
      const event = events.get(validEventName)

      if (!event.has(callback)) {
        event.add(callback)
        events.set(validEventName, event)
      }
    } else {
      events.set(validEventName, new Set([callback]))
    }

    output.push([validEventName, callback])
  }

  if (events.size) {
    EVENTS_STORE.set(selector, events)
  }

  return output
}

export const remove = (selector = '', eventNames = [], callback = undefined) => {
  const events = EVENTS_STORE.get(selector)
  const output = []

  if (events) {
    if (eventNames.length) {
      const validEventNames = eventNamesValidation(eventNames, DOM_EVENTS_LIST)

      for (const validEventName of validEventNames) {
        if (events.has(validEventName)) {
          const callbacks = events.get(validEventName)

          if (!callback) {
            callbacks.forEach(value => output.push([validEventName, value]))
            callbacks.clear()
          } else if (callbacks.has(callback)) {
            output.push([validEventName, callback])
            callbacks.delete(callback)
          }

          if (callbacks.size) {
            events.set(validEventName, callbacks)
          } else {
            events.delete(validEventName)
          }
        }
      }
    } else {
      for (const [eventName, callbacks] of events) {
        for (const _callback of callbacks) {
          output.push([eventName, _callback])
        }
      }

      events.clear()
    }

    if (events.size) {
      EVENTS_STORE.set(selector, events)
    } else {
      EVENTS_STORE.delete(selector)
    }
  }

  return output
}
