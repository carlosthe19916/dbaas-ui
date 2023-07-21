import { Page } from '@patternfly/react-core';
import React from 'react';
import { HeaderApp } from './header';
import { SidebarApp } from './sidebar';

interface StandaloneLayoutProps {
  children?: React.ReactNode;
}

export const StandaloneLayout: React.FC<StandaloneLayoutProps> = ({
  children,
}) => {
  return (
    <Page header={<HeaderApp />} sidebar={<SidebarApp />} isManagedSidebar>
      {children}
    </Page>
  );
};
