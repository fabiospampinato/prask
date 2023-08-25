
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

const statusSymbol = ( status: number ): string => {
  if ( status < 0 ) return color.red ( SYMBOL_ERROR );
  if ( status > 0 ) return color.green ( SYMBOL_SUCCESS );
  return color.cyan.bold ( SYMBOL_QUESTION );
};

const success = ( message: string ): string => {
  return `${color.green ( SYMBOL_SUCCESS )} ${message}`;
};

const warning = ( message: string ): string => {
  return `${color.yellow.bold ( SYMBOL_WARNING )} ${color.yellow ( message )}`;
};

const withCursor = ( value: string, position: number ): string => {
  if ( position < 0 ) return value;
  if ( position >= value.length ) return `${value}${color.inverse ( ' ' )}`;
  return `${value.slice ( 0, position )}${color.inverse ( value.slice ( position, position + 1 ) )}${value.slice ( position + 1 )}`;
};

/* EXPORT */

export {error, info, question, statusSymbol, success, warning, withCursor};
