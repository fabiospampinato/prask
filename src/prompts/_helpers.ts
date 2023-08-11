
/* IMPORT */

import color from 'tiny-colors';

/* MAIN */

const statusSymbol = ( status: number ): string => {
  if ( status < 0 ) return color.red ( '✖' );
  if ( status > 0 ) return color.green ( '✔' );
  return color.cyan ( color.bold ( '?' ) );
};

const withCursor = ( value: string, position: number ): string => {
  if ( position >= value.length ) return `${value}${color.inverse ( ' ' )}`;
  if ( position >= 0 ) return `${value.slice ( 0, position )}${color.inverse ( value.slice ( position, position + 1 ) )}${value.slice ( position + 1 )}`;
  return value;
};

/* EXPORT */

export {statusSymbol, withCursor};
