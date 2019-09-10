import LocalStorage from '/storage/local';

describe('LocalStorage class: base functionality', () => {
  let local;

  beforeEach(() => {
    local = new LocalStorage();
    window.localStorage.clear();
  });

  test('Should set values in store', () => {
    local.set('foo', '123');
    local.set('items', { foo: 'bar' });

    expect(window.localStorage).toHaveLength(2);
  });

  test('Should get values from store', () => {
    local.set('foo', '123');
    local.set('items', { foo: 'bar' });

    const result1 = local.get('foo');
    const result2 = local.get('items');

    expect(result1).toBe('123');
    expect(result2).toEqual({ foo: 'bar' });
  });

  test('Should remove item from storage', () => {
    local.set('foo', '123');
    local.set('bar', '321');
    local.remove('foo');
    expect(window.localStorage).toHaveLength(1);
  });

  test('Should clear store', () => {
    local.set('foo', '123');
    local.set('bar', '321');
    local.clear();
    expect(window.localStorage).toHaveLength(0);
  });
});
