import '../app.scss';
import '@patternfly/patternfly/patternfly.scss';
import React from 'react';
import { StandaloneLayout } from './layout';
import { StandaloneRoutes } from './routes';

const App = () => {
  let routes = <StandaloneRoutes />;
  return <StandaloneLayout>{routes}</StandaloneLayout>;
};

export default App;
