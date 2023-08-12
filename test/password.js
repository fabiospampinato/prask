
/* IMPORT */

import {password} from '../dist/index.js';

/* MAIN */

await password ({
  message: 'What is your password?'
});

await password ({
  message: 'What is your password?',
  required: true
});

await password ({
  message: 'What is your password?',
  initial: 'P@assword!',
  validate: value => ( value.length < 8 ) ? 'The password must be at least 8 characters long' : true
});
