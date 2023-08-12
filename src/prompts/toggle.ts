
/* IMPORT */

import color from 'tiny-colors';
import {KEY} from '../constants';
import {statusSymbol} from './_helpers';
import prompt from './prompt';

/* TYPES */

type Options = {
  message: string,
  initial?: boolean
};

/* MAIN */

const toggle = ( options: Options ): Promise<boolean | undefined> => {

  /* STATE */

  let {message, initial = true} = options;
  let status: -1 | 0 | 1 = 0;
  let value = initial;

  /* COMPONENTS */

  const main = (): string => {
    const _status = statusSymbol ( status );
    const _message = color.bold ( message );
    const _slash = color.dim ( '/' );
    const _no = ( value === false ) ? color.cyan.underline ( 'No' ) : 'No';
    const _yes = ( value === true ) ? color.cyan.underline ( 'Yes' ) : 'Yes';
    const _selected = color.cyan ( value ? 'Yes' : 'No' );
    const _parts = ( status === -1 ) ? [_status, _message] : ( status === 1 ) ? [_status, _message, _selected] : [_status, _message, _no, _slash, _yes];
    return _parts.join ( ' ' );
  };

  /* PROMPT */

  return prompt ( ( resolve, input ) => {
    if ( input === KEY.ESCAPE ) {
      status = -1;
      resolve ();
    } else if ( input === KEY.ENTER ) {
      status = 1;
      resolve ( value );
    } else if ( input === KEY.TAB || input === KEY.LEFT || input === KEY.RIGHT ) {
      value = !value;
    }
    return main;
  });

};

/* EXPORT */

export default toggle;
