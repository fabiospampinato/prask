
/* IMPORT */

import input from './input';

/* TYPES */

type Options = {
  message: string,
  initial?: string,
  validate?: ( value: string ) => string | boolean
};

/* MAIN */

const string = ( options: Options ): Promise<string | undefined> => {

  return input ( options );

};

/* EXPORT */

export default string;
