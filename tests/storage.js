import { describe, it, before, beforeEach, mock } from 'node:test'
import assert from 'node:assert'
import { JSDOM } from 'jsdom'

import Storage from '#root/src/storage.js'

describe('Storage Class', () => {
  let store, storeType, windowStore, eventCallbackSpy

  before(() => {
    const DOM = new JSDOM('', { url: "https://example.org/" })

    eventCallbackSpy = mock.fn()
    globalThis.window = DOM.window
    storeType = 'local'
    windowStore = window[`${storeType}Storage`]
  })

  beforeEach(() => {
    store = new Storage(storeType)
    windowStore.clear()
    eventCallbackSpy.mock.resetCalls()
  })

  describe('Base', () => {
    it('Should set values in store', () => {
      store.set('foo', '123')
      store.set('items', { foo: 'bar' })

      assert.strictEqual(windowStore.length, 2)
    })

    it('Should get values from store', () => {
      store.set('foo', '123')
      store.set('items', { foo: 'bar' })

      const result1 = store.get('foo')
      const result2 = store.get('items')

      assert.strictEqual(result1, '123')
      assert.deepStrictEqual(result2, { foo: 'bar' })
    })

    it('Should remove item from storage', () => {
      store.set('foo', '123')
      store.set('bar', '321')
      store.remove('foo')

      assert.strictEqual(windowStore.length, 1)
    })

    it('Should clear store', () => {
      store.set('foo', '123')
      store.set('bar', '321')
      store.clear()

      assert.strictEqual(windowStore.length, 0)
    })

    it('Should set a prefix for stored keys', () => {
      store.prefix = 'stored-'
      store.set('foo', 'bar')

      const result = JSON.parse(windowStore.getItem('stored-foo'))

      assert.strictEqual(result, 'bar')
    })
  })

  describe('Empty', () => {
    it('Should empty out a string', () => {
      store.set('emptyString', 'bar')
      store.empty('emptyString')

      assert.strictEqual(store.get('emptyString'), '')
    })

    it('Should empty out an array', () => {
      store.set('emptyArray', [1, 2, 3])
      store.empty('emptyArray')

      assert.deepStrictEqual(store.get('emptyArray'), [])
    })

    it('Should empty out an object', () => {
      store.set('emptyObject', { foo: 'bar' })
      store.empty('emptyObject')

      assert.deepStrictEqual(store.get('emptyObject'), {})
    })
  })

  describe('Listeners', () => {
    it('Should listen on a set event', () => {
      store.on('set', eventCallbackSpy)
      store.set('foo', 'bar')

      assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    })

    it('Should listen on a set event specific key', () => {
      store.on('set', 'foo', eventCallbackSpy)
      store.set('bar', 'foo')
      store.set('foo', 'bar')

      assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    })

    it('Should listen on a get event', () => {
      store.on('get', eventCallbackSpy)
      store.get('bar')

      assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    })

    it('Should listen on a get event specific key', () => {
      store.on('get', 'foo', eventCallbackSpy)
      store.get('bar')
      store.get('foo')

      assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    })

    it('Should listen on a remove event', () => {
      store.on('remove', eventCallbackSpy)
      store.remove('foo')

      assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    })

    it('Should listen on a remove event specific key', () => {
      store.on('remove', 'foo', eventCallbackSpy)
      store.remove('bar')
      store.remove('foo')

      assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    })

    it('Should listen on a clear event', () => {
      store.on('clear', eventCallbackSpy)
      store.clear()

      assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    })

    it('Should listen on a empty event', () => {
      store.on('empty', eventCallbackSpy)
      store.empty('foo')

      assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    })

    it('Should listen on a empty event specific key', () => {
      store.on('empty', 'foo', eventCallbackSpy)
      store.empty('bar')
      store.empty('foo')

      assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    })
  })
})
