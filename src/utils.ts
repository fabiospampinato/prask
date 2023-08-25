
/* MAIN */

const castArray = <T> ( value: T | T[] ): T[] => {

  return Array.isArray ( value ) ? value : [value];

};

const identity = <T> ( value: T ): T => {

  return value;

};

const isPrintable = ( value: string ): boolean => {

  return !!value && !value.startsWith ( '\x1B' );

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

/* EXPORT */

export {castArray, identity, isPrintable, isString};
