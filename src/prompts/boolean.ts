
/* IMPORT */

import color from 'tiny-colors';
import pick from './pick';

/* TYPES */

type Options = {
  message: string,
  initial?: boolean
};

/* MAIN */

const boolean = ( options: Options ): Promise<boolean | undefined> => {

  return pick ({
    ...options,
    multiple: false,
    searchable: false,
    focused: ( options.initial ?? true ) ? 1 : 0,
    options: [{ title: 'No', value: false }, { title: 'Yes', value: true }],
    format: value => color.cyan ( value )
  });

};

/* EXPORT */

export default boolean;