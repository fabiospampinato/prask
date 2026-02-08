
/* IMPORT */

import stringWidth from 'fast-string-width';
import makeNakedPromise from 'promise-make-naked';
import Cursor from 'tiny-cursor';
import process from 'node:process';
import readline from 'node:readline';
import Stdin from '../stdin';
import {castArray, isString, last, sum} from '../utils';
import type {Key} from '../types';

/* TYPES */

type PromptComponent = {
  (): string | undefined
};

type PromptPrompt<T> = (
  ( resolve: ( value?: T ) => void, key: Key ) => PromptComponent[] | PromptComponent
);

/* MAIN */

const prompt = async <T> ( prompt: PromptPrompt<T> ): Promise<T | undefined> => {

  const {promise, resolve, isPending} = makeNakedPromise<T | undefined>();

  /* INIT */

  Cursor.hide ();
  Stdin.init ();
  Stdin.start ();

  /* STATE */

  let keyInit: Key = { key: '', sequence: '' };
  let keys: Key[]= [keyInit];
  let linesNr = 1;

  /* LISTEN */

  const unlisten = Stdin.listen ( key => keys.push ( key ) );

  /* RENDER LOOP */

  while ( true ) {

    if ( !keys.length ) break;

    /* RESET CURSOR */

    readline.moveCursor ( process.stdout, 0, - linesNr + 1 );
    readline.cursorTo ( process.stdout, 0 );

    /* RE-RENDER */

    const lines = castArray ( last ( keys.map ( key => prompt ( resolve, key ) ) ) ).map ( line => line () ).filter ( isString );

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

    keys.length = 0;

    const lineWidth = process.stdout.getWindowSize ()[0];

    linesNr = sum ( lines.map ( line => Math.max ( 1, Math.ceil ( stringWidth ( line ) / lineWidth ) ) ) );

    /* SETTLED */

    if ( !isPending () ) break;

    /* NEXT ITERATION */

    await Stdin.wait ();

  }

  /* UNLISTEN */

  unlisten ();

  /* RESET */

  Stdin.stop ();
  Cursor.show ();

  /* CLEANUP */

  process.stdout.write ( '\r\n' );

  /* RETURN */

  return promise;

};

/* EXPORT */

export default prompt;
export type {PromptComponent, PromptPrompt};
