
/* IMPORT */

import {identity} from '../utils';
import pick from './pick';
import type {PickOption} from './pick';

/* TYPES */

type MultiselectOptions<T> = {
  message: string,
  limit?: number,
  min?: number,
  max?: number,
  options: MultiselectOption<T>[] | string[],
  searchable?: boolean,
  validate?: ( value: T[] ) => string | boolean
};

type MultiselectOption<T> = PickOption<T>;

/* MAIN */

const multiselect = <T = string> ( options: MultiselectOptions<T> ): Promise<T[] | undefined> => {

  return pick ({
    ...options,
    multiple: true,
    transform: identity
  });

};

/* EXPORT */

export default multiselect;
export type {MultiselectOptions, MultiselectOption};
