import { describe, it, before } from 'node:test';
import Element from '#root/src/element.js'

describe('Element class tested', () => {
  before(() => {
    document.body.innerHTML = `
      <a href="#" class="link">Link</a>
    `
  })

  it('Should be an instance of HTMLElement', () => {
    const element = new Element('.link')
    expect(element.raw).toBeInstanceOf(HTMLElement)
  })

  it('Should throw an error, no selectors were passed', () => {
    const element = () => new Element()
    expect(element).toThrowErrorMatchingSnapshot()
  })

  it('Should throw an error, selector not found', () => {
    const element = () => new Element('.linked')
    expect(element).toThrowErrorMatchingSnapshot()
  })
})
