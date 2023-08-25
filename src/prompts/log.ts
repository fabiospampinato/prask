
/* IMPORT */

import {error, info, question, success, warning} from './_helpers';

/* MAIN */

const log = {
  success: ( message: string ): void => console.log ( success ( message ) ),
  error: ( message: string ): void => console.log ( error ( message ) ),
  warning: ( message: string ): void => console.log ( warning ( message ) ),
  question: ( message: string ): void => console.log ( question ( message ) ),
  info: ( message: string ): void => console.log ( info ( message ) )
};

/* EXPORT */

export default log;
