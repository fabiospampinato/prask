
/* IMPORT */

import color from 'tiny-colors';
import {KEY} from '../constants';
import {identity, isPrintable, isString} from '../utils';
import {statusSymbol, withCursor} from './_helpers';
import prompt from './prompt';

/* TYPES */

type Options<T> = {
  message: string,
  initial?: string,
  format?: ( value: string, status: -1 | 0 | 1 ) => string,
  transform?: ( value: string ) => T,
  validate?: ( value: string ) => string | boolean
};

/* MAIN */

//TODO: Support advanced text manipulation (left/right, home/end, etc.)

const input = <T> ( options: Options<T> ): Promise<T | undefined> => {

  /* STATE */

  let {message, initial, format = identity, transform = identity, validate} = options;
  let pristine = true;
  let status: -1 | 0 | 1 = 0;
  let validating = false;
  let value = '';
  let cursor = 0;

  /* COMPONENTS */

  const main = (): string => {
    const _status = statusSymbol ( status );
    const _message = color.bold ( message );
    const _initial = status === 0 && pristine && initial ? color.dim ( `(${initial})` ) : false;
    const _value = status >= 0 ? withCursor ( format ( value, status ), cursor ) : '';
    return [_status, _message, _initial, _value].filter ( isString ).join ( ' ' );
  };

  const validation = (): string | undefined => {
    if ( !validating || !validate ) return;
    const result = validate ( value );
    if ( result === true ) return;
    const message = result || 'Invalid value';
    return color.yellow ( `⚠ ${message}` );
  };

  /* PROMPT */

  return prompt ({
    render: ( resolve, key ) => {
      if ( key === KEY.ESCAPE ) {
        pristine = false;
        status = -1;
        resolve ();
        return main;
      } else if ( key === KEY.ENTER ) {
        value = pristine ? options.initial || value : value;
        pristine = false;
        validating = true;
        if ( !validation () ) {
          status = 1;
          resolve ( transform ( value as any ) ); //TSC: Try to type this right
          return main;
        }
      } else if ( key === KEY.TAB && pristine ) {
        pristine = false;
        value = options.initial || value;
      } else if ( key === KEY.BACKSPACE ) {
        pristine = false;
        value = value.slice ( 0, -1 );
        cursor = value.length;
      } else if ( isPrintable ( key ) ) {
        pristine = false;
        value += key;
        cursor = value.length;
      }
      return [main, validation];
    }
  });

};

/* EXPORT */

export default input;
