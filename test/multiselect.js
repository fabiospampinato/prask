
/* IMPORT */

import color from 'tiny-colors';
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

await multiselect ({
  message: 'Which countries would you like to visit?',
  options: [
    { title: 'Red', value: 'red', description: 'Some description...' },
    { title: 'Green', value: 'green', description: 'Some other description...' },
    { title: 'Blue', value: 'blue' },
    { title: 'Yellow', value: 'yellow', hint: 'Some hint...' },
    { title: 'Magenta', value: 'magenta', hint: 'Some other hint...' },
    { title: 'Cyan', value: 'cyan' },
    { title: 'White', value: 'white', description: 'Some description', hint: 'Some hint' },
    { title: 'Black', value: 'black', description: 'Some other description', hint: 'Some other hint' }
  ],
  limit: Infinity
});

await multiselect ({
  message: 'Which countries would you like to visit?',
  options: [
    { title: 'Red', value: 'red' },
    { title: color.inverse ( ' GROUP 1 ' ), heading: true },
    { title: 'Green', value: 'green', disabled: true },
    { title: 'Blue', value: 'blue', disabled: true },
    { title: 'Yellow', value: 'yellow', selected: false },
    { title: 'Magenta', value: 'magenta', selected: true },
    { title: color.inverse ( ' GROUP 2 ' ), heading: true },
    { title: 'Cyan', value: 'cyan', selected: true },
    { title: 'White', value: 'white', disabled: true, selected: true },
    { title: 'Black', value: 'black' }
  ],
  limit: Infinity
});
