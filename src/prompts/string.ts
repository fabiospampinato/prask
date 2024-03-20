
/* IMPORT */

import input from './input';

/* TYPES */

type StringOptions = {
  message: string,
  initial?: string,
  required?: boolean,
  format?: ( value: string, settled: boolean ) => string,
  validate?: ( value: string ) => string | boolean
};

/* MAIN */

const string = ( options: StringOptions ): Promise<string | undefined> => {

  return input ( options );

};

/* EXPORT */

export default string;
export type {StringOptions};
