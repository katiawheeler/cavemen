import { configure, addDecorator } from '@storybook/react';
import { globalSetup } from './decorators';

const req = require.context('../src/components', true, /\.stories\.js$/);

addDecorator(globalSetup);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
