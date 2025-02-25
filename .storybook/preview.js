
import { initialize, mswLoader } from 'msw-storybook-addon'
import "../src/index.css"

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true
    },
    loaders: [mswLoader],
  },
};

export default preview;
