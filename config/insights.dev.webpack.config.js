const webpackBase = require('./webpack.base.config');

const proxyHost = process.env.API_PROXY_HOST || '127.0.0.1';
const proxyPort = process.env.API_PROXY_PORT || '8083';

const cloudBeta = process.env.TRUST_CLOUD_BETA; // "true" | "false" | undefined (=default)

const useMockData = process.env.UI_USE_MOCK_DATA || false;

module.exports = webpackBase({
  // The host where the API lives. EX: https://localhost:5001
  API_HOST: '',

  // Path to the API on the API host. EX: /api/trustification
  API_BASE_PATH: '/api/',

  // Value for standalone.api.target
  API_PROXY_TARGET: `https://api.trustification.dev`,
  // API_PROXY_TARGET: `http://${proxyHost}:${proxyPort}`,

  // Path on the host where the UI is found. EX: /apps/trustification
  // UI_BASE_PATH:
  //   cloudBeta !== 'false'
  //     ? '/preview/application-services/trusted-content/'
  //     : '/application-services/trusted-content/',

  UI_BASE_PATH:
    cloudBeta !== 'false'
      ? '/preview/ansible/automation-hub/'
      : '/ansible/automation-hub/',

  // Port that the UI is served over
  UI_PORT: 3000,

  // Whether or not use the *.mock data rather than actual REST calls
  UI_USE_MOCK_DATA: useMockData,

  // Determines if the app should be compiled to run on insights or on
  // another platform. Options: insights, standalone
  DEPLOYMENT_MODE: 'insights',

  // Determines the title of the app
  APPLICATION_NAME: 'Trustification',

  // Serve the UI over http or https. Options: true, false
  UI_USE_HTTPS: false,

  // Enables webpack debug mode. Options: true, false
  UI_DEBUG: true,
});
