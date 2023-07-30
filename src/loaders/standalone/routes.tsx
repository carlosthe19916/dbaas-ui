import { Bullseye, Spinner } from '@patternfly/react-core';
import React, { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AdvisoriesPage from 'src/pages/common/advisories';
import SBOMsPage from 'src/pages/common/sboms';
import ViewAdvisoryPage from 'src/pages/common/view-advisory';
import ViewSBOMPage from 'src/pages/common/view-sbom';
import HomePage from 'src/pages/standalone/home';
import { Paths } from 'src/paths';

export const StandaloneRoutes = () => {
  const allRoutes = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: Paths.advisory, element: <AdvisoriesPage /> },
    { path: Paths.advisoryEdit, element: <ViewAdvisoryPage /> },
    { path: Paths.sbom, element: <SBOMsPage /> },
    { path: Paths.sbombEdit, element: <ViewSBOMPage /> },
    // { path: '*', element: <Navigate to='/' /> },
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
