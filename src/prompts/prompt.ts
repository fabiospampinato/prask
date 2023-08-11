
/* IMPORT */

import NakedPromise from 'promise-make-naked';
import Cursor from 'tiny-cursor';
import process from 'node:process';
import readline from 'node:readline';
import Stdin from '../stdin';
import {castArray, isString} from '../utils';

/* TYPES */

type Line = {
  (): string | undefined
};

type Prompt<T> = (
  ( resolve: ( value?: T ) => void, key: string ) => Line[] | Line
);

/* MAIN */

const prompt = <T> ( prompt: Prompt<T> ): Promise<T | undefined> => {

  return NakedPromise.wrap <T | undefined> ( async ({ resolve, isPending }) => {

    /* INIT */

    Cursor.hide ();
    Stdin.start ();

    /* STATE */

    let lineCursor = 0;
    let key = '';

    while ( true ) {

      /* RESET CURSOR */

      readline.moveCursor ( process.stdout, 0, -lineCursor );
      readline.cursorTo ( process.stdout, 0 );

      /* RE-RENDER */

      const linesNext = castArray ( prompt ( resolve, key ) ).map ( line => line () ).filter ( isString );

      for ( let i = 0, l = linesNext.length; i < l; i++ ) {

        const lineNext = linesNext[i];

        process.stdout.write ( lineNext );

        readline.clearLine ( process.stdout, 1 );

        if ( i < l - 1 ) {

          process.stdout.write ( '\r\n' );

        } else {

          readline.clearScreenDown ( process.stdout );

        }

      }

      lineCursor = linesNext.length - 1;

      /* EXIT */

      if ( !isPending () ) break;

      /* NEXT */

      key = await Stdin.next ();

    }

    /* RESET */

    process.stdout.write ( '\r\n' );

    Stdin.stop ();
    Cursor.show ();

  });

};

/* EXPORT */

export default prompt;
