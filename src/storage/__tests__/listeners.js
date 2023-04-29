import Storage from 'storage'

describe('Storage class: listeners functionality', () => {
  let store, windowStore, type, mockEventFunction

  beforeAll(() => {
    type = 'local'
    windowStore = window[type + 'Storage']
  })

  beforeEach(() => {
    store = new Storage(type)
    windowStore.clear()
    mockEventFunction = jest.fn()
  })

  test('Should listen on a set event', () => {
    store.on('set', mockEventFunction)
    store.set('foo', 'bar')
    expect(mockEventFunction).toHaveBeenCalled()
  })

  test('Should listen on a set event specific key', () => {
    store.on('set', 'foo', mockEventFunction)
    store.set('bar', 'foo')
    store.set('foo', 'bar')
    expect(mockEventFunction).toHaveBeenCalledTimes(1)
  })

  test('Should listen on a get event', () => {
    store.on('get', mockEventFunction)
    store.get('bar')
    expect(mockEventFunction).toHaveBeenCalled()
  })

  test('Should listen on a get event specific key', () => {
    store.on('get', 'foo', mockEventFunction)
    store.get('bar')
    store.get('foo')
    expect(mockEventFunction).toHaveBeenCalledTimes(1)
  })

  test('Should listen on a remove event', () => {
    store.on('remove', mockEventFunction)
    store.remove('foo')
    expect(mockEventFunction).toHaveBeenCalledTimes(1)
  })

  test('Should listen on a remove event specific key', () => {
    store.on('remove', 'foo', mockEventFunction)
    store.remove('bar')
    store.remove('foo')
    expect(mockEventFunction).toHaveBeenCalledTimes(1)
  })

  test('Should listen on a clear event', () => {
    store.on('clear', mockEventFunction)
    store.clear()
    expect(mockEventFunction).toHaveBeenCalledTimes(1)
  })

  test('Should listen on a empty event', () => {
    store.on('empty', mockEventFunction)
    store.empty('foo')
    expect(mockEventFunction).toHaveBeenCalledTimes(1)
  })

  test('Should listen on a empty event specific key', () => {
    store.on('empty', 'foo', mockEventFunction)
    store.empty('bar')
    store.empty('foo')
    expect(mockEventFunction).toHaveBeenCalledTimes(1)
  })
})
