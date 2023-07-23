import {
  Breadcrumb,
  BreadcrumbItem,
  PageSection,
  PageSectionVariants,
  Spinner,
  Tab,
  TabContent,
  TabTitleText,
  Tabs,
  Text,
  TextContent,
} from '@patternfly/react-core';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Paths, formatPath } from 'src/paths';
import { useAdvisoryById } from 'src/queries/advisories';
import { Notes } from './components/notes';
import { Overview } from './components/overview';
import { Source } from './components/source';
import { Vulnerabilities } from './components/vulnerabilities';

export const ViewAdvisoryPage: React.FC = () => {
  const { advisoryId } = useParams();

  const { result: advisory, isFetching } = useAdvisoryById(advisoryId || '');

  const overviewRef = React.createRef<HTMLElement>();
  const notesRef = React.createRef<HTMLElement>();
  const vulnerabilitiesRef = React.createRef<HTMLElement>();
  const sourcRef = React.createRef<HTMLElement>();

  return (
    <>
      <PageSection type='breadcrumb'>
        <Breadcrumb>
          <BreadcrumbItem>
            <NavLink to={formatPath(Paths.advisory)}>Advisories</NavLink>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Details</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component='h1'>{advisoryId}</Text>
          <Text component='p'>{advisory?.document.title}</Text>
        </TextContent>
      </PageSection>
      <PageSection type='tabs'>
        <Tabs defaultActiveKey={0} inset={{ default: 'insetLg' }}>
          <Tab
            eventKey={0}
            title={<TabTitleText>Overview</TabTitleText>}
            tabContentRef={overviewRef}
          />
          <Tab
            eventKey={1}
            title={<TabTitleText>Notes</TabTitleText>}
            tabContentRef={notesRef}
          />
          <Tab
            eventKey={2}
            title={<TabTitleText>Vulnerabilities</TabTitleText>}
            tabContentRef={vulnerabilitiesRef}
          />
          <Tab
            eventKey={3}
            title={<TabTitleText>Source</TabTitleText>}
            tabContentRef={sourcRef}
          />
        </Tabs>
      </PageSection>
      <PageSection>
        <TabContent
          eventKey={0}
          id='overview'
          ref={overviewRef}
          aria-label='This is content for the overview section'
        >
          {advisory && <Overview advisoryDetails={advisory} />}
        </TabContent>
        <TabContent
          eventKey={1}
          id='notes'
          ref={notesRef}
          aria-label='This is content for the notes section'
          hidden
        >
          {advisory && <Notes advisoryDetails={advisory} />}
        </TabContent>
        <TabContent
          eventKey={2}
          id='vulnerabilities'
          ref={vulnerabilitiesRef}
          aria-label='This is content for the vulnerabilities section'
          hidden
        >
          {advisory && <Vulnerabilities advisoryDetails={advisory} />}
        </TabContent>
        <TabContent
          eventKey={3}
          id='sourc'
          ref={sourcRef}
          aria-label='This is content for the source section'
          hidden
        >
          {advisory && <Source advisoryDetails={advisory} />}
        </TabContent>
      </PageSection>
    </>
  );
};

export default ViewAdvisoryPage;
