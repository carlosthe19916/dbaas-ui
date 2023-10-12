import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Provider } from 'react-redux';
import { Notifications } from './components/Notifications';
import { NotificationsProvider } from './components/NotificationsContext';
import { PageContentWithDrawerProvider } from './components/PageDrawerContext';
import App from './loaders/insights/loader';
import { init } from './store';

// Entrypoint for compiling the app to run in insights mode.

const queryClient = new QueryClient();
const basename = getBaseName(window.location.pathname);
console.log(basename);
const Trustification = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={init().getStore()}>
        <NotificationsProvider>
          <PageContentWithDrawerProvider>
            <App />
            <Notifications />
          </PageContentWithDrawerProvider>
        </NotificationsProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// ignore unused exports default
export default Trustification;
