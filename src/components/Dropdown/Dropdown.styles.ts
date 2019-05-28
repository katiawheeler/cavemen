import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DropdownOptionProps, DropdownWrapperProps, IconProps } from './types';

const DropdownMultiOption = styled('div')<DropdownOptionProps>`
  z-index: 999;
  line-height: 1;
  background-color: #e8e8e8;
  background-image: none;
  color: rgba(0, 0, 0, 0.6);
  text-transform: none;
  font-weight: 700;
  border: 0 solid transparent;
  border-radius: 0.28571429rem;
  transition: background 0.1s ease;
  user-select: none;
  display: inline-block;
  vertical-align: top;
  white-space: normal;
  font-size: 1em;
  padding: 0.38461538em 0.76923077em;
  margin: 0.15384615rem 0.30769231rem 0.15384615rem 0;
  box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;

  &:hover {
    background-color: #e0e0e0;
    border-color: #e0e0e0;
    background-image: none;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const DropdownWrapper = styled('div')<DropdownWrapperProps>`
  ${props => props.disabled && `opacity: 0.5; pointer-events: none; `}

  cursor: pointer;
  word-wrap: break-word;
  line-height: 1em;
  white-space: normal;
  outline: 0;
  transform: rotateZ(0);
  background: #fff;
  display: inline-block;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: none;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0;
  position: relative;
  text-align: left;
  transition: box-shadow 0.1s ease, width 0.1s ease, -webkit-box-shadow 0.1s ease;
  min-height: 44px;

  &.active {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important!;
    z-index: 10;

    &:hover {
      border-color: #96c8da;
      box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    }
  }
`;

const DropdownOption = styled('div')<DropdownOptionProps>`
  white-space: normal;
  word-wrap: normal;
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  border-top: none;
  line-height: 1em;
  color: rgba(0, 0, 0, 0.87);
  padding: 0.76923077rem 1.15384615rem !important;
  font-size: 1rem;
  text-transform: none;
  font-weight: 400;
  box-shadow: none;

  &.selected {
    background: rgba(0, 0, 0, 0.03);
    color: rgba(0, 0, 0, 0.95);
    font-weight: 700;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.95);
    z-index: 13;
  }
`;

const DropdownMenu = styled('div')`
  overflow-x: hidden;
  overflow-y: auto;
  backface-visibility: hidden;
  border-top-width: 0 !important;
  width: auto;
  outline: 0;
  margin: 0 -1px;
  min-width: 100%;
  width: 100%;
  border-radius: 0;
  transition: opacity 0.1s ease;
  left: 0;
  cursor: auto;
  position: absolute;
  display: none;
  outline: 0;
  top: 100%;
  padding: 0 0;
  background: #fff;
  font-size: 1em;
  text-shadow: none;
  text-align: left;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-top: 0px;
  border-radius: 0;
  transition: opacity 0.1s ease;
  z-index: 11;
  will-change: transform, opacity;
  display: block !important;
`;

const DropdownHeader = styled('div')`
  min-width: 14em;
  min-height: 0.8em;
  padding: 0.84615385em 2.17692308em 0.84615385em 1.07692308em;
`;

const DropdownLabel = styled('label')`
  display: block;
  color: rgb(99, 110, 121);
  line-height: 11px;
  margin: 0px 0px 4px;
`;

const DropdownIcon = styled(FontAwesomeIcon)<IconProps>`
  display: inline-block;
  font-family: Icons;
  font-style: normal;
  font-weight: 400;
  text-decoration: inherit;
  text-align: center;
  speak: none;
  font-smoothing: antialiased;
  backface-visibility: hidden;
  cursor: pointer;
  position: absolute;
  height: auto;
  line-height: 1.21428571em;
  top: 0.84615385em;
  right: 1.07692308em;
  z-index: 1;
  margin: -0.84615385em;
  padding: 0.91666667em;
  opacity: 0.8;
  transition: opacity 0.1s ease;
  font-size: 0.92307692em;
`;

const DeleteIcon = styled(FontAwesomeIcon)<IconProps>`
  display: inline-block;
  height: 1em;
  font-family: Icons;
  font-style: normal;
  font-weight: 400;
  text-decoration: inherit;
  text-align: center;
  speak: none;
  font-smoothing: antialiased;
  backface-visibility: hidden;
  margin: 0 0.75em 0 0;
  cursor: pointer;
  margin-right: 0;
  margin-left: 0.5em;
  font-size: 0.92857143em;
  opacity: 0.5;
  transition: background 0.1s ease;
`;

const ClearIcon = styled(FontAwesomeIcon)<IconProps>`
  height: 1em;
  color: rgb(165, 173, 182);
  font-family: Icons;
  font-style: normal;
  font-weight: 400;
  font-size: 0.92857143em;
  position: absolute;
  right: 30px;
  bottom: 2px;
  padding: 0.91666667em;
`;

export {
  ClearIcon,
  DropdownWrapper,
  DropdownOption,
  DropdownMenu,
  DropdownHeader,
  DropdownLabel,
  DropdownIcon,
  DropdownMultiOption,
  DeleteIcon,
};
