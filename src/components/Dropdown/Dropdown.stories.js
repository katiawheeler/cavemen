import React from 'react';

import { storiesOf } from '@storybook/react';

import Dropdown from './index';
import dropdownMD from './Dropdown.md';

const dropdownOptions = [
  {
    key: '1',
    value: 1,
    name: 'Thing 1',
  },
  {
    key: '2',
    value: 2,
    name: 'Thing 2',
  },
  {
    key: '3',
    value: 3,
    name: 'Thing 3',
  },
  {
    key: '4',
    value: 4,
    name: 'Thing 4',
  }
];


storiesOf('Components|Dropdown', module)
  .add('default', () => <Dropdown options={dropdownOptions} onChange={(option) => console.log(option)} />, {
    notes: dropdownMD,
  })
  .add('with label', () => <Dropdown options={dropdownOptions} onChange={(option) => console.log(option)} label="Dropdown Label" />, {
    notes: dropdownMD,
  })
  .add('with placeholder', () => <Dropdown options={dropdownOptions} onChange={(option) => console.log(option)} placeholder="Select an option" />, {
    notes: dropdownMD,
  })
  .add('with default option', () => <Dropdown options={dropdownOptions} default={dropdownOptions[2]} onChange={(option) => console.log(option)} />, {
    notes: dropdownMD,
  })
  .add('disabled', () => <Dropdown options={dropdownOptions} onChange={(option) => console.log(option)} disabled />, {
    notes: dropdownMD,
  })
  .add('open by default', () => <Dropdown options={dropdownOptions} onChange={(option) => console.log(option)} open />, {
    notes: dropdownMD,
  })
  .add('with multiple', () => <Dropdown options={dropdownOptions} onChange={option => console.log(option)} multiple />, {
    notes: dropdownMD,
  })
  .add('with multiple and default options', () => <Dropdown options={dropdownOptions} default={[dropdownOptions[1], dropdownOptions[2]]} onChange={(option) => console.log(option)} multiple />, {
    notes: dropdownMD,
  })
