
/* IMPORT */

import color from 'tiny-colors';
import {KEY} from '../constants';
import {statusSymbol} from './_helpers';
import {SYMBOL_SELECTED, SYMBOL_UNSELECTED} from './_symbols';
import prompt from './prompt';

/* TYPES */

type Rating = 1 | 2 | 3 | 4 | 5;

type Options = {
  message: string,
  initial?: Rating
};

/* MAIN */

const rating = ( options: Options ): Promise<Rating | undefined> => {

  /* CONSTANTS */

  const STAR_ACTIVE = color.green ( SYMBOL_SELECTED );
  const STAR_INACTIVE = SYMBOL_UNSELECTED;
  const STARS_DIVIDER = '─────';
  const LABELS_DIVIDER = '     ';
  const PADDING = '  ';

  /* STATE */

  let {message, initial = 2} = options;
  let status: -1 | 0 | 1 = 0;
  let current = initial;

  /* COMPONENTS */

  const question = (): string => {
    const question = `${statusSymbol ( status )} ${color.bold ( message )}`;
    const result = status === 1 ? color.cyan ( String ( current ) ) : '';
    return [question, result].join ( ' ' );
  };

  const stars = (): string => {
    const star1 = ( current === 1 ) ? STAR_ACTIVE : STAR_INACTIVE;
    const star2 = ( current === 2 ) ? STAR_ACTIVE : STAR_INACTIVE;
    const star3 = ( current === 3 ) ? STAR_ACTIVE : STAR_INACTIVE;
    const star4 = ( current === 4 ) ? STAR_ACTIVE : STAR_INACTIVE;
    const star5 = ( current === 5 ) ? STAR_ACTIVE : STAR_INACTIVE;
    const stars = [star1, star2, star3, star4, star5].join ( STARS_DIVIDER );
    return [PADDING, stars].join ( '' );
  };

  const labels = (): string => {
    const numbers = [1, 2, 3, 4, 5].join ( LABELS_DIVIDER );
    return [PADDING, numbers].join ( '' );
  };

  /* PROMPT */

  return prompt ( ( resolve, {key} ) => {
    if ( key === KEY.ESCAPE ) {
      status = -1;
      resolve ();
      return question;
    } else if ( key === KEY.ENTER ) {
      status = 1;
      resolve ( current );
      return question;
    } else if ( key === KEY.LEFT || key === KEY.DOWN ) {
      current = Math.max ( 1, current - 1 ) as Rating; //TSC
    } else if ( key === KEY.RIGHT || key === KEY.UP ) {
      current = Math.min ( 5, current + 1 ) as Rating; //TSC
    }
    return [question, stars, labels];
  });

};

/* EXPORT */

export default rating;
