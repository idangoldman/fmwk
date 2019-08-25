import { select, locals } from 'feature';

select('.todos', ({ pubsub, locals, render }) => {

  // locals initial with the selector as name connection.
  // locals.defaults([]);

  render('/todos', locals);

  pubsub.on('todos/create', ({ rawData }) => {
    locals.create(rawData, defaults = {
      'id': null,
      'title': '',
      'complete': false,
      'created_at': new Date(),
      'update_at': new Date()
    });

    render(locals);
  });

  pubsub.on('todos/sort/complete', () => {
    render(locals.sort('complete', true));
    render(locals.sort({ 'complete': true }));
  });

});
