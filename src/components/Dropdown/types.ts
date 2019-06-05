import { MouseEvent, ReactNode, SyntheticEvent } from 'react';

export type Handler = (option: Option | Option[] | null, event: SyntheticEvent) => void;

export interface Option {
  key: string;
  value: string | number;
  name: string;
}

export interface StateOption extends Option {
  visible: boolean;
}

export interface DropdownProps {
  options: Option[];
  onChange: Handler;
  clearable?: boolean;
  default?: Option | Option[];
  disabled?: boolean;
  id?: string;
  label?: string;
  multiple?: boolean;
  open?: boolean;
  placeholder?: string;
  trigger?: ReactNode;
}

export interface DropdownOptionProps {
  value: string | number;
  key: string;
  className?: string;
}

export interface IconProps {
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

export interface DropdownHeaderProps {
  multiple?: boolean;
  optionSelected?: boolean;
}

export interface DropdownMenuProps {
  open?: boolean;
}

export interface DropdownWrapperProps {
  disabled?: boolean;
  trigger?: ReactNode;
}
