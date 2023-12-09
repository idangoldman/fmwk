import { describe, it, before, beforeEach, mock } from 'node:test';
import assert from 'node:assert'
import { JSDOM } from 'jsdom'

import Events from '~/src/events/index.js'
import Element from '~/src/element.js'

describe('Events class tested', () => {
  let element, events, eventCallbackSpy

  before(() => {
    const DOM = new JSDOM('', { url: "https://example.org/" })

    eventCallbackSpy = mock.fn()
    globalThis.window = DOM.window
    globalThis.document = DOM.window.document

    document.body.innerHTML = `
      <button>Click Me</button>
    `
  })

  beforeEach(() => {
    element = new Element('button')
    events = new Events(element)
    eventCallbackSpy.mock.resetCalls()
  })

  it('Should trigger a click event', () => {
    events.on('click', eventCallbackSpy)
    element.raw.click()

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
  })

  it('Should remove a click event', () => {
    events.on('click', eventCallbackSpy)
    events.off('click', eventCallbackSpy)
    element.raw.click()

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 0)
  })

  it('Should trigger 2 events, click and focus', () => {
    events.on('click focus', eventCallbackSpy)
    element.raw.click()
    element.raw.focus()

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 2)
  })

  it('Should remove 2 events, click and focus', () => {
    events.on('click focus', eventCallbackSpy)
    events.off('click focus', eventCallbackSpy)
    element.raw.click()
    element.raw.focus()

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 0)
  })

  it('Should remove event without specifying a callback', () => {
    events.on('click', eventCallbackSpy)
    events.off('click')
    element.raw.click()

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 0)
  })

  it('Should remove 2 events without specifying a callback', () => {
    events.on('click focus', eventCallbackSpy)
    events.off('click focus')
    element.raw.click()
    element.raw.focus()

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 0)
  })

  it('Should remove event without specifying a type or callback', () => {
    events.on('click', eventCallbackSpy)
    events.off()
    element.raw.click()
    element.raw.focus()

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 0)
  })

  it('Should call click event only once', () => {
    events.once('click', eventCallbackSpy)
    element.raw.click()
    element.raw.click()

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
  })

  it('Should throw an error, dom event not found', () => {
    const eventNotFound = () => events.once('clicked', eventCallbackSpy)

    assert.throws(eventNotFound, {
      name: 'Error',
      message: 'No events were found with names: clicked'
    })
  })
})
