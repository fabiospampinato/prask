
/* MAIN */

const castArray = <T> ( value: T | T[] ): T[] => {

  return Array.isArray ( value ) ? value : [value];

};

const identity = <T> ( value: T ): T => {

  return value;

};

const isFunction = ( value: unknown ): value is Function => {

  return typeof value === 'function';

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

const sum = ( values: number[] ): number => {

  return values.reduce ( ( sum, value ) => sum + value, 0 );

};

/* EXPORT */

export {castArray, identity, isFunction, isPrintable, isString, last, sum};
