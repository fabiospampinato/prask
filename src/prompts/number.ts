
/* IMPORT */

import color from 'tiny-colors';
import input from './input';

/* TYPES */

type Options = {
  message: string,
  initial?: number,
  format?: ( value: string, settled: boolean ) => string,
  validate?: ( value: string ) => string | boolean
};

/* MAIN */

//TODO: Support incrementing/decrementing the value with up/down arrows

const number = async ( options: Options ): Promise<number | undefined> => {

  return input ({
    message: options.message,
    initial: options.initial?.toString (),
    format: options.format || (( value, settled ) => settled ? color.cyan ( value ) : value),
    transform: value => Number ( value ),
    validate: value => !value || Number.isNaN ( Number ( value ) ) ? 'Please enter a valid number' : ( options.validate?.( value ) ?? true )
  });

};

/* EXPORT */

export default number;
