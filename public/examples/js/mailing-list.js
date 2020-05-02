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

component('form#mailing-list', '/mailchimp-newsletter', ({ element, events, models }) => {
  models.save_to('session');

  events.on('submit', { preventDefault: true }, (event, model) => {
    if (model.is_valid) {
      model
        .save_to('local')
        .update({ FNAME: 'dude' })
        .save()
        .to_object();
    } else {
      element.render(model.to_object);
    }
  });
});
