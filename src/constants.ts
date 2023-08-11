
/* MAIN */

//TODO: List more special keys here, maybe some key combinations also
//TODO: Figure out how to make it perfect, and publish it as a standalone package

const KEY = {
  /* ARROW KEYS */
  UP: '\x1B[A',
  DOWN: '\x1B[B',
  RIGHT: '\x1B[C',
  LEFT: '\x1B[D',
  /* SPECIAL KEYS */
  BACKSPACE: '\x7F',
  DELETE: '\x1B[3~',
  END: '\x1B[F',
  ENTER: '\r',
  ESCAPE: '\x1B',
  HOME: '\x1B[H',
  TAB: '\t',
  SPACE: ' ',
  /* SHORTCUTS */
  CTRL_A: '\x01',
  CTRL_C: '\x03',
  CTRL_E: '\x05'
};

/* EXPORT */

export {KEY};
