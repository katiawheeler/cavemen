import { configure } from '@storybook/react';
import { themes } from '@storybook/theming';
import { addParameters } from '@storybook/react';

const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Option defaults.
addParameters({
  options: {
    theme: themes.light,
  },
});

configure(loadStories, module);
