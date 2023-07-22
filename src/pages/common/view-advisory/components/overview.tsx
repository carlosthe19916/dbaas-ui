import {
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Label,
  List,
  ListItem,
  Stack,
  StackItem,
  TreeView,
  TreeViewDataItem,
} from '@patternfly/react-core';
import ShieldVirus from '@patternfly/react-icons/dist/esm/icons/shield-virus-icon';
import React from 'react';
import { AdvisoryCategory, AdvisoryDetails, Branch } from 'src/api/models';
import { Severity } from 'src/components/Severity';

type AdvisoryCategoryListType = {
  [key in AdvisoryCategory]: {
    name: string;
  };
};
const advisoryCategoryList: AdvisoryCategoryListType = {
  csaf_base: {
    name: 'Base',
  },
  csaf_security_advisory: {
    name: 'Advisory',
  },
  csaf_vex: {
    name: 'Vex',
  },
};

interface OverviewProps {
  advisoryDetails: AdvisoryDetails;
}

export const Overview: React.FC<OverviewProps> = ({ advisoryDetails }) => {
  const category =
    advisoryCategoryList[advisoryDetails.document.category as AdvisoryCategory];

  const branchToTreeViewDataItem = (branches: Branch[], level: number = 0) => {
    return branches.map((branch) => {
      let result: TreeViewDataItem = {
        id: branch.name,
        name: (
          <Flex>
            <FlexItem spacer={{ default: 'spacerSm' }}>{branch.name}</FlexItem>
            <FlexItem>
              <Label variant='outline' color='blue' isCompact>
                {branch.category}
              </Label>
            </FlexItem>
          </Flex>
        ),
        children: branch.branches
          ? branchToTreeViewDataItem(branch.branches, level + 1)
          : undefined,
        defaultExpanded: level < 1,
      };
      return result;
    });
  };

  return (
    <Stack hasGutter>
      <StackItem>
        <Card>
          <CardBody>
            <Flex spaceItems={{ default: 'spaceItemsXl' }}>
              <FlexItem flex={{ default: 'flex_1' }}>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Category</DescriptionListTerm>
                    <DescriptionListDescription>
                      {category
                        ? category.name
                        : advisoryDetails.document.category}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </FlexItem>
              <Divider orientation={{ default: 'vertical' }} />
              <FlexItem flex={{ default: 'flex_1' }}>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>
                      Aggregate severity
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <Severity
                        severity={
                          advisoryDetails.document.aggregate_severity.text
                        }
                      />
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </FlexItem>
              <Divider orientation={{ default: 'vertical' }} />
              <FlexItem flex={{ default: 'flex_1' }}>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Size</DescriptionListTerm>
                    <DescriptionListDescription>a</DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </FlexItem>
              <Divider orientation={{ default: 'vertical' }} />
              <FlexItem flex={{ default: 'flex_1' }}>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Vulnerabilities</DescriptionListTerm>
                    <DescriptionListDescription>
                      <ShieldVirus /> {advisoryDetails.vulnerabilities.length}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </FlexItem>
            </Flex>
          </CardBody>
        </Card>
      </StackItem>
      <StackItem>
        <Grid hasGutter>
          <GridItem md={6}>
            <Grid hasGutter>
              <GridItem md={6}>
                <Card isFullHeight>
                  <CardTitle>Publisher</CardTitle>
                  <CardBody>
                    <DescriptionList>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Name</DescriptionListTerm>
                        <DescriptionListDescription>
                          {advisoryDetails.document.publisher.name}{' '}
                          <Label color='blue'>
                            {advisoryDetails.document.publisher.category}
                          </Label>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Namespace</DescriptionListTerm>
                        <DescriptionListDescription>
                          {advisoryDetails.document.publisher.namespace}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          Issuing Authority
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {advisoryDetails.document.publisher.issuing_authority}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem md={6}>
                <Card isFullHeight>
                  <CardTitle>Tracking</CardTitle>
                  <CardBody>
                    <DescriptionList>
                      <DescriptionListGroup>
                        <DescriptionListTerm>ID</DescriptionListTerm>
                        <DescriptionListDescription>
                          {advisoryDetails.document.tracking.id}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Status</DescriptionListTerm>
                        <DescriptionListDescription>
                          {advisoryDetails.document.tracking.status}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          Initial release date
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {
                            advisoryDetails.document.tracking
                              .initial_release_date
                          }
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          Current release date
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {
                            advisoryDetails.document.tracking
                              .current_release_date
                          }
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem md={12}>
                <Card isFullHeight>
                  <CardTitle>References</CardTitle>
                  <CardBody>
                    <List>
                      {advisoryDetails.document.references.map((e, index) => (
                        <ListItem key={index}>
                          <a href={e.url} target='_blank'>
                            {e.summary}
                          </a>{' '}
                          <Label color='blue'>{e.category}</Label>
                        </ListItem>
                      ))}
                    </List>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem md={6}>
            <Card isFullHeight>
              <CardTitle>Product info</CardTitle>
              <CardBody>
                <TreeView
                  hasGuides
                  variant='default'
                  data={branchToTreeViewDataItem(
                    advisoryDetails.product_tree.branches,
                  )}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </StackItem>
    </Stack>
  );
};
