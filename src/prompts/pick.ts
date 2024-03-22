
/* IMPORT */

import process from 'node:process';
import color from 'tiny-colors';
import {KEY, SHORTCUT} from '../constants';
import {identity, isPrintable, isString} from '../utils';
import {getStatusSymbol, warning, withCursor} from './_helpers';
import {SYMBOL_FOCUSED, SYMBOL_SELECTED, SYMBOL_UNSELECTED} from './_symbols';
import prompt from './prompt';

/* TYPES */

type PickOptions<T, U> = {
  message: string,
  actions?: Partial<Record<string, ( state: PickState<T> ) => void>>,
  focused?: number,
  limit?: number,
  min?: number,
  max?: number,
  multiple?: boolean,
  searchable?: boolean,
  options: PickOption<T>[] | string[],
  format?: ( value: string, settled: boolean ) => string,
  transform: ( value: T[] ) => U,
  validate?: ( value: T[] ) => string | boolean
};

type PickOption<T> = {
  title: string,
  value: T,
  disabled?: boolean,
  description?: string,
  heading?: boolean,
  hint?: string,
  selected?: boolean
};

type PickState<T> = {
  query: string,
  cursor: number,
  filtered: PickOption<T>[],
  selected: Set<PickOption<T>>,
  visible: PickOption<T>[],
  focused: number
};

/* MAIN */

//TODO: Make sure headings are not selectable
//TODO: Account for pre-colored searchable values

const pick = async <T, U> ( _options: PickOptions<T, U> ): Promise<U | undefined> => {

  /* STATE */

  let {actions = {}, message, min = 0, max = Infinity, multiple = true, searchable = true, format = identity, transform, validate} = _options;
  let limit = Math.max ( 1, Math.min ( process.stdout.getWindowSize ()[1] - 2, _options.limit || 7 ) ); // Ensuring the prompt won't overflow the terminal
  let status: -1 | 0 | 1 = 0;
  let query = '';
  let cursor = 0;
  let validating = false;
  let options: PickOption<T>[] = _options.options.map ( option => isString ( option ) ? { title: option, value: option as T } : option ); //TSC
  let filtered = options;
  let selected: Set<PickOption<T>> = new Set ( filtered.filter ( option => !option.heading && option.selected ) );
  let visible = filtered.slice ( 0, limit );
  let focused = Math.max ( 0, Math.min ( visible.length - 1, _options.focused || 0 ) ); //TODO: Calculate the initial visible range based on this value

  /* COMPONENTS */

  const main = (): string => {
    const _status = getStatusSymbol ( status );
    const _message = color.bold ( message );
    const _cursor = status === 0 ? cursor : -1;
    const _query = ( status >= 0 && searchable ) || ( status === 1 && !searchable ) ? withCursor ( format ( query, !!status ), _cursor ) : '';
    return [_status, _message, _query].join ( ' ' );
  };

  const optionFor = ( option: PickOption<T> ) => {
    return (): string => {
      const isSelected = selected.has ( option );
      const isFocused = ( filtered[focused] === option );
      const _status = option.heading ? ' ' : ( multiple ? ( isSelected ? color.green ( SYMBOL_SELECTED ) : SYMBOL_UNSELECTED ) : ( isFocused ? color.cyan ( SYMBOL_FOCUSED ) : ' ' ) );
      const _matchStart = option.title.toLowerCase ().indexOf ( query.toLowerCase () );
      const _matchEnd = _matchStart + query.length;
      const _match = query && _matchStart >= 0 && !option.heading ? `${option.title.slice ( 0, _matchStart )}${color.inverse ( option.title.slice ( _matchStart, _matchEnd ) )}${option.title.slice ( _matchEnd )}` : option.title;
      const _title = isFocused ? ( option.disabled ? color.dim.strikethrough.underline ( _match ) : color.cyan.underline ( _match ) ) : ( option.disabled ? color.dim.strikethrough ( _match ) : _match );
      const _description = option.description ? color.dim ( option.description ) : false;
      const _hint = option.hint && isFocused ? color.dim ( option.hint ) : false;
      return [_status, _title, _description, _hint].filter ( isString ).join ( ' ' );
    };
  };

  const validation = (): string | undefined => {
    if ( !validating ) return;
    if ( selected.size < min ) return warning ( `Please select at least ${min} option${min !== 1 ? 's' : ''}` );
    if ( selected.size > max ) return warning ( `Please select at most ${max} option${max !== 1 ? 's' : ''}` );
    if ( !validate ) return;
    const results = options.filter ( option => selected.has ( option ) ); // To preserve the original order
    const result = validate ( results.map ( option => option.value ) );
    if ( result === true ) return;
    const message = result || 'Invalid selection';
    return warning ( message );
  };

  /* PROMPT */

  return prompt ( ( resolve, {key, sequence} ) => {
    const action = actions[sequence] || actions[key];
    if ( action ) {
      const state = { query, cursor, filtered, selected, visible, focused };
      action ( state );
      query = state.query;
      cursor = state.cursor;
      filtered = state.filtered;
      selected = state.selected;
      visible = state.visible;
      focused = state.focused;
    } else if ( key === KEY.ESCAPE ) {
      status = -1;
      resolve ();
      return main;
    } else if ( key === KEY.ENTER || ( key === KEY.SPACE && !multiple ) ) {
      const option = filtered[focused];
      selected = multiple || !option || option.disabled || option.heading ? selected : new Set ([ option ]);
      validating = true;
      if ( !validation () ) {
        const results = options.filter ( option => selected.has ( option ) ); // To preserve the original order
        const titles = results.map ( option => option.title );
        const values = results.map ( option => option.value );
        status = 1;
        query = titles.join ( color.dim ( ', ' ) );
        resolve ( transform ( values ) );
        return main;
      }
    } else if ( key === KEY.SPACE && multiple ) {
      const option = filtered[focused];
      if ( option ) {
        if ( !option.disabled && !option.heading ) {
          if ( selected.has ( option ) ) {
            selected.delete ( option );
          } else {
            selected.add ( option );
          }
        }
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
    } else if ( sequence === SHORTCUT.CTRL_A && searchable ) {
      cursor = 0;
    } else if ( sequence === SHORTCUT.CTRL_E && searchable ) {
      cursor = query.length;
    } else if ( key === KEY.BACKSPACE && searchable ) {
      query = `${query.slice ( 0, Math.max ( 0, cursor - 1 ) )}${query.slice ( cursor )}`;
      cursor = Math.max ( 0, cursor - 1 );
      filtered = options.filter ( option => option.heading || option.title.toLowerCase ().includes ( query.toLowerCase () ) );
      visible = filtered.slice ( 0, limit );
      focused = 0;
    } else if ( key === KEY.DELETE && searchable ) {
      query = `${query.slice ( 0, cursor )}${query.slice ( cursor + 1 )}`;
      cursor = Math.min ( query.length, cursor );
      filtered = options.filter ( option => option.heading || option.title.toLowerCase ().includes ( query.toLowerCase () ) );
      visible = filtered.slice ( 0, limit );
      focused = 0;
    } else if ( isPrintable ( sequence ) && searchable ) {
      query = `${query.slice ( 0, cursor )}${sequence}${query.slice ( cursor )}`;
      cursor = Math.min ( query.length, cursor + sequence.length );
      filtered = filtered.filter ( option => option.heading || option.title.toLowerCase ().includes ( query.toLowerCase () ) );
      visible = filtered.slice ( 0, limit );
      focused = 0;
    }
    return [main, ...visible.map ( optionFor ), validation];
  });

};

/* EXPORT */

export default pick;
export type {PickOptions, PickOption, PickState};
