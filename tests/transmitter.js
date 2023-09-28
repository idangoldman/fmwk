import { describe, it, beforeEach } from 'node:test';
import Transmitter from '#root/src/helpers/transmitter.js'
import { STORAGE_EVENTS_LIST } from '#root/src/helpers/constants.js'

describe('Transmitter class tested', () => {
  let transmitter, mockEventFunction

  beforeEach(() => {
    transmitter = new Transmitter(STORAGE_EVENTS_LIST)
    mockEventFunction = jest.fn()
  })

  it('Should emit and listen to event', () => {
    transmitter.on('get', mockEventFunction)
    transmitter.emit('get')

    expect(mockEventFunction).toHaveBeenCalled()
  })

  it('Should listen on a middle event', () => {
    transmitter.on('change', mockEventFunction)
    transmitter.emit('set')

    expect(mockEventFunction).toHaveBeenCalled()
  })

  it('Should listen on chain of events', () => {
    transmitter.on('set', mockEventFunction)
    transmitter.on('change', mockEventFunction)
    transmitter.emit('set')

    expect(mockEventFunction).toHaveBeenCalledTimes(2)
  })

  it('Should emit data array with arguments', () => {
    const songData = ['songName', 'The Crew']

    transmitter.on('get', mockEventFunction)
    transmitter.emit('get', songData)

    expect(mockEventFunction).toHaveBeenCalledWith(...songData)
  })

  it('Should call mock function once with arguments', () => {
    const songData = ['songName', 'The Crew']

    transmitter.once('get', mockEventFunction)
    transmitter.emit('get', songData)
    transmitter.emit('get', songData)

    expect(mockEventFunction).toHaveBeenCalledTimes(1)
    expect(mockEventFunction).toHaveBeenCalledWith(...songData)
  })

  it('Should call mock function one time with a specific data key', () => {
    transmitter.on('get', 'todo', mockEventFunction)
    transmitter.emit('get', 'todo')
    transmitter.emit('get')

    expect(mockEventFunction).toHaveBeenCalledTimes(1)
  })

  it('Should call mock function on event name and specific data key', () => {
    transmitter.on('get', 'todo', mockEventFunction)
    transmitter.on('get', mockEventFunction)
    transmitter.emit('get', 'todo')

    expect(mockEventFunction).toHaveBeenCalledTimes(2)
  })

  it('Should call mock function once on data key with arguments', () => {
    const songData = ['songName', 'The Crew']

    transmitter.on('get', 'todo', mockEventFunction)
    transmitter.emit('get', 'todo', songData)

    expect(mockEventFunction).toHaveBeenCalledTimes(1)
    expect(mockEventFunction).toHaveBeenCalledWith(...songData)
  })

  it('Should call mock function once with data key and data', () => {
    const songData = ['songName', 'The Crew']

    transmitter.once('get', 'song', mockEventFunction)
    transmitter.emit('get', 'song', songData)
    transmitter.emit('get', 'song', songData)

    expect(mockEventFunction).toHaveBeenCalledTimes(1)
    expect(mockEventFunction).toHaveBeenCalledWith(...songData)
  })

  it('Should call off a mock callback of event name', () => {
    transmitter.on('set', mockEventFunction)
    transmitter.off('set', mockEventFunction)
    transmitter.emit('set')

    expect(mockEventFunction).not.toHaveBeenCalled()
  })

  it('Should call off a mock callback of event name with data key', () => {
    transmitter.on('set', 'todo', mockEventFunction)
    transmitter.off('set', 'todo', mockEventFunction)
    transmitter.emit('set', 'todo')

    expect(mockEventFunction).not.toHaveBeenCalled()
  })

  it('Should call off all callbacks from event name', () => {
    transmitter.on('set', mockEventFunction)
    transmitter.on('set', mockEventFunction)
    transmitter.off('set')
    transmitter.emit('set')

    expect(mockEventFunction).not.toHaveBeenCalled()
  })

  it('Should call off all callbacks fron event name with data key', () => {
    transmitter.on('set', 'todo', mockEventFunction)
    transmitter.on('set', 'todo', mockEventFunction)
    transmitter.off('set', 'todo')
    transmitter.emit('set', 'todo')

    expect(mockEventFunction).not.toHaveBeenCalled()
  })

  it('Should call off all callbacks', () => {
    transmitter.on('set', mockEventFunction)
    transmitter.on('set', mockEventFunction)
    transmitter.off()
    transmitter.emit('set', 'todo')

    expect(mockEventFunction).not.toHaveBeenCalled()
  })
})
