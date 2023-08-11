
/* IMPORT */

import {KEY} from './constants';

/* MAIN */

const castArray = <T> ( value: T | T[] ): T[] => {

  return Array.isArray ( value ) ? value : [value];

};

const identity = <T> ( value: T ): T => {

  return value;

};

const isArray = ( value: unknown ): value is unknown[] => {

  return Array.isArray ( value );

};

const isPrintable = ( key: string ): boolean => {

  return !!key && !key.startsWith ( KEY.ESCAPE );

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

/* EXPORT */

export {castArray, identity, isArray, isPrintable, isString};
