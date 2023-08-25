
/* IMPORT */

import NakedPromise from 'promise-make-naked';
import Cursor from 'tiny-cursor';
import process from 'node:process';
import readline from 'node:readline';
import Stdin from '../stdin';
import {castArray, isString} from '../utils';
import type {Key} from '../types';

/* TYPES */

type Component = {
  (): string | undefined
};

type Prompt<T> = (
  ( resolve: ( value?: T ) => void, key: Key ) => Component[] | Component
);

/* MAIN */

const prompt = <T> ( prompt: Prompt<T> ): Promise<T | undefined> => {

  return NakedPromise.wrap <T | undefined> ( async ({ resolve, isPending }) => {

    /* INIT */

    Cursor.hide ();
    Stdin.init ();
    Stdin.start ();

    /* STATE */

    let keyInit: Key = { key: '', sequence: '', ctrl: false, meta: false, shift: false };
    let keys: Key[]= [keyInit];
    let linesNr = 1;

    /* LISTEN */

    const unlisten = Stdin.listen ( key => keys.push ( key ) );

    /* RENDER LOOP */

    while ( true ) {

      const key = keys.shift ();

      if ( !key ) break;

      /* RESET CURSOR */

      readline.moveCursor ( process.stdout, 0, - linesNr + 1 );
      readline.cursorTo ( process.stdout, 0 );

      /* RE-RENDER */

      const lines = castArray ( prompt ( resolve, key ) ).map ( line => line () ).filter ( isString );

      for ( let i = 0, l = lines.length; i < l; i++ ) {

        const lineNext = lines[i];

        process.stdout.write ( lineNext );

        readline.clearLine ( process.stdout, 1 );

        if ( i < l - 1 ) {

          process.stdout.write ( '\r\n' );

        } else {

          readline.clearScreenDown ( process.stdout );

        }

      }

      linesNr = lines.length;

      /* SETTLED */

      if ( !isPending () ) break;

      /* NEXT ITERATION */

      if ( keys.length ) continue;

      await Stdin.wait ();

    }

    /* UNLISTEN */

    unlisten ();

    /* RESET */

    Stdin.stop ();
    Cursor.show ();

    /* CLENAUP */

    process.stdout.write ( '\r\n' );

  });

};

/* EXPORT */

export default prompt;
