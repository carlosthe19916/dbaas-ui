import { Bullseye, Spinner } from '@patternfly/react-core';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Paths } from 'src/paths';

const HomePage = lazy(() => import('src/pages/insights/home'));
const AdvisoriesPage = lazy(() => import('src/pages/common/advisories'));
const ViewAdvisoryPage = lazy(() => import('src/pages/common/view-advisory'));
const SBOMsPage = lazy(() => import('src/pages/common/sboms'));
const ViewSBOMPage = lazy(() => import('src/pages/common/view-sbom'));
const OopsPage = lazy(() => import('src/pages/common/oops'));

const routes = [
  { path: '/', component: HomePage },
  { path: Paths.advisory, component: AdvisoriesPage },
  { path: Paths.advisoryEdit, component: ViewAdvisoryPage },
  { path: Paths.sbom, component: SBOMsPage },
  { path: Paths.sbombEdit, component: ViewSBOMPage },
];

/**
 * changes routes depending on the path
 * https://reactrouter.com/en/main/route/route
 */
export const InsightsRoutes = () => {
  return (
    <Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      <Routes>
        {routes.map(({ component: Component, path }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
        <Route path='*' element={<OopsPage />} />
      </Routes>
    </Suspense>
  );
};
