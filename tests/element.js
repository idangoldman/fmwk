import { describe, it, before } from 'node:test';
import assert from 'node:assert'
import { JSDOM } from 'jsdom'
import Element from '#root/src/element.js'

describe('Element class tested', () => {
  before(() => {
    const DOM = new JSDOM('', { url: "https://example.org/" })

    global.HTMLElement = DOM.window.HTMLElement
    global.document = DOM.window.document
    global.document.body.innerHTML = `
      <a href="#" class="link">Link</a>
    `
  })

  it('Should be an instance of HTMLElement', () => {
    const element = new Element('.link')

    assert.equal(element.raw instanceof HTMLElement, true)
    assert.strictEqual(element.raw, document.querySelector('.link'))
  })

  it('Should throw an error, no selectors were passed', () => {
    const element = () => new Element()

    assert.throws(element, {
      name: 'Error',
      message: '- No query selector passed.'
    })
  })

  it('Should throw an error, selector not found', () => {
    const element = () => new Element('.linked')

    assert.throws(element, {
      name: 'Error',
      message: '- No HTML element was found with ".linked" selector.'
    })
  })
})
