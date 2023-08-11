
/* IMPORT */

import {toggle} from '../dist/index.js';

/* MAIN */

await toggle ({
  message: 'Do you like this library?'
});

await toggle ({
  message: 'Do you like this library?',
  initial: false
});

await toggle ({
  message: 'Do you like this library?',
  initial: true
});
