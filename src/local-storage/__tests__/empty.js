import LocalStorage from '/local-storage';

describe('LocalStorage class: empty functionality', () => {
  let locals;

  beforeEach(() => {
    locals = new LocalStorage();
    window.localStorage.clear();
  });

  test('Should be able to empty out a string', () => {
    locals.set('emptyString', 'bar');
    locals.empty('emptyString');
    expect(locals.get('emptyString')).toBe('');
  });

  test('Should be able to empty out an array', () => {
    locals.set('emptyArray', [1, 2, 3]);
    locals.empty('emptyArray');
    expect(locals.get('emptyArray')).toEqual([]);
  });

  test('Should be able to empty out an object', () => {
    locals.set('emptyObject', { foo: 'bar' });
    locals.empty('emptyObject');
    expect(locals.get('emptyObject')).toEqual({});
  });
});
