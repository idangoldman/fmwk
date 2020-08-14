import { component, records } from '../src/index';

records('#how-to-grow-a-bread', {
  model: {
    id: null,
    title: 'html',
    content: 'html',
    image: 'src'
    // created_at: '',
    // update_at: ''
  },
  storage: ['session', 'remote'],
  remote: {
    base_url: '// ...',
    read: 'GET /articles/:id',
    reads: 'GET /articles',
    save: 'POST /articles',
    update: 'PUT /articles/:id',
    delete: 'DELETE /articles/:id'
  }
});

component('#how-to-grow-a-bread', ({ element, events, record }) => {
  // const number = '0547728775'.is_phone;

  // before, around, after.
  record.call('read', element.render);

  events.on('submit', (event) => {
    if (record.is_valid) {
      record.save();
    }
  });
});

/*
  <article id="how-to-grow-a-bread">
    <h1 name="title"></h1>
    <div name="content"></div>
    <image name="image" />
  </article>
*/

records('#contact-form', {
  model: {
    name: ['required', 'text', ['min', 2]],
    phone: ['required', 'tel'],
    email: ['email'],
    message: ['text']
    // created_at: '',
    // update_at: ''
  },
  storage: ['session', 'remote'],
  remote: {
    base_url: '// ...',
    save: 'POST /contact-form'
  }
});

component('#contact-form', ({ element, events, record }) => {
  events.on('submit', (event) => {
    event.preventDefault();

    record.save();
  });
});
