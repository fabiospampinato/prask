
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

const last = <T> ( values: T[] ): T => {

  return values[values.length - 1];

};

/* EXPORT */

export {castArray, identity, isPrintable, isString, last};
