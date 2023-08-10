
/* IMPORT */

import color from 'tiny-colors';

/* MAIN */

const statusSymbol = ( status: number ): string => {
  if ( status < 0 ) return color.red ( '✖' );
  if ( status > 0 ) return color.green ( '✔' );
  return color.cyan ( color.bold ( '?' ) );
};

/* EXPORT */

export {statusSymbol};
