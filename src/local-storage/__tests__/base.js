import LocalStorage from '/local-storage';

describe('LocalStorage class tested: base functionality', () => {
  let locals;

  beforeEach(() => {
    locals = new LocalStorage();
    window.localStorage.clear();
  });

  test('Should be able to set values in store', () => {
    locals.set('foo', '123');
    locals.set('items', { foo: 'bar' });

    expect(window.localStorage).toHaveLength(2);
  });

  test('Should be able to get values from store', () => {
    locals.set('foo', '123');
    locals.set('items', { foo: 'bar' });

    let result1 = locals.get('foo');
    let result2 = locals.get('items');

    expect(result1).toBe('123');
    expect(result2).toEqual({ foo: 'bar' });
  });

  test('Should be able to remove item from storage', () => {
    locals.set('foo', '123');
    locals.set('bar', '321');
    locals.remove('foo');
    expect(window.localStorage).toHaveLength(1);
  });

  test('Should be able to clear store', () => {
    locals.set('foo', '123');
    locals.set('bar', '321');
    locals.clear();
    expect(window.localStorage).toHaveLength(0);
  });

});
