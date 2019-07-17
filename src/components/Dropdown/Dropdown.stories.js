import React from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';

import Dropdown from './index';
import dropdownMD from './Dropdown.md';

const dropdownOptions = [
  {
    value: 1,
    name: 'Thing 1',
  },
  {
    value: 2,
    name: 'Thing 2',
  },
  {
    value: 3,
    name: 'Thing 3',
  },
  {
    value: 4,
    name: 'Thing 4',
  },
];

const Square = styled('div')`
  height: 350px;
  width: 350px;
`;

const HeaderInputStyle = () => ({ 
  ".dropdown-option": {
    color: 'green'
  },
  ".dropdown-header": {
    fontSize: '22px'
  },
  width: '8em',
  height: '7em',
})

storiesOf('Components|Dropdown', module)
  .add(
    'default',
    () => (
      <Square>
        <Dropdown options={dropdownOptions} onChange={option => console.log(option)} />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'with label',
    () => (
      <Square>
        <Dropdown
          options={dropdownOptions}
          onChange={option => console.log(option)}
          label="Dropdown Label"
        />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'with placeholder',
    () => (
      <Square>
        <Dropdown
          options={dropdownOptions}
          onChange={option => console.log(option)}
          placeholder="Select an option"
        />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'with default option',
    () => (
      <Square>
        <Dropdown
          options={dropdownOptions}
          default={dropdownOptions[2]}
          onChange={option => console.log(option)}
        />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'disabled',
    () => (
      <Square>
        <Dropdown options={dropdownOptions} onChange={option => console.log(option)} disabled />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'clearable',
    () => (
      <Square>
        <Dropdown options={dropdownOptions} clearable onChange={option => console.log(option)} />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'open by default',
    () => (
      <Square>
        <Dropdown options={dropdownOptions} onChange={option => console.log(option)} open />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'with multiple',
    () => (
      <Square>
        <Dropdown options={dropdownOptions} onChange={option => console.log(option)} multiple />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'with multiple and default options',
    () => (
      <Square>
        <Dropdown
          options={dropdownOptions}
          default={[dropdownOptions[1], dropdownOptions[2]]}
          onChange={option => console.log(option)}
          multiple
        />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'with trigger',
    () => (
      <Square>
        <Dropdown
          options={dropdownOptions}
          onChange={option => console.log(option)}
          trigger={<div>I'm a trigger - I can be any React component</div>}
        />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'with custom css',
    () => (
      <Square>
        <Dropdown
          options={dropdownOptions}
          onChange={option => console.log(option)}
          css={HeaderInputStyle}
        />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'searchable',
    () => (
      <Square>
        <Dropdown options={dropdownOptions} onChange={option => console.log(option)} searchable />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  )
  .add(
    'searchable and clearable',
    () => (
      <Square>
        <Dropdown
          options={dropdownOptions}
          onChange={option => console.log(option)}
          searchable
          clearable
        />
      </Square>
    ),
    {
      notes: dropdownMD,
    }
  );
