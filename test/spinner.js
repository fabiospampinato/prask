
/* IMPORT */

import {setTimeout as delay} from 'node:timers/promises';
import {spinner} from '../dist/index.js';

/* MAIN */

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

await spinner ( async ({ update, reject }) => {
  update ( 'Working' );
  await delay ( 750 );
  update ( 'Working hard' );
  await delay ( 750 );
  update ( 'Working harder' );
  await delay ( 750 );
  update ( 'Working real hard' );
  await delay ( 750 );
  reject ( 'Work not done' );
});
