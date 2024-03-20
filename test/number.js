
/* IMPORT */

import color from 'tiny-colors';
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

await number ({
  message: 'What is your favorite even number?',
  format: value => ( value % 2 ) ? color.red ( value ) : color.green ( value ),
  validate: value => ( value % 2 ) ? 'The number must be even' : true
});
