import Element from '/element'

describe('Element class tested', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <a href="#" class="link">Link</a>
    `
  })

  test('Should be an instance of HTMLElement', () => {
    const element = new Element('.link')
    expect(element.raw).toBeInstanceOf(HTMLElement)
  })

  test('Should throw an error, no selectors were passed', () => {
    const element = () => new Element()
    expect(element).toThrowErrorMatchingSnapshot()
  })

  test('Should throw an error, selector not found', () => {
    const element = () => new Element('.linked')
    expect(element).toThrowErrorMatchingSnapshot()
  })
})
