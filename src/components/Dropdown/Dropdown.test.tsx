import React, { MouseEvent } from 'react';
import { fireEvent, render, waitForElement } from 'react-testing-library';
import Dropdown from '.';
import { Option } from './types';

const options: Option[] = [
  {
    name: 'hi',
    key: 'hi',
    value: 'hello',
  },
  {
    name: 'hello',
    key: 'hello',
    value: 'hellowwww',
  },
  {
    name: 'asdsa',
    key: 'asd',
    value: 'ahello',
  },
];

const defaultOption: Option = {
  name: 'hi',
  key: 'hi',
  value: 'hello',
};

let event: MouseEvent<HTMLElement> | null = null;

// tslint:disable-next-line
const onChangeSpy = jest.fn((options, _event) => {
  event = _event;
});

describe('Dropdown', () => {
  describe('when only required props are passed', () => {
    it('should show a blank option', () => {
      const { getByTestId } = render(<Dropdown options={options} onChange={onChangeSpy} />);
      const dropdownHeader = getByTestId('dropdown-header');
      expect(dropdownHeader.textContent).toBe('');
    });
  });

  describe('when a default option is passed', () => {
    it('should display the passed in name', () => {
      const { getByTestId } = render(
        <Dropdown options={options} onChange={onChangeSpy} default={defaultOption} />
      );
      const dropdownHeader = getByTestId('dropdown-header');
      expect(dropdownHeader.textContent).toBe('hi');
    });
  });

  describe('when a placeholder is passed in', () => {
    it('should show the placeholder text', () => {
      const { getByTestId } = render(
        <Dropdown options={options} onChange={onChangeSpy} placeholder="None Selected" />
      );
      const dropdownHeader = getByTestId('dropdown-header');
      expect(dropdownHeader.textContent).toBe('None Selected');
    });
  });

  describe('when open is passed', () => {
    it('should be open', () => {
      const { getByTestId } = render(<Dropdown options={options} onChange={onChangeSpy} open />);
      const dropdownMenu = getByTestId('dropdown-menu');
      expect(dropdownMenu).toBeInTheDocument();
    });
  });

  describe('when a label is passed', () => {
    it('should render a label with the correct text', () => {
      const { getByTestId } = render(
        <Dropdown options={options} onChange={onChangeSpy} label="I'm a label" />
      );
      const label = getByTestId('dropdown-label');
      expect(label).toBeInTheDocument();
      expect(label.textContent).toBe("I'm a label");
    });
  });

  describe('open dropdown', () => {
    describe('when the dropdown is closed & the user clicks on it', () => {
      let dropdownMenu: HTMLElement;

      beforeEach(() => {
        const { getByTestId } = render(<Dropdown options={options} onChange={onChangeSpy} />);
        const header = getByTestId('dropdown-header');
        fireEvent.click(header);
        dropdownMenu = getByTestId('dropdown-menu');
      });

      it('should open it', () => {
        expect(dropdownMenu).toBeInTheDocument();
      });

      it('should render the correct number of Options', () => {
        expect(dropdownMenu.children).toHaveLength(3);
      });
    });

    describe('when an option is clicked from the dropdown menu', () => {
      let header: HTMLElement;
      let optionToClick: HTMLElement;

      beforeEach(() => {
        const { getByTestId } = render(<Dropdown options={options} onChange={onChangeSpy} />);
        header = getByTestId('dropdown-header');
        fireEvent.click(header);

        optionToClick = getByTestId('dropdown-option-asd');
      });

      it('should set the selected option to the clicked option', () => {
        expect(header.textContent).toBe('');
        fireEvent.click(optionToClick);
        expect(header.textContent).toBe('asdsa');
      });

      it('should call the onChange prop with the option', () => {
        expect(header.textContent).toBe('');
        fireEvent.click(optionToClick);

        expect(onChangeSpy).toHaveBeenCalledWith({
          name: 'asdsa',
          key: 'asd',
          value: 'ahello',
        }, event);
      });
    });
  });

  describe('multi-select dropdown', () => {
    describe('when the multiple prop is passed', () => {
      let firstOptionToSelect: HTMLElement;
      let secondOptionToSelect: HTMLElement;
      let firstSelectedOption: HTMLElement;
      let secondSelectedOption: HTMLElement;
      let firstSelectedOptionToDelete: HTMLElement;
      let header: HTMLElement;

      describe('initial load', () => {
        it('should have a blank header', () => {
          const { getByTestId } = render(
            <Dropdown options={options} onChange={onChangeSpy} multiple />
          );
          header = getByTestId('dropdown-header');
          fireEvent.click(header);
          expect(header.textContent).toBe('');
        });
      });

      describe('when the user selects and unselects things', () => {
        beforeEach(() => {
          const { getByTestId } = render(
            <Dropdown options={options} onChange={onChangeSpy} multiple />
          );
          header = getByTestId('dropdown-header');
          fireEvent.click(header);

          // select the first option
          firstOptionToSelect = getByTestId('dropdown-option-hello');
          fireEvent.click(firstOptionToSelect);

          // select the second option
          secondOptionToSelect = getByTestId('dropdown-option-asd');
          fireEvent.click(secondOptionToSelect);

          // find the selected options in the header
          firstSelectedOption = getByTestId('dropdown-selected-multi-hello');
          secondSelectedOption = getByTestId('dropdown-selected-multi-asd');
          
          // find the first option's delete icon
          firstSelectedOptionToDelete = getByTestId('dropdown-selected-multi-hello-delete');
        });

        describe('when the user clicks multiple values from the dropdown', () => {
          it('should add the option to the selected values', () => {
            expect(firstSelectedOption).toBeInTheDocument();
            expect(firstSelectedOption.textContent).toBe('hello');
            expect(secondSelectedOption).toBeInTheDocument();
            expect(secondSelectedOption.textContent).toBe('asdsa');
          });

          it('should remove the options from the dropdown', () => {
            expect(firstOptionToSelect).not.toBeInTheDocument();
            expect(secondOptionToSelect).not.toBeInTheDocument();
          });
        });

        describe('when the user clicks a selected option', () => {
          it('should remove the option from the selected', () => {
            // ensure it's still there
            expect(firstSelectedOption).toBeInTheDocument();

            // click on the selected option's delete icon
            fireEvent.click(firstSelectedOptionToDelete);

            expect(firstSelectedOption).not.toBeInTheDocument();
          });

          it('should add the option back to the dropdown', () => {
            // ensure it's gone still
            expect(firstOptionToSelect).not.toBeInTheDocument();

            // click on the selected option
            fireEvent.click(firstSelectedOptionToDelete);

            // ensure it's returned
            waitForElement(() => expect(firstOptionToSelect).toBeInTheDocument());
          });
        });
      });
    });
  });
});
