import { router } from 'src/index';
import Handlebars from 'handlebars';

Handlebars.registerHelper('eq', function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});

router.start('#/all');

import 'component/header';
import 'component/main';
import 'component/footer';
