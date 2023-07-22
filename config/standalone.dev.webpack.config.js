const webpackBase = require('./webpack.base.config');

// Used for getting the correct host when running in a container
const proxyHost = process.env.API_PROXY_HOST || '127.0.0.1';
const proxyPort = process.env.API_PROXY_PORT || '8083';
const apiBasePath = process.env.API_BASE_PATH || '/api/trustification/';
const uiExternalLoginURI = process.env.UI_EXTERNAL_LOGIN_URI || '/login';

module.exports = webpackBase({
  // The host where the API lives. EX: https://localhost:5001
  API_HOST: '',

  // Path to the API on the API host. EX: /api/trustification
  API_BASE_PATH: apiBasePath,

  // Path on the host where the UI is found. EX: /apps/trustification
  UI_BASE_PATH: '/ui/',

  // Port that the UI is served over
  UI_PORT: 3000,

  // Determines if the app should be compiled to run on insights or on
  // another platform. Options: insights, standalone
  DEPLOYMENT_MODE: 'standalone',

  // Serve the UI over http or https. Options: true, false
  UI_USE_HTTPS: false,

  // Enables webpack debug mode. Options: true, false
  UI_DEBUG: true,

  // Login URI to allow stand alone with and without keycloak
  UI_EXTERNAL_LOGIN_URI: uiExternalLoginURI,

  // Value for webpack.devServer.proxy
  // https://webpack.js.org/configuration/dev-server/#devserverproxy
  // used to get around CORS requirements when running in dev mode
  WEBPACK_PROXY: {
    // '/api/': {
    //   target: `https://api.trustification.dev`,
    //   secure: false,
    //   changeOrigin: true,
    //   logLevel: process.env.UI_DEBUG ? 'debug' : 'info',
    // },
    '/api/': `http://${proxyHost}:${proxyPort}`,
    '/vexination/': `http://${proxyHost}:${proxyPort}`,
    '/bombastic/': `http://${proxyHost}:${proxyPort}`,
  },
});
