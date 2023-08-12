
/* IMPORT */

import input from './input';

/* TYPES */

type Options = {
  message: string,
  initial?: string,
  required?: boolean,
  validate?: ( value: string ) => string | boolean
};

/* MAIN */

const invisible = ( options: Options ): Promise<string | undefined> => {

  return input ({
    ...options,
    format: () => ''
  });

};

/* EXPORT */

export default invisible;
