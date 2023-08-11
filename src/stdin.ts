
/* IMPORT */

import {kill, pid, stdin} from 'node:process';
import {KEY} from './constants';

/* MAIN */

const Stdin = {

  /* API */

  start: (): void => {

    stdin.setRawMode ( true );
    stdin.resume ();
    stdin.setEncoding ( 'utf8' );

  },

  stop: (): void => {

    stdin.pause ();
    stdin.setRawMode ( false );

  },

  next: (): Promise<string> => {

    return new Promise ( resolve => {

      stdin.once ( 'data', ( key: string ) => {

        if ( key === KEY.CTRL_C ) {

          kill ( pid, 'SIGINT' ); // Manually emitting the "SIGINT" signal

        } else {

          resolve ( key );

        }

      });

    });

  }

};

/* EXPORT */

export default Stdin;
