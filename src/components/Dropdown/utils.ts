import uniqueId from 'lodash.uniqueid';
import { Option, StateOption } from './types';

/**
 * Convert Options to State Options
 *
 * Converts an Option[] to a StateOption[]
 *
 * @param options: Option[] - array of Options
 * @param visible: boolean - whether or not the option should appear in the dropdown list
 * @returns StateOption[] - an array of StateOption objects
 */
export const convertOptionsToStateOptions = (
  options: Option[],
  visible: boolean = true
): StateOption[] =>
  options.map(option => {
    // if no key is passed, assign it one
    const optionKey = option.key ? option.key : uniqueId();
    return { ...option, key: optionKey, visible };
  });

/**
 * Convert To Props Option
 *
 * Converts a StateOption to an Option type
 *
 * @param options: StateOption[] - an array of StateOptions to convert
 * @returns Option[] - an array of Option objects
 */
export const convertToPropsOption = (options: StateOption[]): Option[] =>
  options.map((option: StateOption) => ({
    key: option.key,
    value: option.value,
    name: option.name,
  }));
