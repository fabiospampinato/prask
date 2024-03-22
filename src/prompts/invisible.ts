
/* IMPORT */

import {identity} from '../utils';
import input from './input';

/* TYPES */

type InvisibleOptions = {
  message: string,
  initial?: string,
  required?: boolean,
  validate?: ( value: string ) => string | boolean
};

/* MAIN */

const invisible = ( options: InvisibleOptions ): Promise<string | undefined> => {

  return input ({
    ...options,
    format: () => '',
    transform: identity
  });

};

/* EXPORT */

export default invisible;
export type {InvisibleOptions};
