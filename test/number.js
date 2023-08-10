
/* IMPORT */

import {number} from '../dist/index.js';

/* MAIN */

await number ({
  message: 'What is your favorite number?'
});

await number ({
  message: 'What is your favorite number?',
  initial: 42
});

await number ({
  message: 'What is your favorite even number?',
  initial: 42,
  validate: value => ( value % 2 ) ? 'The number must be even' : true
});
