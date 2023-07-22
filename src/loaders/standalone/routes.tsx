import { Bullseye, Spinner } from '@patternfly/react-core';
import React, { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AdvisoriesPage from 'src/pages/common/advisories';
import SBOMsPage from 'src/pages/common/sboms';
import ViewSBOMPage from 'src/pages/common/view-sbom';
import HomePage from 'src/pages/community/home';

export const ViewSBOMRouteParam = 'sbomId';

export const StandaloneRoutes = () => {
  const allRoutes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/advisory', element: <AdvisoriesPage /> },
    { path: '/sbom', element: <SBOMsPage /> },
    { path: `/sbom/:${ViewSBOMRouteParam}`, element: <ViewSBOMPage /> },
    { path: '*', element: <Navigate to='/' /> },
  ]);

  return (
    <Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      {allRoutes}
    </Suspense>
  );
};
