
/* IMPORT */

import {setTimeout as delay} from 'node:timers/promises';
import {boolean, invisible, multiselect, number, password, prompt, rating, select, spinner, string, toggle} from '../dist/index.js';
import {COUNTRIES} from '../test/_fixtures.js';

/* MAIN - INPUT */

await string ({
  message: 'What is your name?',
  initial: 'John Doe'
});

await invisible ({
  message: 'What is your password?'
});

await password ({
  message: 'What is your password?'
});

await number ({
  message: 'What is your favorite number?',
  initial: 42
});

/* MAIN - SELECTION */

await multiselect ({
  message: 'Which countries would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) )
});

await select ({
  message: 'Which country would you like to visit?',
  options: COUNTRIES.map ( title => ({ title, value: title }) )
});

await boolean ({
  message: 'Do you like this library?'
});

await toggle ({
  message: 'Do you like this library?'
});

await rating ({
  message: 'How would you rate this library?'
});

/* MAIN - OTHER */

await spinner ( async ({ update, resolve }) => {
  update ( 'Working' );
  await delay ( 750 );
  update ( 'Working hard' );
  await delay ( 750 );
  update ( 'Working harder' );
  await delay ( 750 );
  update ( 'Working real hard' );
  await delay ( 750 );
  resolve ( 'Work done' );
});
