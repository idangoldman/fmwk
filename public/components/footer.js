import { pluralize } from 'src/helpers';
import { component } from 'src/index';
import Handlebars from 'handlebars';
import $ from 'jquery';

component('.footer', ({ element, events, locals, router }) => {
  let footerTemplate = Handlebars.compile(
    $('#footer-template').html();
  );

  function renderFooterTemplate() {
    let todos = locals.get('todos');
    let activeTodoCount = todos.filter(todo => !todo.completed).length;
    let todoCount = todos.length;

    $(element).html(footerTemplate({
      activeTodoCount: activeTodoCount,
      activeTodoWord: pluralize(activeTodoCount, 'item'),
      completedTodos: todoCount - activeTodoCount,
      filter: router.route.hash
    }));
  }

  function filterTodos({ target, preventDefault }) {
    preventDefault();

    router.change(
      $(target).prop('href')
    );
  }

  function clearCompletedTodos() {
    locals.remove('todos', { completed: true });
  }

  router.on('change', renderFooterTemplate);
  locals.on('change', 'todos', renderFooterTemplate);
  events.on('click', '.filters a', filterTodos);
  events.on('click', '.clear-completed', clearCompletedTodos);
});
