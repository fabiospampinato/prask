
/* IMPORT */

import color from 'tiny-colors';

/* MAIN */

const log = {
  success: ( message: string ): void => console.log ( `${color.green ( '✔' )} ${message}` ),
  error: ( message: string ): void => console.log ( `${color.red ( '✖' )} ${message}` ),
  question: ( message: string ): void => console.log ( `${color.cyan ( color.bold ( '?' ) )} ${message}` ),
  warning: ( message: string ): void => console.log ( `${color.yellow ( '⚠' )} ${color.yellow ( message )}` ),
  info: ( message: string ): void => console.log ( `${color.cyan ( 'ℹ' )} ${message}` )
};

/* EXPORT */

export default log;
