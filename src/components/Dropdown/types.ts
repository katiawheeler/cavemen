import { SyntheticEvent, MouseEvent } from 'react';

export type Handler = (option: Option | Option[] | null, event: SyntheticEvent) => void;

export interface Option {
  key: string;
  value: string | number;
  name: string;
}

export interface StateOption extends Option {
  visible: boolean;
}

export type DropdownProps = {
    options: Option[];
    onChange: Handler;
    default?: Option | Option[];
    disabled?: boolean;
    id?: string;
    label?: string;
    multiple?: boolean;
    open?: boolean;
    placeholder?: string;
}

export type DropdownOptionProps = {
  value:  string | number;
  key: string;
  className?: string;
}

export type IconProps = {
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

export type DropdownHeaderProps = {
  selected: StateOption[] | null;
  multiple?: boolean;
  handleRemoveFromSelected: (option: StateOption) => void;
  handleHeaderClick: () => void;
}

export type DropdownWrapperProps = {
  disabled?: boolean;
}