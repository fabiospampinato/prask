
/* IMPORT */

import {boolean} from '../dist/index.js';

/* MAIN */

await boolean ({
  message: 'Do you like this library?'
});

await boolean ({
  message: 'Do you like this library?',
  initial: false
});

await boolean ({
  message: 'Do you like this library?',
  initial: true
});
