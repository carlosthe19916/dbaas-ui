import Keycloak, { KeycloakConfig } from 'keycloak-js';

// Setup Keycloak instance as needed
// const keycloak = new Keycloak(UI_BASE_PATH + 'keycloak.json');

const config: KeycloakConfig = {
  url: 'http://localhost:8090',
  realm: 'chicken',
  clientId: 'frontend',
};
const keycloak = new Keycloak(config);
export default keycloak;
