
/* IMPORT */

import color from 'tiny-colors';
import {KEY} from '../constants';
import {identity, isPrintable} from '../utils';
import {statusSymbol, withCursor} from './_helpers';
import prompt from './prompt';

/* HELPERS */

type Options<T, U> = {
  message: string,
  focused?: number,
  limit?: number,
  min?: number,
  max?: number,
  multiple?: boolean,
  searchable?: boolean,
  options: Option<T>[],
  format?: ( value: string, status: -1 | 0 | 1 ) => string,
  transform?: ( value: T[] ) => U,
  validate?: ( value: T[] ) => string | boolean
};

type Option<T> = {
  title: string,
  value: T
};

/* MAIN */

//TODO: Support values that are disabled
//TODO: Support values with a description
//TODO: Support values that are headings
//TODO: Account for pre-colored searchable values
//TODO: Account for the terminal's height when setting the limit

const pick = async <T, U> ( _options: Options<T, U> ): Promise<U | undefined> => {

  /* STATE */

  let {message, limit = 7, min = 0, max = Infinity, multiple = true, searchable = true, options, focused: _focused, format = identity, transform = identity, validate} = _options;
  let status: -1 | 0 | 1 = 0;
  let query = '';
  let cursor = 0;
  let validating = false;
  let filtered: Option<T>[] = options;
  let selected: Set<Option<T>> = new Set ();
  let visible = filtered.slice ( 0, limit );
  let focused = Math.max ( 0, Math.min ( visible.length - 1, _focused || 0 ) ); //TODO: Calculate the initial visible range based on this value

  /* COMPONENTS */

  const main = (): string => {
    const _status = statusSymbol ( status );
    const _message = color.bold ( message );
    const _cursor = status === 0 ? cursor : -1;
    const _query = status >= 0 && searchable ? withCursor ( format ( query, status ), _cursor ) : '';
    return [_status, _message, _query].join ( ' ' );
  };

  const optionFor = ( option: Option<T> ) => {
    return (): string => {
      const isSelected = selected.has ( option );
      const isFocused = ( filtered[focused] === option );
      const _status = multiple ? ( isSelected ? color.green ( '●' ) : '○' ) : ( isFocused ? color.cyan ( '❯' ) : ' ' );
      const _matchStart = option.title.toLowerCase ().indexOf ( query.toLowerCase () );
      const _matchEnd = _matchStart + query.length;
      const _match = query && _matchStart >= 0 ? `${option.title.slice ( 0, _matchStart )}${color.inverse ( option.title.slice ( _matchStart, _matchEnd ) )}${option.title.slice ( _matchEnd )}` : option.title;
      const _title = isFocused ? color.underline ( color.cyan ( _match ) ) : _match;
      return [_status, _title].join ( ' ' );
    };
  };

  const validation = (): string | undefined => {
    if ( !validating ) return;
    if ( selected.size < min ) return color.yellow ( `⚠ Select at least ${min} option${min !== 1 ? 's' : ''}` );
    if ( selected.size > max ) return color.yellow ( `⚠ Select at most ${max} option${max !== 1 ? 's' : ''}` );
    if ( !validate ) return;
    const results = options.filter ( option => selected.has ( option ) ); // To preserve the original order
    const result = validate ( results.map ( option => option.value ) );
    if ( result === true ) return;
    const message = result || 'Invalid selection';
    return color.yellow ( `⚠ ${message}` );
  };

  /* PROMPT */

  return prompt ( ( resolve, key ) => {
    if ( key === KEY.ESCAPE ) {
      status = -1;
      resolve ();
      return main;
    } else if ( key === KEY.ENTER ) {
      selected = multiple ? selected : new Set ([ filtered[focused] ]);
      validating = true;
      if ( !validation () ) {
        const results = options.filter ( option => selected.has ( option ) ); // To preserve the original order
        const titles = results.map ( choice => choice.title );
        const values = results.map ( choice => choice.value );
        status = 1;
        query = titles.join ( ', ' );
        resolve ( transform ( values as any ) ); //TSC: Try to type this right
        return main;
      }
    } else if ( key === KEY.SPACE && multiple ) {
      const choice = filtered[focused];
      if ( selected.has ( choice ) ) {
        selected.delete ( choice );
      } else {
        selected.add ( choice );
      }
    } else if ( key === KEY.UP ) {
      focused = ( focused - 1 + filtered.length ) % filtered.length;
      const visibleStart = filtered.indexOf ( visible[0] );
      if ( focused === filtered.length - 1 ) {
        visible = filtered.slice ( - limit );
      } else if ( focused < visibleStart ) {
        const visibleStartNext = Math.max ( 0, visibleStart - limit );
        const visibleEndNext = Math.min ( filtered.length, visibleStartNext + limit );
        visible = filtered.slice ( visibleStartNext, visibleEndNext );
      }
    } else if ( key === KEY.DOWN ) {
      focused = ( focused + 1 ) % filtered.length;
      const visibleEnd = filtered.indexOf ( visible[visible.length - 1] );
      if ( focused === 0 ) {
        visible = filtered.slice ( 0, limit );
      } else if ( focused > visibleEnd ) {
        const visibleEndNext = Math.min ( filtered.length, visibleEnd + limit + 1 );
        const visibleStartNext = Math.max ( 0, visibleEndNext - limit );
        visible = filtered.slice ( visibleStartNext, visibleEndNext );
      }
    } else if ( key === KEY.LEFT && searchable ) {
      cursor = Math.max ( 0, cursor - 1 );
    } else if ( key === KEY.RIGHT && searchable ) {
      cursor = Math.min ( query.length, cursor + 1 );
    } else if ( key === KEY.CTRL_A && searchable ) {
      cursor = 0;
    } else if ( key === KEY.CTRL_E && searchable ) {
      cursor = query.length;
    } else if ( key === KEY.BACKSPACE && searchable ) {
      query = `${query.slice ( 0, Math.max ( 0, cursor - 1 ) )}${query.slice ( cursor )}`;
      cursor = Math.max ( 0, cursor - 1 );
      filtered = options.filter ( option => option.title.toLowerCase ().includes ( query.toLowerCase () ) );
      visible = filtered.slice ( 0, limit );
      focused = 0;
    } else if ( key === KEY.DELETE && searchable ) {
      query = `${query.slice ( 0, cursor )}${query.slice ( cursor + 1 )}`;
      cursor = Math.min ( query.length, cursor );
      filtered = options.filter ( option => option.title.toLowerCase ().includes ( query.toLowerCase () ) );
      visible = filtered.slice ( 0, limit );
      focused = 0;
    } else if ( isPrintable ( key ) && searchable ) {
      query = `${query.slice ( 0, cursor )}${key}${query.slice ( cursor )}`;
      cursor = Math.min ( query.length, cursor + 1 );
      filtered = filtered.filter ( option => option.title.toLowerCase ().includes ( query.toLowerCase () ) );
      visible = filtered.slice ( 0, limit );
      focused = 0;
    }
    return [main, ...visible.map ( optionFor ), validation];
  });

};

/* EXPORT */

export default pick;
export type {Option};
