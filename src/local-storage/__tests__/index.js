import LocalStorage from '/local-storage';

describe('LocalStorage class: general functionality', () => {
  let locals;

  beforeEach(() => {
    locals = new LocalStorage();
    window.localStorage.clear();
  });

  test('Should set a prefix for stored keys', () => {
    locals.prefix = 'stored-';
    locals.set('foo', 'bar');

    const result = JSON.parse(window.localStorage.getItem('stored-foo'));

    expect(result).toBe('bar');
  });
});

// locals.has(key);
// locals.create(key);
// locals.insert(key, value);
// locals.update(key, value);
// locals.filter((key, value) => condition);
// locals.filter(key, object);
// locals.sort((key, value) => condition);
// locals.sort(key, object);
// ['create', 'has', 'insert', 'update', 'filter', 'sort']
//
// locals.insert('todos', {
//   id: uuid(),
//   title: value,
//   completed: false
// });
//
// locals.update('todos/:id', {
//   id: todo.dataset.id,
//   completed: !!target.checked
// });
// locals.update('todos', { completed: true });
//
// locals.remove('todos', { completed: true });
// locals.remove('todos/:id', { id: 123 });
