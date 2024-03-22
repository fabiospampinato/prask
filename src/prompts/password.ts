
/* IMPORT */

import color from 'tiny-colors';
import {identity} from '../utils';
import input from './input';

/* TYPES */

type PasswordOptions = {
  message: string,
  initial?: string,
  required?: boolean,
  validate?: ( value: string ) => string | boolean
};

/* MAIN */

const password = ( options: PasswordOptions ): Promise<string | undefined> => {

  return input ({
    ...options,
    transform: identity,
    format: ( value, settled ) => {
      const asterisks = '*'.repeat ( value.length );
      const password = settled ? color.cyan ( asterisks ): asterisks;
      return password;
    }
  });

};

/* EXPORT */

export default password;
export type {PasswordOptions};
