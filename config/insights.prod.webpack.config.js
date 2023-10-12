process.env.NODE_ENV = 'production';
const webpackBase = require('./webpack.base.config');
const cloudBeta = process.env.TRUST_CLOUD_BETA; // "true" | "false" | undefined (=default)

// Compile configuration for deploying to insights
module.exports = webpackBase({
  API_HOST: '',
  API_BASE_PATH: '/api/trustification/',
  UI_BASE_PATH:
    cloudBeta === 'true'
      ? '/preview/ansible/trusted-content/'
      : '/ansible/trusted-content/',
  UI_USE_MOCK_DATA: false,
  DEPLOYMENT_MODE: 'insights',
  UI_USE_HTTPS: false,
  UI_DEBUG: false,
  APPLICATION_NAME: 'Trustification',
});
