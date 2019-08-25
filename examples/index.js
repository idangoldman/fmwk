import { component } from 'feature';

// {
//   element,
//   events,
//   local,
//   session,
//   cookie,
//   router,
//   rest,
//   pubsub,
//   render
//   worker (cache?)
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
