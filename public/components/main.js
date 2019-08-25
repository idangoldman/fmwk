import { component } from 'src/index';
import { ENTER_KEY, ESCAPE_KEY } from 'public/constants';
import Handlebars from 'handlebars';
import $ from 'jquery';


component('.main', ({ element, events, locals }) => {
  let todoTemplate = Handlebars.compile(
    $('#todo-template').html();
  );

  function renderTodosTemplate(filter = 'all') {
    let todos = [];

    switch(filter) {
      case 'active':
        todos = locals.filter('todos', { completed: false });
        break;
      case 'active':
        todos = locals.filter('todos', { completed: true });
        break;
      case 'all':
      default:
        todos = locals.get('todos');
        break;
    }

    if (todos.length) {
      $(element)
        .css({ 'display': 'block' });
        .find('.todo-list').html(todoTemplate(todos));
    } else {
      $(element)
        .css({ 'display': 'none' })
        .find('.todo-list').empty();
    }
  };

  function completeTodo({ target }) {
    $(target)
      .prop('checked', !target.checked);
      .parents('li').toggleClass('completed');

    locals.update('todos/:id', {
      id: todo.dataset.id,
      completed: !!target.checked
    });
  }

  function editTodoMode({ target }) {
    $(target).parents('li').addClass('editing');
  }

  function editTodo({ keyCode, target }) {
    let $todo = $(target).parent();

    if ([ENTER_KEY, ESCAPE_KEY].includes(keyCode)) {
      switch (keyCode) {
        case ENTER_KEY:
          locals.update('todos/:id', {
            id: todo.dataset.id,
            title: target.value.trim()
          });
          break;
        case ESCAPE_KEY:
          $(target).val(
            $todo.find('label').html()
          );
          break;
      }

      $todo.removeClass('editing');
    }
  }

  function removeTodo({ target }) {
    locals.remove('todos/:id', {
      id: $(target).parent().data('id')
    });
  }

  function toggleAllTodos({ target }) {
    locals.update('todos', { completed: !!$(target).prop('checked') });
  }

  router.on('change', (route) => renderTodosTemplate(route.hash));
  locals.on('change', 'todos', () => renderTodosTemplate('all'));
  events.on('click', 'li .toggle', completeTodo);
  events.on('dbclick', 'li label', editTodoMode);
  events.on('keypress', 'li .edit', editTodo);
  events.on('click', 'li .destroy', removeTodo);
  events.on('change', '.toggle-all', toggleAllTodos);
});
