import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { KeycloakProvider } from './common/KeycloakProvider';
import App from './loaders/standalone/loader';
import { init } from './store';

// Entrypoint for compiling the app to run in standalone mode

if (!window.location.pathname.includes(UI_BASE_PATH)) {
  // react-router v6 won't redirect to base path by default
  window.history.pushState(null, '', UI_BASE_PATH);
}

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <KeycloakProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={init().getStore()}>
          <Router basename={UI_BASE_PATH}>
            <App />
          </Router>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </KeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
