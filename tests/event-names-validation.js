import { describe, it } from 'node:test';
import assert from 'node:assert'
import eventNamesValidation from '#root/src/helpers/event-names-validation.js'
import { DOM_EVENTS_LIST } from '#root/src/events/constants.js'

describe('eventNamesValidation helper function tested', () => {
  it('Should be able validate event name', () => {
    const eventName = 'click'
    const match = ['click']

    assert.deepStrictEqual(eventNamesValidation(eventName, DOM_EVENTS_LIST), match)
  })

  it('Should be able validate multiple event names', () => {
    const eventName = 'click mouseover'
    const match = ['click', 'mouseover']

    assert.deepStrictEqual(eventNamesValidation(eventName, DOM_EVENTS_LIST), match)
  })

  it('Should not validate event names', () => {
    const eventName = 'clicked'
    const callback = () => eventNamesValidation(eventName, DOM_EVENTS_LIST)

    assert.throws(callback, {
      name: 'Error',
      message: 'No events were found with names: clicked'
    })
  })
})
