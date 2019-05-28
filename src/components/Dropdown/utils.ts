import { Option, StateOption } from './types';

export const setupOptions = (options: Option[], visible: boolean = true): StateOption[] =>
  options.map(option => ({ ...option, visible }));

export const convertToOption = (options: StateOption[]): Option[] =>
  options.map((option: StateOption) => ({
    key: option.key,
    value: option.value,
    name: option.name,
  }));
