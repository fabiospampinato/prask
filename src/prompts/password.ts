
/* IMPORT */

import input from './input';

/* TYPES */

type Options = {
  message: string,
  initial?: string,
  validate?: ( value: string ) => string | boolean
};

/* MAIN */

const password = ( options: Options ): Promise<string | undefined> => {

  return input ({
    ...options,
    format: value => '*'.repeat ( value.length )
  });

};

/* EXPORT */

export default password;
