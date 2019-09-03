import Transmitter from '/helpers/transmitter';
import { LOCALSTORAGE_EVENTS_LIST } from '/helpers/constants';

describe('Transmitter class tested', () => {
  let transmitter, mockEventFunction;

  beforeEach(() => {
    transmitter = new Transmitter(LOCALSTORAGE_EVENTS_LIST);
    mockEventFunction = jest.fn();
  });

  test('Should emit and listen to event', () => {
    transmitter.on('get', mockEventFunction);
    transmitter.emit('get');

    expect(mockEventFunction).toHaveBeenCalled();
  });

  test('Should listen on a middle event', () => {
    transmitter.on('change', mockEventFunction);
    transmitter.emit('set');

    expect(mockEventFunction).toHaveBeenCalled();
  });

  test('Should listen on chain of events', () => {
    transmitter.on('set', mockEventFunction);
    transmitter.on('change', mockEventFunction);
    transmitter.emit('set');

    expect(mockEventFunction).toHaveBeenCalledTimes(2);
  });

  test('Should emit data array with arguments', () => {
    const songData = ['songName', 'The Crew'];

    transmitter.on('get', mockEventFunction);
    transmitter.emit('get', songData);

    expect(mockEventFunction).toHaveBeenCalledWith(...songData);
  });

  test('Should call mock function once with arguments', () => {
    const songData = ['songName', 'The Crew'];

    transmitter.once('get', mockEventFunction);
    transmitter.emit('get', songData);
    transmitter.emit('get', songData);

    expect(mockEventFunction).toHaveBeenCalledTimes(1);
    expect(mockEventFunction).toHaveBeenCalledWith(...songData);
  });
});
