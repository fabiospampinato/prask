
/* MAIN */

//TODO: List more special keys here, maybe some key combinations also
//TODO: Figure out how to make it perfect, and publish it as a standalone package

const KEY = {
  /* FUNCTION KEYS */
  /* NUMPAD DIGITS */
  /* NUMPAD OPERATORS */
  /* ARROW KEYS */
  UP: '\x1B[A',
  RIGHT: '\x1B[C',
  DOWN: '\x1B[B',
  LEFT: '\x1B[D',
  /* SPECIAL KEYS */
  BACKSPACE: '\x7F',
  // CAPSLOCK: '',
  DELETE: '\x1B[3~',
  END: '\x1B[F',
  ENTER: '\r',
  ESCAPE: '\x1B',
  HOME: '\x1B[H',
  // INSERT: '',
  // PAGEDOWN: '',
  // PAGEUP: '',
  TAB: '\t',
  SPACE: ' ',
  /* SHORTCUTS */
  CTRL_A: '\x01',
  CTRL_E: '\x05'
};

/* EXPORT */

export {KEY};
