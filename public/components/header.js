import { ENTER_KEY } from 'public/constants';
import { uuid } from 'src/helpers';
import { component } from 'src/index';
import $ from 'jquery';

component('.header', ({ events, locals }) => {
  function newTodo({ keyCode, target }) {
    let value = $(target).val().trim();

    if (keyCode === ENTER_KEY && value.length) {
      locals.insert('todos', {
        id: uuid(),
        title: value,
        completed: false
      });
    }
  }

  events.on('keypress', '.new-todo', newTodo);
});
