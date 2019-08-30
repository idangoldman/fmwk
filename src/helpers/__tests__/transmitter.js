import Transmitter from '/helpers/transmitter';

describe('Transmitter class tested', () => {
  let transmitter, mockEventFunction;
  const EVENTS_LIST = [
    'all', [
      ['change', ['remove', 'set', 'clear', 'empty']],
      'get'
    ]
  ];

  beforeEach(() => {
    transmitter = new Transmitter(EVENTS_LIST);
    mockEventFunction = jest.fn();
  });

  test('Should be able to emit and listen on event', () => {
    transmitter.on('all', mockEventFunction);
    transmitter.emit('all');

    expect(mockEventFunction).toHaveBeenCalled();
  });

  test('Should be able to listen on low level event', () => {
    transmitter.on('get', mockEventFunction);
    transmitter.emit('get');

    expect(mockEventFunction).toHaveBeenCalled();
  });

  test('Should be able to listen on middle event', () => {
    transmitter.on('change', mockEventFunction);
    transmitter.emit('set');

    expect(mockEventFunction).toHaveBeenCalled();
  });

  test('Should be able to listen on chain of events', () => {
    transmitter.on('set', mockEventFunction);
    transmitter.on('change', mockEventFunction);
    transmitter.on('all', mockEventFunction);
    transmitter.emit('set');

    expect(mockEventFunction).toHaveBeenCalledTimes(3);
  });
});
// locals.on(event, [key,] callback);
// const LOCALSTORAGE_EVENTS_LIST = [
//   'all', [['change', ['remove', 'set', 'clear', 'empty']],'get']
// ];
//
// let radio = new Transmitter(
//   LOCALSTORAGE_EVENTS_LIST
// );
//
//
// const sayHello = () => console.log('Hello, this is RADIO?');
//
// radio.on('set', sayHello);
// radio.remove('set', sayHello);
