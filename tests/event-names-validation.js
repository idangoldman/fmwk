import { describe, it } from 'node:test';
import eventNamesValidation from '#root/src/helpers/event-names-validation.js'
import { DOM_EVENTS_LIST } from '#root/src/helpers/constants.js'

describe('eventNamesValidation helper function tested', () => {
  it('Should be able validate event name', () => {
    const eventName = 'click'
    const match = ['click']

    expect(eventNamesValidation(eventName, DOM_EVENTS_LIST)).toEqual(match)
  })

  it('Should be able validate multiple event names', () => {
    const eventName = 'click mouseover'
    const match = ['click', 'mouseover']

    expect(eventNamesValidation(eventName, DOM_EVENTS_LIST)).toEqual(match)
  })

  it('Should not validate event names', () => {
    const eventName = 'clicked'
    const callback = () => eventNamesValidation(eventName, DOM_EVENTS_LIST)

    expect(callback).toThrowErrorMatchingSnapshot()
  })
})
