import { describe, it, before, beforeEach } from 'node:test';
import Storage from '#root/src/storage.js'

describe('Storage class: empty functionality', () => {
  let store, windowStore, type

  before(() => {
    type = 'local'
    windowStore = window[type + 'Storage']
  })

  beforeEach(() => {
    store = new Storage(type)
    windowStore.clear()
  })

  it('Should empty out a string', () => {
    store.set('emptyString', 'bar')
    store.empty('emptyString')
    expect(store.get('emptyString')).toBe('')
  })

  it('Should empty out an array', () => {
    store.set('emptyArray', [1, 2, 3])
    store.empty('emptyArray')
    expect(store.get('emptyArray')).toEqual([])
  })

  it('Should empty out an object', () => {
    store.set('emptyObject', { foo: 'bar' })
    store.empty('emptyObject')
    expect(store.get('emptyObject')).toEqual({})
  })
})
