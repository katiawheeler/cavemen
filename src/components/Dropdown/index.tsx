/** @jsx jsx */
import { jsx } from '@emotion/core';
import { faAngleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import intersection from 'lodash.intersection';
import unionBy from 'lodash.unionby';
import React, { FunctionComponent, MouseEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { csx } from '../../utils/styles';

import {
  ClearIcon,
  DeleteIcon,
  DropdownHeader,
  DropdownIcon,
  DropdownLabel,
  DropdownMenu,
  DropdownMultiOption,
  DropdownOption,
  DropdownText,
  DropdownWrapper,
  FilterTextInput
} from './Dropdown.styles';
import { DropdownProps, Option, StateOption } from './types';
import { convertOptionsToStateOptions, convertToPropsOption } from './utils';

const Dropdown: FunctionComponent<DropdownProps> = (props: DropdownProps) => {
  const [currentlySelected, setCurrentlySelected] = useState<StateOption[] | null>(null);
  const [options, setOptions] = useState<StateOption[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [clearable, setClearable] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Setup
   */
  useEffect(() => {
    // event listener for click outside
    document.addEventListener('mousedown', handleOutsideClick);

    // throw error if multiple and trigger are set
    if(props.trigger && props.multiple) { throw new Error("A trigger cannot be used with a multi-select dropdown")}
    
    if (props.open) { setOpen(props.open); }
    
    if (props.default) {
      props.multiple ? handleDefaultOptionsForMultipleDropdown(props.default as Option[]) : handleDefaultOptionForSingleDropdown(props.default as Option);
    } else {
      setOptions(convertOptionsToStateOptions(props.options));
    }

    // removal of event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if(open) { inputRef.current && inputRef.current.select(); } // tslint:disable-line
  }, [open])

  /**
   * Handle Default Options for Multiple Dropdown
   * 
   * Sets up the options passed in that should be selected by default.
   * Removes those options from the dropdown list.
   * 
   * @param defaultOptions: Option[] - Multiple default options passed in through props
   */
  const handleDefaultOptionsForMultipleDropdown = (defaultOptions: Option[]) => {
    // setup selected options and set visibility to false on the already selected options
    const selectedOptions = convertOptionsToStateOptions(intersection(defaultOptions, props.options), false);
    setCurrentlySelected(selectedOptions);

    // format and merge options and the selected so that those items don't appear in the dropdown
    setOptions(unionBy(selectedOptions, convertOptionsToStateOptions(props.options), 'value'));
  }

  /**
   * Handle Default Option For Single Dropdown
   * 
   * Modifies the passed in option to be in the shape that we want
   * Adds it to the currently selected
   * 
   * @param defaultOption: Option - Singular default option passed in through props
   */
  const handleDefaultOptionForSingleDropdown = (defaultOption: Option) => {
    const formattedOptions = convertOptionsToStateOptions(props.options);
    setOptions(formattedOptions);

    // find "default" option
    const foundOption = formattedOptions.find(option => option.value === defaultOption.value);

    if (foundOption) { setCurrentlySelected([foundOption]); }
  }
 
  /**
   * Handle Outside Click
   * 
   * Checks if the click occurred within the current wrapper.
   * If the click happened outside of the wrapper, the dropdown will close.
   * 
   * @param event: Event - the event that triggered this function
   */
  const handleOutsideClick = (event: Event) => {
    if (wrapperRef.current && event.target) {
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
  };

  /**
   * Handle Option Click
   * 
   * Handler for when the user clicks on an option from the dropdown
   * 
   * @param option: StateOption - the option that was clicked on
   * @param event: MouseEvent<HTMLElement> - the event that triggered the function
   */
  const handleOptionClick = (option: StateOption, event: MouseEvent<HTMLElement>) => {
    // if it's already selected, do nothing
    if(currentlySelected && currentlySelected.includes(option)) { return; }

    // find original, unmodified option that was selected
    const originalOption = props.options.find(opt => opt.value === option.value);

    // if we can't find the original option to pass back, do nothing
    if(!originalOption) { return; }

    if (props.multiple) {
      // if there is something already selected, append it
      const newSelected = currentlySelected ? [...currentlySelected, option] : [option];
      setCurrentlySelected(newSelected);

      props.onChange(convertToPropsOption(newSelected), event)
    } else {
      setCurrentlySelected([option]);
      if(!clearable) { setClearable(true); }
      props.onChange(originalOption, event);
    }

    if (!props.multiple) { setOpen(!open); }
    if (props.multiple) { modifyOptionVisibility(option, false); }
  };

  /**
   * Modify Option Visibility
   * 
   * Modifies the visibility of an option within the dropdown list
   * 
   * @param option: StateOption - the option to modify the visibility of
   * @param visible: boolean - whether or not the option should be visible
   */
  const modifyOptionVisibility = (option: StateOption, visible: boolean) => {
    // if there are no options set in state, do nothing
    if(!options) { return; }

    // make copy of state
    const stateOptions = [...options];
    
    const index = stateOptions.findIndex(stateOption => option.value === stateOption.value);

    // if it doesn't exist in state, do nothing
    if (index === -1) { return; }

    stateOptions[index].visible = visible;

    setOptions(stateOptions);
  };

  /**
   * Remove From Currently Selected
   * 
   * Removes the item from the currently selected items
   * 
   * @param option: StateOption - the option to remove
   * @param event: MouseEvent<HTMLElement> - the event that triggered the function 
   */
  const removeFromCurrentlySelected = (option: StateOption, event: MouseEvent<HTMLElement>) => {
    // if there's not something currently selected, do nothing
    if (!currentlySelected) { return; }

    // make copy of state
    const stateSelectedOptions = [...currentlySelected];

    const index = stateSelectedOptions.findIndex(stateSelected => option.value === stateSelected.value);

    // if it doesn't exist in state, do nothing
    if (index === -1) { return; }

    // remove the item from state
    stateSelectedOptions.splice(index, 1);

    setCurrentlySelected(stateSelectedOptions);

    // add the removed item back into the dropdown list
    modifyOptionVisibility(option, true);

    props.onChange(stateSelectedOptions.length ? convertToPropsOption(stateSelectedOptions) : null, event);
  };

  /**
   * Handle Header Click
   * 
   * Handler for when the user clicks on the header of the dropdown
   * 
   * @param event: MouseEvent<HTMLElement> - the event that triggered the function
   */
  const handleHeaderClick = (event: MouseEvent<HTMLElement>) => {
    const nodeEvent = event.target as Node;
    if (nodeEvent === headerRef.current || nodeEvent.parentElement === headerRef.current) {
      setOpen(!open);
    }
  };

  
  /**
   * Clear Selected
   * 
   * Clears the selected option
   * 
   * @param event: MouseEvent<HTMLElement> - the event that triggered the function 
   */
  const clearSelected = (event: MouseEvent<HTMLElement>) => { 
    setClearable(false); 
    setCurrentlySelected(null); 
    setFilterText('');
    props.onChange(null, event);
  }

  /**
   * Determine Dropdown Header Content
   * 
   * Determines what the dropdown header will display
   */
  const determineDropdownHeaderContent = () => {
    if(!currentlySelected && props.placeholder) { return props.placeholder; }
    if (!currentlySelected) { return ''; }
    
    if(props.multiple) { return renderMultipleOptions() }
    
    if(currentlySelected) { return currentlySelected[0].name; }
    
    return '';
  }

  const filterOptions = (event: SyntheticEvent<HTMLInputElement>) => { 
    const value = (event.target as HTMLInputElement).value;
    setFilterText(value);
    value !== '' ? setOptions(options.filter(opt => opt.name.includes(value) || `${opt.value}`.includes(value))) : setOptions(convertOptionsToStateOptions(props.options));  
  }

  const renderTrigger = () => <div onClick={(e: MouseEvent<HTMLElement>) => handleHeaderClick(e)} ref={headerRef}>{props.trigger}</div>
  
  const renderStandardDropdownHeader = () => 
          <DropdownHeader
            data-testid="dropdown-header"
            multiple={props.multiple}
            optionSelected={options.length > 0}
            onClick={(e: MouseEvent<HTMLElement>) => handleHeaderClick(e)}
            ref={headerRef}
          >
            <DropdownText>{determineDropdownHeaderContent()}</DropdownText>
            {clearable && props.clearable && <ClearIcon icon={faTimes} data-testid="clear-icon" onClick={clearSelected} />}
            <DropdownIcon
              icon={faAngleDown}
              data-testid="dropdown-icon"
              onClick={() => setOpen(!open)}
            />
        </DropdownHeader>

  const renderSearchableDropdownHeader = () => 
          <DropdownHeader
            data-testid="dropdown-header"
            multiple={props.multiple}
            optionSelected={options.length > 0}
            onClick={(e: MouseEvent<HTMLElement>) => handleHeaderClick(e)}
            ref={headerRef}
          >
            {!open && <DropdownText>{determineDropdownHeaderContent()}</DropdownText>}
            <FilterTextInput id="dropdown-filter" onChange={filterOptions} value={filterText} ref={inputRef} css={{display: open ? 'block' : 'none' }} />
            {clearable && props.clearable && <ClearIcon icon={faTimes} data-testid="clear-icon" onClick={clearSelected} />}
            <DropdownIcon
              icon={faAngleDown}
              data-testid="dropdown-icon"
              onClick={() => setOpen(!open)}
            />
        </DropdownHeader>
  
  const renderMultipleOptions = () =>
    currentlySelected!.map((option: StateOption) => (
      <DropdownMultiOption
        value={option.value}
        key={`selected-${option.value}`}
        data-testid={`dropdown-selected-multi-${option.value}`}
      >
        {option.name}
        <DeleteIcon
        data-testid={`dropdown-selected-multi-${option.value}-delete`}
          icon={faTimes}
          onClick={(e: MouseEvent<HTMLElement>) => {
            removeFromCurrentlySelected(option, e);
          }}
        />
      </DropdownMultiOption>
    ));
  return (
    <div css={csx(props.css, { display: 'inline-block', width: '100%'})}>
      {props.label && <DropdownLabel data-testid="dropdown-label">{props.label}</DropdownLabel>}
      <DropdownWrapper data-testid="dropdown-wrapper" ref={wrapperRef} role="listbox" id={props.id} disabled={props.disabled} trigger={props.trigger}>
        {props.trigger && renderTrigger()}
        {!props.trigger && !props.searchable && renderStandardDropdownHeader()}
        {!props.trigger && props.searchable && renderSearchableDropdownHeader()}
          <DropdownMenu data-testid="dropdown-menu" open={open}>
            {options.map(
              option =>
                option.visible && (
                  <DropdownOption
                    value={`${option.value}`}
                    key={option.value}
                    data-testid={`dropdown-option-${option.value}`}
                    onClick={(event: MouseEvent<HTMLElement>) => handleOptionClick(option, event)}
                    className={currentlySelected && currentlySelected.includes(option) ? 'selected' : ''}
                  >
                    {option.name}
                  </DropdownOption>
                )
            )}
          </DropdownMenu>
      </DropdownWrapper>
    </div>
  );
};

export default Dropdown;
