import { component, redirectTo } from 'feature';

component('form.newsletter', ({ events, rest, render }) => {
  events.on('submit', ({ element, event }) => {
    const value = element.find('.email').value;

    rest
      .create({ email: value.isEmail? value: '' })
      .then(() => redirectTo('/thank-you'))
      .catch(() => redirectTo('/404'));

    event.preventDefault();
  });

  render('forms/newsletter', {
    'placeholder': 'reply@staticpage.io',
    'title': 'Create a Static Page and get a free set of Social Media upto date icons.',
    'submitText': 'Gain early access'
  });
});
