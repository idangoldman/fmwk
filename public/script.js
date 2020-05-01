import { component } from '../src/index';

component('#mc_embed_signup', ({ element, events }) => {
  console.log(element);

  // events.on('change', '#mce-LNAME', event => {
  //   console.log(event.target);
  // });

  events.on('submit', (event) => {
    event.preventDefault();

    console.log('SUBMIT !!!');
  });
});
