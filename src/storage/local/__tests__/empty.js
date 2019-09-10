import LocalStorage from '/storage/local';

describe('LocalStorage class: empty functionality', () => {
  let local;

  beforeEach(() => {
    local = new LocalStorage();
    window.localStorage.clear();
  });

  test('Should empty out a string', () => {
    local.set('emptyString', 'bar');
    local.empty('emptyString');
    expect(local.get('emptyString')).toBe('');
  });

  test('Should empty out an array', () => {
    local.set('emptyArray', [1, 2, 3]);
    local.empty('emptyArray');
    expect(local.get('emptyArray')).toEqual([]);
  });

  test('Should empty out an object', () => {
    local.set('emptyObject', { foo: 'bar' });
    local.empty('emptyObject');
    expect(local.get('emptyObject')).toEqual({});
  });
});
