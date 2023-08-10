
/* IMPORT */

import color from 'tiny-colors';
import cursor from 'tiny-cursor';
import process from 'node:process';
import readline from 'node:readline';
import {castArray, isString} from '../utils';

/* TYPES */

type Line = {
  (): string | undefined
};

type Prompt<T> = {
  render ( resolve: ( value?: T ) => void, key: string ): Line[] | Line
};

/* HELPERS */

//FIXME: flickering
//FIXME: cursor position on validation error

const renderStatus = ( status: number ): string => {
  if ( status < 0 ) return color.red ( '✖' );
  if ( status > 0 ) return color.green ( '✔' );
  return color.cyan ( color.bold ( '?' ) );
};

/* MAIN */

const onData = (): Promise<string> => {

  return new Promise ( resolve => {

    process.stdin.setRawMode ( true );
    process.stdin.resume ();
    process.stdin.setEncoding ( 'utf8' );

    process.stdin.on ( 'data', ( key: string ) => {

      if ( key === '\x03' ) process.exit ( 1 );

      resolve ( key );

    });

    process.on ( 'SIGINT', () => {

      process.exit ( 1 );

    });

  });

};

const onClose = (): void => {

  process.stdout.write ( '\r\n' ); // Removes the trailing `%`
  process.stdin.setRawMode ( false );
  process.stdin.pause ();

  cursor.show ();

};

/* MAIN */

const prompt = <T> ( prompt: Prompt<T> ): Promise<T | undefined> => {

  return new Promise<T> ( async ( res, rej ) => {

    /* HELPERS */

    let settled = false;

    const resolve = ( value?: T ) => {
      settled = true;
      res ( value );
    };

    const reject = ( error: Error ) => {
      settled = true;
      rej ( error );
    };

    /* STATE */

    let linesPrev: number = 0;
    let key = '';

    while ( true ) {

      const linesNext = castArray ( prompt.render ( resolve, key ) ).map ( line => line () ).filter ( isString );

      /* CLEAR */

      for ( let i = 0; i < linesPrev; i++ ) {
        if ( i ) readline.moveCursor ( process.stdout, 0, -1 );
        readline.cursorTo ( process.stdout, 0 );
        readline.clearLine ( process.stdout, 1 );
      }

      // for ( let i = 0, l = linesPrev.length; i < l; i++ ) {
      //   readline.cursorTo ( process.stdout, 0 );
      //   readline.clearLine ( process.stdout, 0 );
      // }

      // readline.clearScreenDown ( process.stdout );

      /* PRINT */

      linesPrev = 0;
      for ( let i = 0, l = linesNext.length; i < l; i++ ) {
        const line = linesNext[i];
        linesPrev += 1;
        process.stdout.write ( line );
        if ( i < l - 1 ) process.stdout.write ( '\n' );
      }

      /* CURSOR */

      /* WAIT */

      if ( settled ) break;
      key = await onData ();
      if ( settled ) break;

    }

    onClose ();

  });

};

/* EXPORT */

export default prompt;
export {renderStatus};
