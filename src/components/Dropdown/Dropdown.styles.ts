import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  DropdownHeaderProps,
  DropdownMenuProps,
  DropdownOptionProps,
  DropdownWrapperProps,
  IconProps,
} from './types';

const DropdownLabel = styled('label')`
  display: block;
  color: hsl(210, 10%, 43%);
  line-height: 11px;
  font-size: 11px;
  margin: 0px 0px 4px;
`;

const DropdownText = styled('span')`
  flex-grow: 2;
`;

const DropdownWrapper = styled('div')<DropdownWrapperProps>`
  ${props => props.disabled && `opacity: 0.5; pointer-events: none;`}
  cursor: pointer;
  background: #fff;
  width: auto;
  height: auto;
  position: relative;
  min-width: ${props => (props.trigger ? 'auto' : '100%')};
  display: inline-block;
`;

const DropdownHeader = styled('div')<DropdownHeaderProps>`
  padding: ${props =>
    props.multiple && props.optionSelected ? `.5rem 1.5rem .5rem .5rem` : `0 .5rem`};
  line-height: 1em;
  border: 1px solid rgba(34, 36, 38, 0.15);
  white-space: normal;
  min-height: 40px;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DropdownMenu = styled('div')<DropdownMenuProps>`
  margin: 0 -1px;
  width: 100%;
  min-width: 200px;
  position: absolute;
  top: 100%;
  background: #fff;
  font-size: 1em;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-top: 0px;
  z-index: 999;
  display: block !important;
`;

const DropdownOption = styled('div')<DropdownOptionProps>`
  line-height: 1em;
  padding: 1em;
  text-align: left;
  font-size: 1rem;

  &.selected {
    background: rgba(0, 0, 0, 0.03);
    color: rgba(0, 0, 0, 0.95);
    font-weight: 700;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.95);
  }
`;

const DropdownMultiOption = styled('div')<DropdownOptionProps>`
  background-color: #e8e8e8;
  font-weight: 700;
  border-radius: 0.28571429rem;
  display: inline-block;
  font-size: 1em;
  padding: 0.5em;
  margin-right: 0.5em;

  &:hover {
    background-color: #e0e0e0;
    border-color: #e0e0e0;
  }
`;

const DeleteIcon = styled(FontAwesomeIcon)<IconProps>`
  cursor: pointer;
  margin-left: 0.5em;
  font-size: 1em;
  opacity: 0.5;
`;

const ClearIcon = styled(FontAwesomeIcon)<IconProps>`
  color: rgb(165, 173, 182);
  font-size: 1em;
  margin-right: 0.5em;
`;

const DropdownIcon = styled(FontAwesomeIcon)<IconProps>``;

const FilterTextInput = styled('input')`
  width: 100%;
  min-height: 40px;
  border: none;
  line-height: 1em;
  font-size: 1em;

  &:focus {
    outline: none;
  }
`;

export {
  ClearIcon,
  DropdownWrapper,
  DropdownOption,
  DropdownMenu,
  DropdownHeader,
  DropdownIcon,
  DropdownLabel,
  DropdownMultiOption,
  DropdownText,
  DeleteIcon,
  FilterTextInput,
};
