import { component, records } from '../src/index';

records('#mc_embed_signup', {
  models: {
    email: {
      placeholder: 'Enter Email.',
      validation: ['required', 'email'],
      value: ''
    }
  },
  storage: ['session', 'remote'],
  remote: {
    base_url: '// ...',
    read: 'GET ...',
    reads: 'GET ...',
    save: 'POST ...',
    update: '',
    delete: ''
  }
});

component('#mc_embed_signup', ({ element, events, record }) => {
  console.log(element);

  // events.on('change', '#mce-LNAME', event => {
  //   console.log(event.target);
  // });

  events.on('submit', (event) => {
    event.preventDefault();
    record.save();
    console.log('SUBMIT !!!');
  });
});
