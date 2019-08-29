import LocalStorage from '../index';

describe('LocalStorage class tested: listeners functionality', () => {
  let locals, mockEventFunction;

  beforeEach(() => {
    locals = new LocalStorage();
    window.localStorage.clear();
    mockEventFunction = jest.fn();
  });

  test('Should be listening on a set event', () => {
    locals.on('set', mockEventFunction);
    locals.set('foo', 'bar');
    expect(mockEventFunction).toBeCalled();
  });

  test('Should be listening on a set event specific key', () => {
    locals.on('set', 'foo', mockEventFunction);
    locals.set('bar', 'foo');
    locals.set('foo', 'bar');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should be listening on a get event', () => {
    locals.on('get', mockEventFunction);
    locals.get('bar');
    expect(mockEventFunction).toBeCalled();
  });

  test('Should be listening on a get event specific key', () => {
    locals.on('get', 'foo', mockEventFunction);
    locals.get('bar');
    locals.get('foo');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should be listening on a remove event', () => {
    locals.on('remove', mockEventFunction);
    locals.remove('foo');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should be listening on a remove event specific key', () => {
    locals.on('remove', 'foo', mockEventFunction);
    locals.remove('bar');
    locals.remove('foo');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should be listening on a clear event', () => {
    locals.on('clear', mockEventFunction);
    locals.clear();
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should be listening on a empty event', () => {
    locals.on('empty', mockEventFunction);
    locals.empty('foo');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should be listening on a empty event specific key', () => {
    locals.on('empty', 'foo', mockEventFunction);
    locals.empty('bar');
    locals.empty('foo');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });
});

// [all, change, set, get, remove, clear, empty]
// locals.on(event, [key,] callback);
