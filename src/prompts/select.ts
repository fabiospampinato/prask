
/* IMPORT */

import pick from './pick';
import type {PickOption} from './pick';

/* TYPES */

type SelectOptions<T> = {
  message: string,
  limit?: number,
  options: (( query?: string ) => SelectOption<T>[] | string[]) | SelectOption<T>[] | string[],
  searchable?: boolean,
  validate?: ( value: T ) => string | boolean
};

type SelectOption<T> = PickOption<T>;

/* MAIN */

const select = <T = string> ( options: SelectOptions<T> ): Promise<T | undefined> => {

  return pick ({
    ...options,
    multiple: false,
    transform: values => values[0],
    validate: values => values.length !== 1 ? false : ( options.validate?.( values[0] ) ?? true )
  });

};

/* EXPORT */

export default select;
export type {SelectOptions, SelectOption};
