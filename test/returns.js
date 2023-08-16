
/* IMPORT */

import {boolean, invisible, multiselect, number, password, rating, select, spinner, string, toggle} from '../dist/index.js';
import {COUNTRIES} from './_fixtures.js';

/* MAIN */

console.log ( await boolean ({ message: 'Do you like this library?' }) );
console.log ( await invisible ({ message: 'What is your password?' }) );
console.log ( await multiselect ({ message: 'Which countries would you like to visit?', options: COUNTRIES.map ( title => ({ title, value: title }) ) }) );
console.log ( await number ({ message: 'What is your favorite number?' }) );
console.log ( await password ({ message: 'What is your password?' }) );
console.log ( await rating ({ message: 'How would you rate this library?' }) );
console.log ( await select ({ message: 'Which country would you like to visit?', options: COUNTRIES.map ( title => ({ title, value: title }) ) }) );
console.log ( await spinner ( async ({ resolve }) => resolve ( 'Work done' ) ) );
console.log ( await spinner ( async ({ reject }) => reject ( 'Work not done' ) ) );
console.log ( await string ({ message: 'What is your name?' }) );
console.log ( await toggle ({ message: 'Do you like this library?' }) );
