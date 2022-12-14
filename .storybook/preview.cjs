import { themes } from "@storybook/theming";
import { initialize, mswDecorator } from "msw-storybook-addon";

import "../src/styles/global.css";

initialize({
  onUnhandledRequest: "bypass", //Ignora logs de outras chamadas e exceto as que são do mock
  quiet: true,
  url: "/mockServiceWorker.js",
});

export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
};
