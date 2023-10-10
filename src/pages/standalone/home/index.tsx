/* eslint react/prop-types: 0 */
import {
  Bullseye,
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  List,
  ListItem,
  PageSection,
  SearchInput,
  Split,
  SplitItem,
  Stack,
  StackItem,
  Text,
  TextContent,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import {
  addNotification,
  clearNotifications,
} from '@redhat-cloud-services/frontend-components-notifications/redux';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './home-page.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const { analytics } = useChrome();
  const [hasJoinedList, setHasJoinedList] = useState(false);

  const waitlistNotif = () => {
    if (!hasJoinedList) {
      setHasJoinedList(true);
      dispatch(
        addNotification({
          variant: 'success',
          title:
            'We have received your request. While you are waiting, please join our Slack channel.',
          description: (
            <>
              <p>
                We are working hard to get you early access. After we approve
                your request, we will send you an email notification with
                information about how you can access and start using the
                service.
              </p>
              <br />
              <Button
                variant='link'
                component='a'
                href='https://rhdevnation.slack.com/archives/C04LXT1EU7K'
                target='_blank'
                rel='noopener noreferrer'
                icon={<ExternalLinkAltIcon />}
                iconPosition='right'
                isInline
              >
                Join the #software-supply-chain-security channel on Slack
              </Button>
            </>
          ),
        }),
      );
    } else {
      dispatch(
        addNotification({
          variant: 'success',
          title:
            'Thank you for your interest. We are processing your previous request.',
          description: (
            <>
              <p>
                We are working hard to get you early access. After we approve
                your request, we will send you an email notification with
                information about how you can access and start using the
                service.
              </p>
              <br />
              <Button
                variant='link'
                component='a'
                href='https://rhdevnation.slack.com/archives/C04LXT1EU7K'
                target='_blank'
                rel='noopener noreferrer'
                icon={<ExternalLinkAltIcon />}
                iconPosition='right'
                isInline
              >
                Join the #software-supply-chain-security channel on Slack
              </Button>
            </>
          ),
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(clearNotifications());
  }, []);

  return (
    <div className='home-page'>
      <PageHeader className='dbaas-home-page__header pf-u-p-2xl'>
        <Grid>
          <GridItem sm={12} md={8}>
            <TextContent>
              <Title size='2xl' headingLevel='h1'>
                Trusted Content
              </Title>
              <Text component='p'>
                A managed service for software composition analysis
              </Text>
            </TextContent>
            <Stack hasGutter>
              <StackItem>
                <TextContent>
                  <Text className='dbaas-home-page__subtitle'>&nbsp;</Text>
                  <Text>
                    The Trusted Content managed service brings awareness to, and
                    remediation of Open Source Software (OSS) vulnerabilities
                    that are discovered within the software suply chain. You can
                    verify components easily by using Trusted Content to quickly
                    find Software Bill of Materials (SBOM), and Vulnerability
                    Exploitability eXchange (VEX) for Red Hat products and
                    packages, or upload your own SBOM for analysis. Use what we
                    use, to know what we know.
                  </Text>
                  <Text>
                    Verify components easily by using Red Hat Trusted Content to
                    quickly find Software Bill of Materials (SBOMs) and
                    Vulnerability Exploitability eXchange (VEX) for Red Hat
                    products and packages or upload your own SBOM for analysis.
                    Use what we use, know what we know.
                  </Text>
                </TextContent>
              </StackItem>
            </Stack>
          </GridItem>
        </Grid>
      </PageHeader>

      {
        <PageSection
          variant='light'
          className='appsrv-marketing--page-section--marketing pf-u-background-color-100'
        >
          <Stack>
            <StackItem>
              <Bullseye>
                <Toolbar id='toolbar-items'>
                  <ToolbarContent>
                    <ToolbarItem variant='search-filter'>
                      <SearchInput
                        aria-label='Items example search input'
                        placeholder='Search for an SBOM, VEX, or CVE'
                      />
                    </ToolbarItem>
                    <ToolbarItem>
                      <Button variant='primary'>Search</Button>
                    </ToolbarItem>
                    {/* <ToolbarItem variant='separator' /> */}
                    {/* <ToolbarItem>
                      <Button variant='secondary'>Upload SBOM</Button>
                    </ToolbarItem> */}
                  </ToolbarContent>
                </Toolbar>
              </Bullseye>
            </StackItem>
            <StackItem>
              <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                <Flex>
                  <FlexItem spacer={{ default: 'spacerXl' }}>&nbsp;</FlexItem>
                </Flex>

                <Flex flex={{ default: 'flex_1' }}>
                  <FlexItem className='rh-icon-flex'>
                    <Stack>
                      <StackItem>
                        <div className='pf-u-text-align-center rh-clipboard rh-icon'>
                          &nbsp;
                        </div>
                      </StackItem>
                      <StackItem>
                        <div className='pf-u-text-align-center'>
                          I need an SBOM for...
                        </div>
                      </StackItem>
                    </Stack>
                  </FlexItem>
                </Flex>

                <Flex flex={{ default: 'flex_1' }}>
                  <FlexItem className='rh-icon-flex'>
                    <Stack>
                      <StackItem>
                        <div className='pf-u-text-align-center rh-shield rh-icon'>
                          &nbsp;
                        </div>
                      </StackItem>
                      <StackItem>
                        <div className='pf-u-text-align-center'>
                          I have an SBOM and need vulnerability info
                        </div>
                      </StackItem>
                    </Stack>
                  </FlexItem>
                </Flex>

                <Flex flex={{ default: 'flex_1' }}>
                  <FlexItem className='rh-icon-flex'>
                    <Stack>
                      <StackItem>
                        <div className='pf-u-text-align-center rh-clipboard rh-icon'>
                          &nbsp;
                        </div>
                      </StackItem>
                      <StackItem>
                        <div className='pf-u-text-align-center'>
                          I need information on a specific vulnerability
                        </div>
                      </StackItem>
                    </Stack>
                  </FlexItem>
                </Flex>

                <Flex flex={{ default: 'flex_1' }}>
                  <FlexItem className='rh-icon-flex'>
                    <Stack>
                      <StackItem>
                        <div className='pf-u-text-align-center rh-secure rh-icon'>
                          &nbsp;
                        </div>
                      </StackItem>
                      <StackItem>
                        <div className='pf-u-text-align-center'>
                          I want to browse by category: Quarkus, UBI, RHEL
                        </div>
                      </StackItem>
                    </Stack>
                  </FlexItem>
                </Flex>

                <Flex>
                  <FlexItem spacer={{ default: 'spacerXl' }}>&nbsp;</FlexItem>
                </Flex>
              </Flex>
            </StackItem>
          </Stack>
        </PageSection>
      }

      <PageSection>
        <Grid hasGutter>
          <GridItem md={6}>
            <Stack hasGutter>
              <StackItem>
                <Card>
                  <CardTitle>Get started!</CardTitle>
                  <CardBody>
                    <List isPlain>
                      <ListItem>
                        <a>Searching for Trusted Content</a>
                      </ListItem>
                      <ListItem>
                        <a>Uploading software bill of materials files</a>
                      </ListItem>
                      <ListItem>
                        <a>Configuring the Trusted Content VSCode extension</a>
                      </ListItem>
                      <ListItem>
                        <a>Glosary</a>
                      </ListItem>
                      <ListItem>
                        <a>Frecuently asked questions</a>
                      </ListItem>
                    </List>
                  </CardBody>
                </Card>
              </StackItem>
              <StackItem>
                <Card>
                  <CardTitle>Subscribe</CardTitle>
                  <CardBody>
                    Large enterprises to single developers, we have the right
                    subscription for you
                  </CardBody>
                  <CardFooter>
                    <Bullseye>
                      <Button variant={ButtonVariant.primary} size='lg'>
                        Buy now
                      </Button>
                    </Bullseye>
                  </CardFooter>
                </Card>
              </StackItem>
            </Stack>
          </GridItem>
          <GridItem md={6}>
            <Card isFullHeight>
              <CardTitle>Why trust Red Hat?</CardTitle>
              <CardBody>
                <iframe
                  width='400'
                  height='400'
                  src='https://www.youtube.com/embed/BqpWvESLW78'
                  title='YouTube video player'
                  // frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  // allowfullscreen
                  style={{ height: '100%', width: '100%' }}
                ></iframe>
              </CardBody>
              <CardFooter>
                <Text component='p'>Experience, OSS knowledge, etc.</Text>
                <Text component='p'>
                  How you can use this information in your org so that you can
                  respond to defects/vuln the same we respond in our software.{' '}
                  <a>Learn more</a>
                </Text>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
    </div>
  );
};

export default HomePage;
