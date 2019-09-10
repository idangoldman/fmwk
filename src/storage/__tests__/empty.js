import Storage from '/storage';

describe('Storage class: empty functionality', () => {
  let store, windowStore, type;

  beforeAll(() => {
    type = 'local';
    windowStore = window[type + 'Storage'];
  });

  beforeEach(() => {
    store = new Storage(type);
    windowStore.clear();
  });

  test('Should empty out a string', () => {
    store.set('emptyString', 'bar');
    store.empty('emptyString');
    expect(store.get('emptyString')).toBe('');
  });

  test('Should empty out an array', () => {
    store.set('emptyArray', [1, 2, 3]);
    store.empty('emptyArray');
    expect(store.get('emptyArray')).toEqual([]);
  });

  test('Should empty out an object', () => {
    store.set('emptyObject', { foo: 'bar' });
    store.empty('emptyObject');
    expect(store.get('emptyObject')).toEqual({});
  });
});
