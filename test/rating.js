
/* IMPORT */

import {rating} from '../dist/index.js';

/* MAIN */

await rating ({
  message: 'How would you rate this library?'
});

await rating ({
  message: 'How would you rate this library?',
  initial: 5
});
