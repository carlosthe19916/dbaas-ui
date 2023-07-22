import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('src/pages/home'));
const AdvisoriesPage = lazy(() => import('src/pages/advisories'));
const SBOMsPage = lazy(() => import('src/pages/sboms'));
const ViewSBOMPage = lazy(() => import('src/pages/view-sbom'));
const OopsPage = lazy(() => import('src/pages/oops'));

const routes = [
  { path: '/', component: HomePage },
  { path: '/advisory', component: AdvisoriesPage },
  { path: '/sbom', component: SBOMsPage },
  { path: `/sbom/:sbomId`, component: ViewSBOMPage },
];

/**
 * changes routes depending on the path
 * https://reactrouter.com/en/main/route/route
 */
export const InsightsRoutes = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        {routes.map(({ component: Component, path }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
        <Route path='*' element={OopsPage} />
      </Routes>
    </Suspense>
  );
};
