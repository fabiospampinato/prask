
/* IMPORT */

import color from 'tiny-colors';
import pick from './pick';

/* TYPES */

type BooleanOptions = {
  message: string,
  initial?: boolean
};

/* MAIN */

const boolean = ( options: BooleanOptions ): Promise<boolean | undefined> => {

  return pick ({
    ...options,
    multiple: false,
    searchable: false,
    focused: ( options.initial ?? true ) ? 1 : 0,
    options: [{ title: 'No', value: false }, { title: 'Yes', value: true }],
    format: value => color.cyan ( value ),
    transform: value => !!value[0]
  });

};

/* EXPORT */

export default boolean;
export type {BooleanOptions};
