import { component, models } from 'feature';

// models.create(
//   'form#mailing-list', ['EMAIL', 'FNAME', 'LNAME']
// );

models.create('form#mailing-list', {
  model: {
    EMAIL: {
      type: 'email',
      placeholder: 'email@example.com',
      required: true,
      validation: {
        required: 'This field is required.',
        type: 'Not a valid email.'
      }
    },
    PHONE: { type: 'tel', required: true },
    FNAME: { type: 'text', placeholder: 'First Name' },
    LNAME: { type: 'text', placeholder: 'Last Name' }
  },

  get: () => {},
  is_valid: () => {},
  patch: () => {},
  post: () => {},
  remove: () => {},
  save_to: () => {},
  save: () => {},
  update: () => {},

  to_data: '',
  to_json: '',
  to_params: ''
});

component('form#mailing-list', '/mailchimp-newsletter', ({ element, events }) => {
  events.on('submit', { preventDefault: true }, (event, model) => {
    // model.post();
    // model.save_to('local', 'session', 'cookie');
    // console.log(model.to_json);
    // console.log(model.to_params);

    if (model.is_valid()) {
      model
        .save_to('session')
        .update();
      // model.update();
    } else {
      element.render(model.to_object);
    }
  });
});
