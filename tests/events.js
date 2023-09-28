import { describe, it, before, beforeEach } from 'node:test';
import Events from '#root/src/events.js'
import Element from '#root/src/element.js'

describe('Events class tested', () => {
  let element, events, mockEventFunction

  before(() => {
    document.body.innerHTML = `
      <button>Click Me</button>
    `
  })

  beforeEach(() => {
    element = new Element('button')
    events = new Events(element)
    mockEventFunction = jest.fn()
  })

  it('Should trigger a click event', () => {
    events.on('click', mockEventFunction)
    element.raw.click()
    expect(mockEventFunction).toHaveBeenCalled()
  })

  it('Should remove a click event', () => {
    events.on('click', mockEventFunction)
    events.off('click', mockEventFunction)
    element.raw.click()
    expect(mockEventFunction).not.toHaveBeenCalled()
  })

  it('Should trigger 2 events, click and focus', () => {
    events.on('click focus', mockEventFunction)
    element.raw.click()
    element.raw.focus()
    expect(mockEventFunction).toHaveBeenCalledTimes(2)
  })

  it('Should remove 2 events, click and focus', () => {
    events.on('click focus', mockEventFunction)
    events.off('click focus', mockEventFunction)
    element.raw.click()
    element.raw.focus()
    expect(mockEventFunction).not.toHaveBeenCalled()
  })

  it('Should remove event without specifying a callback', () => {
    events.on('click', mockEventFunction)
    events.off('click')
    element.raw.click()
    expect(mockEventFunction).not.toHaveBeenCalled()
  })

  it('Should remove 2 events without specifying a callback', () => {
    events.on('click focus', mockEventFunction)
    events.off('click focus')
    element.raw.click()
    element.raw.focus()
    expect(mockEventFunction).not.toHaveBeenCalled()
  })

  it('Should remove event without specifying a type or callback', () => {
    events.on('click', mockEventFunction)
    events.off()
    element.raw.click()
    element.raw.focus()
    expect(mockEventFunction).not.toHaveBeenCalled()
  })

  it('Should call click event only once', () => {
    events.once('click', mockEventFunction)
    element.raw.click()
    element.raw.click()
    expect(mockEventFunction).toHaveBeenCalledTimes(1)
  })

  it('Should throw an error, dom event not found', () => {
    const eventNotFound = () => events.once('clicked', mockEventFunction)
    expect(eventNotFound).toThrowErrorMatchingSnapshot()
  })
})
