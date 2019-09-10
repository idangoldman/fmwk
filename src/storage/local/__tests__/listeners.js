import LocalStorage from '/storage/local';

describe('LocalStorage class: listeners functionality', () => {
  let local, mockEventFunction;

  beforeEach(() => {
    local = new LocalStorage();
    window.localStorage.clear();
    mockEventFunction = jest.fn();
  });

  test('Should listen on a set event', () => {
    local.on('set', mockEventFunction);
    local.set('foo', 'bar');
    expect(mockEventFunction).toHaveBeenCalled();
  });

  test('Should listen on a set event specific key', () => {
    local.on('set', 'foo', mockEventFunction);
    local.set('bar', 'foo');
    local.set('foo', 'bar');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should listen on a get event', () => {
    local.on('get', mockEventFunction);
    local.get('bar');
    expect(mockEventFunction).toHaveBeenCalled();
  });

  test('Should listen on a get event specific key', () => {
    local.on('get', 'foo', mockEventFunction);
    local.get('bar');
    local.get('foo');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should listen on a remove event', () => {
    local.on('remove', mockEventFunction);
    local.remove('foo');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should listen on a remove event specific key', () => {
    local.on('remove', 'foo', mockEventFunction);
    local.remove('bar');
    local.remove('foo');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should listen on a clear event', () => {
    local.on('clear', mockEventFunction);
    local.clear();
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should listen on a empty event', () => {
    local.on('empty', mockEventFunction);
    local.empty('foo');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });

  test('Should listen on a empty event specific key', () => {
    local.on('empty', 'foo', mockEventFunction);
    local.empty('bar');
    local.empty('foo');
    expect(mockEventFunction).toHaveBeenCalledTimes(1);
  });
});
