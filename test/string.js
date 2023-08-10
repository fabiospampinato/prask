
/* IMPORT */

import {string} from '../dist/index.js';

/* MAIN */

await string ({
  message: 'What is your name?'
});

await string ({
  message: 'What is your name?',
  initial: 'John Doe'
});

await string ({
  message: 'What is your name?',
  initial: 'John Doe',
  validate: value => ( value.length < 5 ) ? 'The name must be at least 5 characters long' : true
});
