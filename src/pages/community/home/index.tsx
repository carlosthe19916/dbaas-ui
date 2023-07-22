/* eslint react/prop-types: 0 */
import {
  Bullseye,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from '@patternfly/react-core';
import ShieldIcon from '@patternfly/react-icons/dist/esm/icons/shield-alt-icon';
import React from 'react';

const HomePage = () => {
  return (
    <Bullseye>
      <EmptyState variant={EmptyStateVariant.large}>
        <EmptyStateIcon icon={ShieldIcon} />
        <Title headingLevel='h4' size='lg'>
          Welcome to Trustification
        </Title>
        <EmptyStateBody>
          Verify components easily by using Red Hat Trusted Content to quickly
          find Software Bill of Materials (SBOMs) and Vulnerability
          Exploitability eXchange (VEX) for Red Hat products and packages or
          upload your own SBOM for analysis. Use what we use, know what we know.
        </EmptyStateBody>
      </EmptyState>
    </Bullseye>
  );
};

export default HomePage;
