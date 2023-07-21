import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './loaders/insights/loader';
import { init } from './store';

// Entrypoint for compiling the app to run in insights mode.

const queryClient = new QueryClient();
const basename = getBaseName(window.location.pathname);
console.log(basename);
const Trustification = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <Router basename={basename}> */}
      {/* <Provider store={init().getStore()}> */}
      <App />
      {/* </Provider> */}
      {/* </Router> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// ignore unused exports default
export default Trustification;
