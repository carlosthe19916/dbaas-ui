import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './loaders/standalone/loader';

// Entrypoint for compiling the app to run in standalone mode

if (!window.location.pathname.includes(UI_BASE_PATH)) {
  // react-router v6 won't redirect to base path by default
  window.history.pushState(null, null, UI_BASE_PATH);
}

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router basename={UI_BASE_PATH}>
        <App />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
