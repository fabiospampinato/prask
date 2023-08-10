
/* IMPORT */

import {invisible} from '../dist/index.js';

/* MAIN */

await invisible ({
  message: 'What is your password?'
});

await invisible ({
  message: 'What is your password?',
  initial: 'P@assword!',
  validate: value => ( value.length < 8 ) ? 'The password must be at least 8 characters long' : true
});
