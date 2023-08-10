
/* IMPORT */

import purge from 'ansi-purge';
import Cursor from 'tiny-cursor';
import process from 'node:process';
import readline from 'node:readline';
import Stdin from '../stdin';
import {castArray, isFunction, isNumber, isString} from '../utils';

/* TYPES */

type Line = {
  (): string | undefined
};

type Prompt<T> = {
  cursor?: (() => void) | number | false,
  render: ( resolve: ( value?: T ) => void, key: string ) => Line[] | Line
};

/* MAIN */

//FIXME: flickering
//TODO: Rewrite this whole module, it's pretty ugly

/* MAIN */

const prompt = <T> ( prompt: Prompt<T> ): Promise<T | undefined> => {

  return new Promise<T> ( async res => {

    /* HELPERS */

    let settled = false;

    const resolve = ( value?: T ) => {
      settled = true;
      res ( value );
    };

    /* STATE */

    let lineCursor = 0;
    let linesPrev = 0;
    let key = '';

    while ( true ) {

      /* RESET CURSOR */

      for ( let i = lineCursor; i > 0; i-- ) {
        readline.moveCursor ( process.stdout, 0, -1 );
      }

      readline.cursorTo ( process.stdout, 0 );

      /* RESET SCREEN */

      readline.clearScreenDown ( process.stdout );

      /* PRINT */

      const linesNext = castArray ( prompt.render ( resolve, key ) ).map ( line => line () ).filter ( isString );

      for ( let i = 0, l = linesNext.length; i < l; i++ ) {
        const line = linesNext[i];
        process.stdout.write ( line );
        if ( i < l - 1 ) Stdin.newline ();
      }

      linesPrev = linesNext.length;
      lineCursor = linesNext.length - 1;

      /* EXIT */

      if ( settled ) break;

      /* CURSOR */

      if ( isNumber ( prompt.cursor ) ) {
        for ( let i = linesNext.length - 1; i > 0; i-- ) {
          readline.moveCursor ( process.stdout, 0, -1 );
        }
        readline.cursorTo ( process.stdout, purge ( linesNext[prompt.cursor] ).length );
        lineCursor = prompt.cursor;
      } else if ( isFunction ( prompt.cursor ) ) {
        prompt.cursor ();
      } else {
        Cursor.hide ();
      }

      /* NEXT */

      key = await Stdin.next ();

    }

    Stdin.newline ();
    Cursor.show ();

  });

};

/* EXPORT */

export default prompt;
