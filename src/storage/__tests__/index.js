import Storage from '/storage'

describe('Storage class: general functionality', () => {
  let store, windowStore, type

  beforeAll(() => {
    type = 'local'
    windowStore = window[type + 'Storage']
  })

  beforeEach(() => {
    store = new Storage(type)
    windowStore.clear()
  })

  test('Should set a prefix for stored keys', () => {
    store.prefix = 'stored-'
    store.set('foo', 'bar')

    const result = JSON.parse(windowStore.getItem('stored-foo'))

    expect(result).toBe('bar')
  })
})
