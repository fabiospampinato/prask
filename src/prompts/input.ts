
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
  required?: boolean,
  format?: ( value: string, status: -1 | 0 | 1 ) => string,
  transform?: ( value: string ) => T,
  validate?: ( value: string ) => string | boolean
};

/* MAIN */

const input = <T> ( options: Options<T> ): Promise<T | undefined> => {

  /* STATE */

  let {message, initial, required, format = identity, transform = identity, validate} = options;
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
    const _cursor = status === 0 ? cursor : -1;
    const _value = status >= 0 ? withCursor ( format ( value, status ), _cursor ) : '';
    return [_status, _message, _initial, _value].filter ( isString ).join ( ' ' );
  };

  const validation = (): string | undefined => {
    const missing = validating && required && !value;
    if ( missing ) return color.yellow ( '⚠ Please provide a value' );
    if ( !validating || !validate ) return;
    const result = validate ( value );
    if ( result === true ) return;
    const message = result || 'Invalid value';
    return color.yellow ( `⚠ ${message}` );
  };

  /* PROMPT */

  return prompt ( ( resolve, input ) => {
    if ( input === KEY.ESCAPE ) {
      pristine = false;
      status = -1;
      resolve ();
      return main;
    } else if ( input === KEY.ENTER ) {
      value = pristine ? options.initial || value : value;
      pristine = false;
      validating = true;
      if ( !validation () ) {
        status = 1;
        resolve ( transform ( value as any ) ); //TSC: Try to type this right
        return main;
      }
    } else if ( input === KEY.TAB && pristine ) {
      pristine = false;
      value = options.initial || value;
      cursor = value.length;
    } else if ( input === KEY.LEFT ) {
      cursor = Math.max ( 0, cursor - 1 );
    } else if ( input === KEY.RIGHT ) {
      cursor = Math.min ( value.length, cursor + 1 );
    } else if ( input === KEY.CTRL_A ) {
      cursor = 0;
    } else if ( input === KEY.CTRL_E ) {
      cursor = value.length;
    } else if ( input === KEY.BACKSPACE ) {
      pristine = false;
      value = `${value.slice ( 0, Math.max ( 0, cursor - 1 ) )}${value.slice ( cursor )}`;
      cursor = Math.max ( 0, cursor - 1 );
    } else if ( input === KEY.DELETE ) {
      pristine = false;
      value = `${value.slice ( 0, cursor )}${value.slice ( cursor + 1 )}`;
      cursor = Math.min ( value.length, cursor );
    } else if ( isPrintable ( input ) ) {
      pristine = false;
      value = `${value.slice ( 0, cursor )}${input}${value.slice ( cursor )}`;
      cursor = Math.min ( value.length, cursor + input.length );
    }
    return [main, validation];
  });

};

/* EXPORT */

export default input;
