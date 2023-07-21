import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import React, { useEffect, useState } from 'react';
import { FeatureFlagsType } from 'src/api/response-types/feature-flags';
import { UserType } from 'src/api/user';
import { AppContext } from '../app-context';
import { loadContext } from '../load-context';
import { InsightsRoutes } from './routes';

const App = () => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagsType>(null);
  const [user, setUser] = useState<UserType>(null);

  const { identifyApp, updateDocumentTitle } = useChrome();

  useEffect(() => {
    identifyApp('dbaas');
    updateDocumentTitle(APPLICATION_NAME);

    loadContext().then(({ featureFlags, user }) => {
      setFeatureFlags(featureFlags);
      setUser(user);
    });
  }, []);

  // Wait for the user data to load before any of the child components are rendered. This will prevent API calls from happening before the app can authenticate
  if (!user) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        featureFlags,
        setUser,
        user,
      }}
    >
      {/* <NotificationsPortal /> */}
      <InsightsRoutes />
    </AppContext.Provider>
  );
};

export default App;
