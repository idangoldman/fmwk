import { component } from 'feature';

component('#cookie-alert', ({ events, locals, render }) => {

  locals.defaults({
    'cookieEnabled': false
  });

  events.on('click', '#ok', () => {
    locals.set('cookieEnabled', true);
  });

  events.on('click', '#more-details', () => {
    element.find('#details-modal').modal('show');
  });

  if (!locals.get('cookieEnabled')) {
    render('cookie-alert', locals);
  }
});
