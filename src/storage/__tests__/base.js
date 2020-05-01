import Storage from 'storage';

describe('Storage class: base functionality', () => {
  let store, windowStore, type;

  beforeAll(() => {
    type = 'local';
    windowStore = window[type + 'Storage'];
  });

  beforeEach(() => {
    store = new Storage(type);
    windowStore.clear();
  });

  test('Should set values in store', () => {
    store.set('foo', '123');
    store.set('items', { foo: 'bar' });

    expect(windowStore).toHaveLength(2);
  });

  test('Should get values from store', () => {
    store.set('foo', '123');
    store.set('items', { foo: 'bar' });

    const result1 = store.get('foo');
    const result2 = store.get('items');

    expect(result1).toBe('123');
    expect(result2).toEqual({ foo: 'bar' });
  });

  test('Should remove item from storage', () => {
    store.set('foo', '123');
    store.set('bar', '321');
    store.remove('foo');
    expect(windowStore).toHaveLength(1);
  });

  test('Should clear store', () => {
    store.set('foo', '123');
    store.set('bar', '321');
    store.clear();
    expect(windowStore).toHaveLength(0);
  });
});
