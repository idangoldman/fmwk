import eventNamesValidation from 'helpers/event-names-validation'
import { DOM_EVENTS_LIST } from 'helpers/constants'

describe('eventNamesValidation helper function tested', () => {
  test('Should be able validate event name', () => {
    const eventName = 'click'
    const match = ['click']

    expect(eventNamesValidation(eventName, DOM_EVENTS_LIST)).toEqual(match)
  })

  test('Should be able validate multiple event names', () => {
    const eventName = 'click mouseover'
    const match = ['click', 'mouseover']

    expect(eventNamesValidation(eventName, DOM_EVENTS_LIST)).toEqual(match)
  })

  test('Should not validate event names', () => {
    const eventName = 'clicked'
    const callback = () => eventNamesValidation(eventName, DOM_EVENTS_LIST)

    expect(callback).toThrowErrorMatchingSnapshot()
  })
})
