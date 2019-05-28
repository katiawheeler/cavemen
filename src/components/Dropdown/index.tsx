import { faAngleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import intersection from 'lodash.intersection';
import unionBy from 'lodash.unionby';
import React, { FunctionComponent, MouseEvent, useEffect, useRef, useState } from 'react';

import {
  ClearIcon,
  DeleteIcon,
  DropdownHeader,
  DropdownIcon,
  DropdownLabel,
  DropdownMenu,
  DropdownMultiOption,
  DropdownOption,
  DropdownWrapper
} from './Dropdown.styles';
import { DropdownProps, Option, StateOption } from './types';
import { convertToOption, setupOptions } from './utils';

const Dropdown: FunctionComponent<DropdownProps> = (props: DropdownProps) => {
  const [currentlySelected, setCurrentlySelected] = useState<StateOption[] | null>(null);
  const [options, setOptions] = useState<StateOption[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [clearable, setClearable] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleDefaultOptionsForMultipleDropdown = (defaultOptions: Option[]) => {
    // setup selected options and set visibility to false on the already selected options
    const selectedOptions = setupOptions(intersection(defaultOptions, props.options), false);
    setCurrentlySelected(selectedOptions);

    // format and merge options and the selected so that those items don't appear in the dropdown
    const formattedOptions = setupOptions(props.options)
    setOptions(unionBy(selectedOptions, formattedOptions, 'key'));
  }

  const handleDefaultOptionForSingleDropdown = (defaultOption: Option) => {
    // format options from props
    const formattedOptions = setupOptions(props.options);
    setOptions(formattedOptions);

    // find "default" option
    const foundOption = formattedOptions.find(option => option.name === defaultOption.name);

    // set as selected if found
    if (foundOption) { setCurrentlySelected([foundOption]); }
  }
 
  useEffect(() => {
    // event listener for click outside
    document.addEventListener('mousedown', handleOutsideClick);
    
    if (props.open) { setOpen(props.open); }
    
    if (props.default) {
      props.multiple ? handleDefaultOptionsForMultipleDropdown(props.default as Option[]) : handleDefaultOptionForSingleDropdown(props.default as Option);
    } else {
      setOptions(setupOptions(props.options));
    }

    // removal of event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event: Event) => {
    if (wrapperRef.current && event.target) {
      // if the event target doesn't exist in the wrapper of the dropdown, close it
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
  };

  const handleOptionClick = (option: StateOption, event: MouseEvent<HTMLElement>) => {
    // find original, unmodified option that was selected
    const originalOption = props.options.find(opt => opt.key === option.key);
    if(!originalOption) { return; }

    if (props.multiple) {
      const newSelected = currentlySelected ? [...currentlySelected, option] : [option];
      setCurrentlySelected(newSelected);

      props.onChange(convertToOption(newSelected), event)
    } else {
      setCurrentlySelected([option]);
      if(!clearable) { setClearable(true); }
      props.onChange(originalOption, event);
    }

    if (!props.multiple) { setOpen(!open); }
    if (props.multiple) { modifyDropdown(option, false); }
  };

  const modifyDropdown = (option: StateOption, visible: boolean) => {
    if(!options) { return; }
    const stateOptions = [...options];
    const index = stateOptions.findIndex(stateOption => option.key === stateOption.key);
    if (index === -1) { return; }
    stateOptions[index].visible = visible;
    setOptions(stateOptions);
  };

  const removeFromSelected = (option: StateOption, event: MouseEvent<HTMLElement>) => {
    if (!currentlySelected) { return; }
    const stateSelectedOptions = [...currentlySelected];
    const index = stateSelectedOptions.findIndex(stateSelected => option.key === stateSelected.key);
    if (index === -1) { return; }
    stateSelectedOptions.splice(index, 1);

    // remove from selected
    setCurrentlySelected(stateSelectedOptions);

    // add to dropdown
    modifyDropdown(option, true);

    // call onChange with new selected options
    props.onChange(convertToOption(stateSelectedOptions), event);
  };

  const renderMultipleOptions = () =>
    currentlySelected!.map((option: StateOption) => (
      <DropdownMultiOption
        value={option.value}
        key={`selected-${option.key}`}
        data-testid={`dropdown-selected-multi-${option.key}`}
      >
        {option.name}
        <DeleteIcon
        data-testid={`dropdown-selected-multi-${option.key}-delete`}
          icon={faTimes}
          onClick={(e: MouseEvent<HTMLElement>) => {
            removeFromSelected(option, e);
          }}
        />
      </DropdownMultiOption>
    ));

  const handleHeaderClick = (event: MouseEvent<HTMLElement>) => {
    const nodeEvent = event.target as Node;
    if (nodeEvent.parentElement === wrapperRef.current) {
      setOpen(!open);
    }
  };

  const determineClassName = (option: StateOption) => {
    if (!currentlySelected) { return ''; }
    if (currentlySelected.find(opt => opt.key === option.key)) { return 'selected'; }
    return '';
  };

  const determineDropdownHeader = () => {
    if(!currentlySelected && props.placeholder) { return props.placeholder; }
    if (!currentlySelected) { return ''; }

    if(props.multiple) { return renderMultipleOptions() }

    if(currentlySelected) { return currentlySelected[0].name; }

    return '';
  }

  const clearSelection = (event: MouseEvent<HTMLElement>) => { setClearable(false); setCurrentlySelected(null); props.onChange(null, event)}

  return (
    <>
      {props.label && <DropdownLabel data-testid="dropdown-label">{props.label}</DropdownLabel>}
      <DropdownWrapper data-testid="dropdown-wrapper" ref={wrapperRef} role="listbox" id={props.id} disabled={props.disabled} >
        <DropdownHeader
          data-testid="dropdown-header"
          multiple={props.multiple}
          optionSelected={options.length > 0}
          onClick={(e: MouseEvent<HTMLElement>) => handleHeaderClick(e)}
        >
          {determineDropdownHeader()}
          {clearable && props.clearable && <ClearIcon icon={faTimes} data-testid="clear-icon" onClick={clearSelection} />}
          <DropdownIcon
            icon={faAngleDown}
            data-testid="dropdown-icon"
            onClick={() => setOpen(!open)}
          />
        </DropdownHeader>
          <DropdownMenu data-testid="dropdown-menu" open={open}>
            {options.map(
              option =>
                option.visible && (
                  <DropdownOption
                    value={`${option.value}`}
                    key={option.key}
                    data-testid={`dropdown-option-${option.key}`}
                    onClick={(event: MouseEvent<HTMLElement>) => handleOptionClick(option, event)}
                    className={determineClassName(option)}
                  >
                    {option.name}
                  </DropdownOption>
                )
            )}
          </DropdownMenu>
      </DropdownWrapper>
    </>
  );
};

export default Dropdown;
