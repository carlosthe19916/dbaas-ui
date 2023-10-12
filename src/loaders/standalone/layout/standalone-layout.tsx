import { Page } from '@patternfly/react-core';
import React from 'react';
import { Notifications } from 'src/components/Notifications';
import { PageContentWithDrawerProvider } from 'src/components/PageDrawerContext';
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
      <PageContentWithDrawerProvider>
        {children}
        <Notifications />
      </PageContentWithDrawerProvider>
    </Page>
  );
};
