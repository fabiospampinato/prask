
/* IMPORT */

import {multiselect} from '../dist/index.js';
import {COUNTRIES} from './_fixtures.js';

/* MAIN */

await multiselect ({
  message: 'Which countries would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) )
});

await multiselect ({
  message: 'Which countries would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) ),
  limit: Infinity
});

await multiselect ({
  message: 'Which countries would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) ),
  min: 1,
  max: 4
});

await multiselect ({
  message: 'Which countries would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) ),
  min: 2,
  max: 4
});

await multiselect ({
  message: 'Which countries would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) ),
  searchable: false
});

await multiselect ({
  message: 'Which countries would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) ),
  validate: values => values.length && values.every ( value => value.startsWith ( 'A' ) ) ? 'Only A countries?' : true
});
