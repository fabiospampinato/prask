
/* IMPORT */

import {select} from '../dist/index.js';
import {COUNTRIES} from './_fixtures.js';

/* MAIN */

await select ({
  message: 'Which country would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) )
});

await select ({
  message: 'Which country would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) ),
  limit: Infinity
});

await select ({
  message: 'Which country would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) ),
  searchable: false
});

await select ({
  message: 'Which country would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) ),
  validate: value => value.startsWith ( 'A' ) ? 'An A country?' : true
});
