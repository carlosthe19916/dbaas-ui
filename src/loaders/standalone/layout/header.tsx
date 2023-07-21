import {
  Brand,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownItem,
  KebabToggle,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import GithubIcon from '@patternfly/react-icons/dist/esm/icons/github-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';
import BarsIcon from '@patternfly/react-icons/dist/js/icons/bars-icon';
import React, { useReducer, useState } from 'react';
import logo from 'src/../static/images/logo.svg';
import { AboutApp } from './about';

export const HeaderApp: React.FC = () => {
  const [isAboutOpen, toggleIsAboutOpen] = useReducer((state) => !state, false);
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState(false);

  const kebabDropdownItems = [
    <DropdownItem
      key='github'
      component={
        <a
          href='https://github.com/trustification/trustification'
          target='_blank'
        >
          <GithubIcon /> Github
        </a>
      }
    />,
    <DropdownItem key='about' onClick={toggleIsAboutOpen}>
      <HelpIcon /> About
    </DropdownItem>,
  ];

  const onKebabDropdownToggle = () => {
    setIsKebabDropdownOpen(!isKebabDropdownOpen);
  };

  const onKebabDropdownSelect = () => {
    setIsKebabDropdownOpen(!isKebabDropdownOpen);
  };

  return (
    <>
      <AboutApp isOpen={isAboutOpen} onClose={toggleIsAboutOpen} />

      <Masthead>
        <MastheadToggle>
          <PageToggleButton variant='plain' aria-label='Global navigation'>
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadMain>
          <MastheadBrand>
            <Brand
              widths={{ default: '40px', md: '40px', '2xl': '50px' }}
              src={logo}
              alt='Logo'
            >
              <source media='(min-width: 768px)' srcSet={logo} />
              <source srcSet={logo} />
            </Brand>
          </MastheadBrand>
        </MastheadMain>
        <MastheadContent>
          <Toolbar id='toolbar' isFullHeight isStatic>
            <ToolbarContent>
              <ToolbarGroup
                variant='icon-button-group'
                alignment={{ default: 'alignRight' }}
                spacer={{ default: 'spacerNone', md: 'spacerMd' }}
              >
                <ToolbarGroup
                  variant='icon-button-group'
                  visibility={{ default: 'hidden', lg: 'visible' }}
                >
                  <ToolbarItem>
                    <Button
                      aria-label='Github'
                      variant={ButtonVariant.plain}
                      icon={<GithubIcon />}
                      component='a'
                      target='_blank'
                      href='https://github.com/trustification/trustification'
                    />
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button
                      aria-label='About'
                      variant={ButtonVariant.plain}
                      icon={<QuestionCircleIcon />}
                      onClick={toggleIsAboutOpen}
                    />
                  </ToolbarItem>
                </ToolbarGroup>
                <ToolbarItem
                  visibility={{
                    default: 'hidden',
                    md: 'visible',
                    lg: 'hidden',
                  }}
                >
                  <Dropdown
                    isPlain
                    position='right'
                    isOpen={isKebabDropdownOpen}
                    onSelect={onKebabDropdownSelect}
                    toggle={<KebabToggle onToggle={onKebabDropdownToggle} />}
                    dropdownItems={kebabDropdownItems}
                  />
                </ToolbarItem>
              </ToolbarGroup>
            </ToolbarContent>
          </Toolbar>
        </MastheadContent>
      </Masthead>
    </>
  );
};
