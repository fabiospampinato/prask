
/* IMPORT */

import pick, {type Option} from './pick';

/* TYPES */

type Options<T> = {
  message: string,
  limit?: number,
  options: Option<T>[] | string[],
  searchable?: boolean,
  validate?: ( value: T ) => string | boolean
};

/* MAIN */

const select = <T = string> ( options: Options<T> ): Promise<T | undefined> => {

  return pick ({
    ...options,
    multiple: false,
    transform: values => values[0],
    validate: values => values.length !== 1 ? false : ( options.validate?.( values[0] ) ?? true )
  });

};

/* EXPORT */

export default select;
