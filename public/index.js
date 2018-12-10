import feature as component from '../src/index';

// feature('.todoapp', ({ element, events, pubsub, cookie, session, locals, router }) => {
// page('.todoapp', ({ element, events }) => {
//   // console.log(element.toString);
//   // console.log(element.raw.value);
//
//   events.on('keypress', '.new-todo', ({ target }) => {
//     console.log(target.value);
//   });
//
//   events.on('click', '#toggle-all', ({ target }) => {
//     console.log(target.checked);
//   });
// });
//
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
