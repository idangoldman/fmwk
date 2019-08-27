import { component, redirectTo } from 'feature';
import { redirectTo } from 'feature/router';

component('form.newsletter', ({ element, events, rest, render }) => {
  events.on('submit', ({ preventDefault }) => {
    let value = element.find('.email').val();

    rest
      .create({ email: value.isEmail? value: '' })
      .then(() => redirectTo('/thank-you'))
      .catch(() => redirectTo('/404'));

    preventDefault();
  });

  render('forms/newsletter', {
    'placeholder': 'reply@staticpage.io',
    'title': 'Create a Static Page and get a free set of Social Media upto date icons.',
    'submitText': 'Gain early access'
  });
});
