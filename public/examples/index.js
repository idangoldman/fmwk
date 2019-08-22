import { component } from 'feature';

component.render.engine('nunjucks'); // default

// {
//   element,
//   events,
//   pubsub,
//   cookie,
//   session,
//   local,
//   render
//   rest,
//   router,
//   worker
// }


component('.new-todo', ({ events }) => {
  events.on('keypress', ({ target }) => {
    console.log(target.value);
  });
});

component('#toggle-all', ({ events }) => {
  events.on('click', ({ target }) => {
    console.log(target.checked);
  });
});
