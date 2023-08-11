
/* IMPORT */

import {kill, pid, stdin} from 'node:process';

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

        if ( key === '\x03' ) { // Ctrl+C

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
