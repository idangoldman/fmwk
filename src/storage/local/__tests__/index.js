import LocalStorage from '/storage/local';

describe('LocalStorage class: general functionality', () => {
  let local;

  beforeEach(() => {
    local = new LocalStorage();
    window.localStorage.clear();
  });

  test('Should set a prefix for stored keys', () => {
    local.prefix = 'stored-';
    local.set('foo', 'bar');

    const result = JSON.parse(window.localStorage.getItem('stored-foo'));

    expect(result).toBe('bar');
  });
});
