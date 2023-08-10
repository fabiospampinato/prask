
/* IMPORT */

import {kill, pid, stdin, stdout} from 'node:process';

/* MAIN */

const Stdin = {

  /* API */

  next: (): Promise<string> => {

    return new Promise ( resolve => {

      stdin.setRawMode ( true );
      stdin.resume ();
      stdin.setEncoding ( 'utf8' );

      stdin.once ( 'data', ( key: string ) => {

        if ( key === '\x03' ) { // Ctrl+C

          kill ( pid, 'SIGINT' ); // Manually emitting the "SIGINT" signal

        } else {

          stdin.pause ();
          stdin.setRawMode ( false );

          resolve ( key );

        }

      });

    });

  },

  newline: (): void => { // Removes the trailing `%`, and avoids different prompts overlapping

    stdout.write ( '\r\n' );

  }

};

/* EXPORT */

export default Stdin;
