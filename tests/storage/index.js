import { describe, it, before, beforeEach } from 'node:test';
import Storage from '#root/src/storage.js'

describe('Storage class: general functionality', () => {
  let store, windowStore, type

  before(() => {
    type = 'local'
    windowStore = window[type + 'Storage']
  })

  beforeEach(() => {
    store = new Storage(type)
    windowStore.clear()
  })

  it('Should set a prefix for stored keys', () => {
    store.prefix = 'stored-'
    store.set('foo', 'bar')

    const result = JSON.parse(windowStore.getItem('stored-foo'))

    expect(result).toBe('bar')
  })
})
