import {
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  EmptyState,
  Grid,
  GridItem,
  Label,
  List,
  ListItem,
  Stack,
  StackItem,
  Tooltip,
  TreeView,
  TreeViewDataItem,
} from '@patternfly/react-core';
import spacing from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import {
  ExpandableRowContent,
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import React from 'react';
import { AdvisoryDetails } from 'src/api/models';
import { ScoresLabel } from 'src/components/ScoresLabel/ScoresLabel';
import { SimplePagination } from 'src/components/SimplePagination';
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from 'src/components/TableControls';
import { useLocalTableControls } from 'src/hooks/table-controls';

interface VulnerabilitiesProps {
  advisoryDetails: AdvisoryDetails;
}

export const Vulnerabilities: React.FC<VulnerabilitiesProps> = ({
  advisoryDetails,
}) => {
  const tableControls = useLocalTableControls({
    idProperty: 'cve',
    items: advisoryDetails.vulnerabilities,
    columnNames: {
      name: 'CVE',
      title: 'Title',
      discovery: 'Discovery',
      release: 'Release',
      score: 'Score',
      cwe: 'CWE',
    },
    expandableVariant: 'single',
    hasActionsColumn: true,
    filterCategories: [],
    sortableColumns: ['title'],
    getSortValues: (item) => ({
      title: item?.title || '',
    }),
    initialSort: { columnKey: 'title', direction: 'asc' },
    hasPagination: true,
    isLoading: false,
  });

  const {
    currentPageItems,
    numRenderedColumns,
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
      tableProps,
      getThProps,
      getTdProps,
      getExpandedContentTdProps,
    },
    expansionDerivedState: { isCellExpanded },
  } = tableControls;

  const branchToTreeViewDataItem = (product_status: {
    [k: string]: string[];
  }) => {
    return Object.entries(product_status).map(([status, values]) => {
      let result: TreeViewDataItem = {
        name: status,
        children: values.map((v) => {
          const a: TreeViewDataItem = {
            name: v,
          };
          return a;
        }),
        defaultExpanded: false,
      };
      return result;
    });
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--pf-global--BackgroundColor--100)',
      }}
    >
      <TableComposable
        {...tableProps}
        isExpandable
        aria-label='Vulnerabilities table'
      >
        <Thead>
          <Tr>
            <TableHeaderContentWithControls {...tableControls}>
              <Th {...getThProps({ columnKey: 'name' })} />
              <Th {...getThProps({ columnKey: 'title' })} />
              <Th {...getThProps({ columnKey: 'discovery' })} />
              <Th {...getThProps({ columnKey: 'release' })} />
              <Th {...getThProps({ columnKey: 'score' })} />
              <Th {...getThProps({ columnKey: 'cwe' })} />
            </TableHeaderContentWithControls>
          </Tr>
        </Thead>
        <ConditionalTableBody
          isLoading={false}
          isError={false}
          isNoData={currentPageItems.length === 0}
          numRenderedColumns={numRenderedColumns}
        >
          {currentPageItems?.map((item, rowIndex) => {
            return (
              <Tbody key={item.title} isExpanded={isCellExpanded(item)}>
                <Tr>
                  <TableRowContentWithControls
                    {...tableControls}
                    item={item}
                    rowIndex={rowIndex}
                  >
                    <Td {...getTdProps({ columnKey: 'name' })}>{item.cve}</Td>
                    <Td {...getTdProps({ columnKey: 'title' })}>
                      {item.title}
                    </Td>
                    <Td {...getTdProps({ columnKey: 'discovery' })}>
                      {item.discovery_date}
                    </Td>
                    <Td {...getTdProps({ columnKey: 'release' })}>
                      {item.release_date}
                    </Td>
                    <Td {...getTdProps({ columnKey: 'score' })}>
                      <ScoresLabel scores={item.scores} />
                    </Td>
                    <Td>
                      {item.cwe ? (
                        <Tooltip content={item.cwe.name}>
                          <span>{item.cwe.id}</span>
                        </Tooltip>
                      ) : (
                        'N/A'
                      )}
                    </Td>
                  </TableRowContentWithControls>
                </Tr>
                {isCellExpanded(item) ? (
                  <Tr isExpanded>
                    <Td />
                    <Td
                      {...getExpandedContentTdProps({ item: item })}
                      className={spacing.pyLg}
                    >
                      <ExpandableRowContent>
                        <Grid hasGutter>
                          <GridItem md={6}>
                            <Stack hasGutter>
                              <StackItem>
                                <Card isCompact isPlain>
                                  <CardTitle>IDs</CardTitle>
                                  <CardBody>
                                    <List>
                                      {item.ids.map((e, index) => (
                                        <ListItem key={index}>
                                          {e.text}({e.system_name})
                                        </ListItem>
                                      ))}
                                    </List>
                                  </CardBody>
                                </Card>
                              </StackItem>
                              <StackItem>
                                <Card isCompact isPlain>
                                  <CardTitle>Product status</CardTitle>
                                  <CardBody>
                                    <TreeView
                                      hasGuides
                                      variant='compactNoBackground'
                                      data={branchToTreeViewDataItem(
                                        item.product_status,
                                      )}
                                    />
                                  </CardBody>
                                </Card>
                              </StackItem>
                            </Stack>
                          </GridItem>
                          <GridItem md={6}>
                            <Stack hasGutter>
                              <StackItem>
                                <Card isCompact isPlain>
                                  <CardTitle>References</CardTitle>
                                  <CardBody>
                                    <List>
                                      {item.references.map((e, index) => (
                                        <ListItem key={index}>
                                          <a href={e.url} target='_blank'>
                                            {e.summary}{' '}
                                            <Label color='blue'>
                                              {e.category}
                                            </Label>
                                          </a>
                                        </ListItem>
                                      ))}
                                    </List>
                                  </CardBody>
                                </Card>
                              </StackItem>
                              <StackItem>
                                <Card isCompact isPlain>
                                  <CardTitle>Notes</CardTitle>
                                  <CardBody>
                                    <DescriptionList>
                                      {item.notes.map((e, index) => (
                                        <DescriptionListGroup key={index}>
                                          <DescriptionListTerm>
                                            {e.title}{' '}
                                            <Label color='blue'>
                                              {e.category}
                                            </Label>
                                          </DescriptionListTerm>
                                          <DescriptionListDescription>
                                            {e.text}
                                          </DescriptionListDescription>
                                        </DescriptionListGroup>
                                      ))}
                                    </DescriptionList>
                                  </CardBody>
                                </Card>
                              </StackItem>
                            </Stack>
                          </GridItem>
                        </Grid>
                      </ExpandableRowContent>
                    </Td>
                  </Tr>
                ) : null}
              </Tbody>
            );
          })}
        </ConditionalTableBody>
      </TableComposable>
      <SimplePagination
        idPrefix='vulnerabilities-table'
        isTop={false}
        paginationProps={paginationProps}
      />
    </div>
  );
};
