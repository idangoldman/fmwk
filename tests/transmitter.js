import { describe, it, before, beforeEach, mock } from 'node:test';
import assert from 'node:assert'

import Transmitter from '#root/src/helpers/transmitter.js'
import { STORE_EVENTS_LIST } from '#root/src/stores/constants.js'

describe('Transmitter class tested', () => {
  let transmitter, eventCallbackSpy

  before(() => {
    eventCallbackSpy = mock.fn()
  })

  beforeEach(() => {
    transmitter = new Transmitter(STORE_EVENTS_LIST)
    eventCallbackSpy.mock.resetCalls()
  })

  it('Should emit and listen to event', () => {
    transmitter.on('get', eventCallbackSpy)
    transmitter.emit('get')

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
  })

  it('Should listen on a middle event', () => {
    transmitter.on('change', eventCallbackSpy)
    transmitter.emit('set')

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
  })

  it('Should listen on chain of events', () => {
    transmitter.on('set', eventCallbackSpy)
    transmitter.on('change', eventCallbackSpy)
    transmitter.emit('set')

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 2)
  })

  it('Should emit data array with arguments', () => {
    const songData = ['songName', 'The Crew']

    transmitter.on('get', eventCallbackSpy)
    transmitter.emit('get', songData)

    assert.deepStrictEqual(eventCallbackSpy.mock.calls[0].arguments, songData)
  })

  it('Should call mock function once with arguments', () => {
    const songData = ['songName', 'The Crew']

    transmitter.once('get', eventCallbackSpy)
    transmitter.emit('get', songData)
    transmitter.emit('get', songData)

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    assert.deepStrictEqual(eventCallbackSpy.mock.calls[0].arguments, songData)
  })

  it('Should call mock function one time with a specific data key', () => {
    transmitter.on('get', 'todo', eventCallbackSpy)
    transmitter.emit('get', 'todo')
    transmitter.emit('get')

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
  })

  it('Should call mock function on event name and specific data key', () => {
    transmitter.on('get', 'todo', eventCallbackSpy)
    transmitter.on('get', eventCallbackSpy)
    transmitter.emit('get', 'todo')

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 2)
  })

  it('Should call mock function once on data key with arguments', () => {
    const songData = ['songName', 'The Crew']

    transmitter.on('get', 'todo', eventCallbackSpy)
    transmitter.emit('get', 'todo', songData)

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    assert.deepStrictEqual(eventCallbackSpy.mock.calls[0].arguments, songData)
  })

  it('Should call mock function once with data key and data', () => {
    const songData = ['songName', 'The Crew']

    transmitter.once('get', 'song', eventCallbackSpy)
    transmitter.emit('get', 'song', songData)
    transmitter.emit('get', 'song', songData)

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 1)
    assert.deepStrictEqual(eventCallbackSpy.mock.calls[0].arguments, songData)
  })

  it('Should call off a mock callback of event name', () => {
    transmitter.on('set', eventCallbackSpy)
    transmitter.off('set', eventCallbackSpy)
    transmitter.emit('set')

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 0)
  })

  it('Should call off a mock callback of event name with data key', () => {
    transmitter.on('set', 'todo', eventCallbackSpy)
    transmitter.off('set', 'todo', eventCallbackSpy)
    transmitter.emit('set', 'todo')

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 0)
  })

  it('Should call off all callbacks from event name', () => {
    transmitter.on('set', eventCallbackSpy)
    transmitter.on('set', eventCallbackSpy)
    transmitter.off('set')
    transmitter.emit('set')

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 0)
  })

  it('Should call off all callbacks fron event name with data key', () => {
    transmitter.on('set', 'todo', eventCallbackSpy)
    transmitter.on('set', 'todo', eventCallbackSpy)
    transmitter.off('set', 'todo')
    transmitter.emit('set', 'todo')

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 0)
  })

  it('Should call off all callbacks', () => {
    transmitter.on('set', eventCallbackSpy)
    transmitter.on('set', eventCallbackSpy)
    transmitter.off()
    transmitter.emit('set', 'todo')

    assert.strictEqual(eventCallbackSpy.mock.callCount(), 0)
  })
})
