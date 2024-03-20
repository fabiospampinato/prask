
/* IMPORT */

import color from 'tiny-colors';
import {SYMBOL_ERROR, SYMBOL_INFO, SYMBOL_QUESTION, SYMBOL_SUCCESS, SYMBOL_WARNING} from './_symbols';

/* MAIN */

const error = ( message: string ): string => {
  return `${color.red ( SYMBOL_ERROR )} ${message}`;
};

const info = ( message: string ): string => {
  return `${color.cyan ( SYMBOL_INFO )} ${message}`;
};

const question = ( message: string ): string => {
  return `${color.cyan.bold ( SYMBOL_QUESTION )} ${message}`;
};

const success = ( message: string ): string => {
  return `${color.green ( SYMBOL_SUCCESS )} ${message}`;
};

const warning = ( message: string ): string => {
  return `${color.yellow.bold ( SYMBOL_WARNING )} ${color.yellow ( message )}`;
};

const getPositionIndex = ( value: string, position: number ): number => { // This accounts for ANSI control sequences
  const re = /([\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><])|(.)/g; // This splits the string into ANSI control sequences and normal characters
  for ( const match of value.matchAll ( re ) ) {
    if ( !match[2] ) continue;
    position -= 1;
    if ( position >= 0 ) continue;
    return match.index || 0;
  }
  return -1;
};

const getStatusSymbol = ( status: number ): string => {
  if ( status < 0 ) return color.red ( SYMBOL_ERROR );
  if ( status > 0 ) return color.green ( SYMBOL_SUCCESS );
  return color.cyan.bold ( SYMBOL_QUESTION );
};

const withCursor = ( value: string, position: number ): string => {
  if ( position < 0 ) return value;
  position = getPositionIndex ( value, position );
  if ( position < 0 ) return `${value}${color.inverse ( ' ' )}`;
  return `${value.slice ( 0, position )}${color.inverse ( value.slice ( position, position + 1 ) )}${value.slice ( position + 1 )}`;
};

/* EXPORT */

export {error, info, question, success, warning, getPositionIndex, getStatusSymbol, withCursor};
