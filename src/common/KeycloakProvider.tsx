import { Flex, FlexItem, Spinner } from '@patternfly/react-core';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import React from 'react';
import { initInterceptors } from '../api/apiInit';
import keycloak from '../keycloak';
import { deleteCookie, getCookie, setCookie } from '../queries/cookies';

interface IKeycloakProviderProps {
  children: React.ReactNode;
}

export const KeycloakProvider: React.FC<IKeycloakProviderProps> = ({
  children,
}) => {
  const checkAuthCookie = () => {
    if (!getCookie('keycloak_cookie') && keycloak?.token) {
      setCookie('keycloak_cookie', keycloak.token, 365);
    }
  };
  return (
    <>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: 'login-required' }}
        LoadingComponent={
          <Flex
            spaceItems={{ default: 'spaceItemsSm' }}
            alignItems={{ default: 'alignItemsCenter' }}
            flexWrap={{ default: 'nowrap' }}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <FlexItem
              style={{
                margin: 'auto auto',
                textAlign: 'center',
              }}
            >
              <Spinner>Loading...</Spinner>
            </FlexItem>
          </Flex>
        }
        isLoadingCheck={(keycloak) => {
          if (keycloak.authenticated) {
            initInterceptors(
              () =>
                new Promise<string>((resolve, reject) => {
                  if (keycloak.token) {
                    if (keycloak.refreshToken) {
                      keycloak
                        .updateToken(60)
                        .then(() => {
                          // deleteCookie('keycloak_cookie');
                          // checkAuthCookie();
                          return resolve(keycloak.token!);
                        })
                        .catch((err) => {
                          console.log('err', err);
                          return reject('Failed to refresh token');
                        });
                    } else {
                      return resolve(keycloak.token!);
                    }
                  } else {
                    keycloak.login();
                    reject('Not logged in');
                  }
                }),
            );
          }

          return !keycloak.authenticated;
        }}
      >
        {children}
      </ReactKeycloakProvider>
    </>
  );
};
