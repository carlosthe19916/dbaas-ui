/* eslint react/prop-types: 0 */
import {
  Nav,
  NavExpandable,
  NavGroup,
  NavItem,
  NavList,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { reject, some } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function ItemOrSection({ item, context, expandedSections }) {
  return item.type === 'section' ? (
    <MenuSection
      section={item}
      context={context}
      expandedSections={expandedSections}
    />
  ) : (
    <MenuItem item={item} context={context} />
  );
}

function MenuItem({ item, context }) {
  return item.condition(context) ? (
    <NavItem
      isActive={item.active}
      onClick={(e) => {
        item.onclick && item.onclick();
        e.stopPropagation();
      }}
    >
      {item.url && item.external ? (
        <a
          href={item.url}
          data-cy={item['data-cy']}
          target='_blank'
          rel='noreferrer'
        >
          {item.name}
          <ExternalLinkAltIcon
            style={{ position: 'absolute', right: '32px' }}
          />
        </a>
      ) : item.url ? (
        <Link to={item.url}>{item.name}</Link>
      ) : (
        item.name
      )}
    </NavItem>
  ) : null;
}

function MenuSection({ section, context, expandedSections }) {
  return section.condition(context) ? (
    <NavExpandable
      title={section.name}
      groupId={section.name}
      isActive={section.active}
      isExpanded={expandedSections.includes(section.name)}
    >
      <Menu
        items={section.items}
        context={context}
        expandedSections={expandedSections}
      />
    </NavExpandable>
  ) : null;
}

function Menu({ items, context, expandedSections }) {
  return (
    <>
      {items.map((item) => (
        <ItemOrSection
          key={item.name}
          item={item}
          context={context}
          expandedSections={expandedSections}
        />
      ))}
    </>
  );
}

export const StandaloneMenu = ({ context }) => {
  const StandaloneNav = ({ children = null }) => (
    <Nav theme='dark' onToggle={() => {}}>
      <NavList>
        <NavGroup className={'nav-title'} title={APPLICATION_NAME} />
        children
      </NavList>
    </Nav>
  );

  if (!context.user || !context.settings || !context.featureFlags) {
    return <StandaloneNav />;
  }

  return (
    <StandaloneNav>
      {/* <Menu
        items={menu}
        context={context}
        expandedSections={expandedSections}
      /> */}
    </StandaloneNav>
  );
};
