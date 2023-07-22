import {
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  PageSidebar,
} from '@patternfly/react-core';
import ExternalLinkSquareAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-square-alt-icon';
import { css } from '@patternfly/react-styles';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutTheme } from './layout-constants';

const LINK_CLASS = 'pf-c-nav__link';
const ACTIVE_LINK_CLASS = 'pf-m-current';

export const SidebarApp: React.FC = () => {
  const [isSearchSectionExpanded, setIsSearchSectionExpanded] = useState(true);

  return (
    <PageSidebar
      nav={
        <Nav id='nav-sidebar' aria-label='Nav' theme={LayoutTheme}>
          <NavList>
            <li className='pf-c-nav__item'>
              <NavLink
                to='/'
                className={({ isActive }) => {
                  return css(LINK_CLASS, isActive ? ACTIVE_LINK_CLASS : '');
                }}
              >
                Trusted Content
              </NavLink>
            </li>
            <NavExpandable
              title='Search'
              groupId='search'
              isExpanded={isSearchSectionExpanded}
              onExpand={(_, isOpen) => setIsSearchSectionExpanded(isOpen)}
            >
              <li className='pf-v5-c-nav__item'>
                <NavLink
                  to='/sbom'
                  className={({ isActive }) => {
                    return css(LINK_CLASS, isActive ? ACTIVE_LINK_CLASS : '');
                  }}
                >
                  Packages
                </NavLink>
              </li>
              <li className='pf-v5-c-nav__item'>
                <NavLink
                  to='/advisory'
                  className={({ isActive }) => {
                    return css(LINK_CLASS, isActive ? ACTIVE_LINK_CLASS : '');
                  }}
                >
                  Advisories
                </NavLink>
              </li>
            </NavExpandable>
            <NavExpandable title='REST APIs'>
              <NavItem>
                <a
                  href='https://api.trustification.dev/swagger-ui/'
                  target='_blank'
                >
                  API&nbsp;
                  <ExternalLinkSquareAltIcon />
                </a>
              </NavItem>
              <NavItem>
                <a
                  href='https://sbom.trustification.dev/swagger-ui/'
                  target='_blank'
                >
                  SBOM API&nbsp;
                  <ExternalLinkSquareAltIcon />
                </a>
              </NavItem>
              <NavItem>
                <a
                  href='https://vex.trustification.dev/swagger-ui/'
                  target='_blank'
                >
                  VEX API&nbsp;
                  <ExternalLinkSquareAltIcon />
                </a>
              </NavItem>
            </NavExpandable>
          </NavList>
        </Nav>
      }
    />
  );
};