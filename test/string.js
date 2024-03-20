
/* IMPORT */

import color from 'tiny-colors';
import {string} from '../dist/index.js';

/* MAIN */

await string ({
  message: 'What is your name?'
});

await string ({
  message: '古池や古池や古池や古池や古池や古池や古池や古池や古池や古池や?'
});

await string ({
  message: 'What is your name?',
  required: true
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

await string ({
  message: 'What is your name?',
  format: value => ( value.length < 5 ) ? color.red ( value ) : color.green ( value ),
  validate: value => ( value.length < 5 ) ? 'The name must be at least 5 characters long' : true
});
