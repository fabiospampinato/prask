
/* IMPORT */

import once from 'function-once';
import {kill, pid, stdin} from 'node:process';
import readline from 'node:readline';
import {SHORTCUT} from './constants';
import type {Key as ReadlineKey, Interface as ReadlineInterface} from 'node:readline';
import type {Key} from './types';

/* MAIN */

const Stdin = {

  /* API */

  init: once ((): ReadlineInterface => { // This exists to reduce the absurdly high escape delay

    const rl = readline.createInterface ({ input: stdin, escapeCodeTimeout: 50 });

    readline.emitKeypressEvents ( stdin, rl );

    return rl;

  }),

  start: (): void => {

    stdin.setRawMode ( true );
    stdin.resume ();
    stdin.setEncoding ( 'utf8' );

  },

  stop: (): void => {

    stdin.pause ();
    stdin.setRawMode ( false );

  },

  listen: ( handler: ( key: Key ) => void ): (() => void) => {

    const onKeypress = ( _: unknown, key: ReadlineKey ) => {

      if ( key.sequence === SHORTCUT.CTRL_C ) {

        Stdin.stop (); // If the process is about to exit we need to clear things up

        kill ( pid, 'SIGINT' ); // Manually emitting the "SIGINT" signal

      } else {

        handler ({
          key: key.name || '',
          sequence: key.sequence || '',
          ctrl: !!key.ctrl,
          meta: !!key.meta,
          shift: !!key.shift
        });

      }

    };

    stdin.on ( 'keypress', onKeypress );

    return (): void => {

      stdin.off ( 'keypress', onKeypress );

    };

  },

  wait: (): Promise<void> => {

    return new Promise ( resolve => {

      stdin.once ( 'keypress', resolve );

    });

  }

};

/* EXPORT */

export default Stdin;
