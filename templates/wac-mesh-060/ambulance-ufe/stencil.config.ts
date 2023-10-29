import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ambulance-ufe',

  globalScript: "src/global/app.ts",
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],

  testing: {
    browserHeadless: "new",
    /**
       * DevContainer  doesn't allow sandbox, therefore this parameters must be passed to your Headless Chrome
       * before it can run your tests
       */
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    transformIgnorePatterns: ["/node_modules/(?!axios)"],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
  },
};
