
/* IMPORT */

import pick, {type Option} from './pick';

/* TYPES */

type Options<T> = {
  message: string,
  limit?: number,
  min?: number,
  max?: number,
  options: Option<T>[] | string[],
  searchable?: boolean,
  validate?: ( value: T[] ) => string | boolean
};

/* MAIN */

const multiselect = <T = string> ( options: Options<T> ): Promise<T[] | undefined> => {

  return pick ({
    ...options,
    multiple: true
  });

};

/* EXPORT */

export default multiselect;
