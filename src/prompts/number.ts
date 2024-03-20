
/* IMPORT */

import color from 'tiny-colors';
import {KEY} from '../constants';
import input from './input';
import type {InputState} from './input';

/* TYPES */

type NumberOptions = {
  message: string,
  initial?: number,
  format?: ( value: string, settled: boolean ) => string,
  validate?: ( value: string ) => string | boolean
};

/* MAIN */

const number = async ( options: NumberOptions ): Promise<number | undefined> => {

  const actionAdd = ( state: InputState, value: number ): void => {
    if ( Number.isNaN ( Number ( state.value ) ) ) return;
    state.pristine = false;
    state.value = `${Number ( state.value ) + value}`;
    state.cursor = state.value.length;
  };

  return input ({
    message: options.message,
    initial: options.initial?.toString (),
    format: options.format || (( value, settled ) => settled ? color.cyan ( value ) : value),
    transform: value => Number ( value ),
    validate: value => !value || Number.isNaN ( Number ( value ) ) ? 'Please enter a valid number' : ( options.validate?.( value ) ?? true ),
    actions: {
      [KEY.UP]: state => actionAdd ( state, 1 ),
      [KEY.RIGHT]: state => actionAdd ( state, 1 ),
      [KEY.DOWN]: state => actionAdd ( state, -1 ),
      [KEY.LEFT]: state => actionAdd ( state, -1 )
    }
  });

};

/* EXPORT */

export default number;
export type {NumberOptions};
