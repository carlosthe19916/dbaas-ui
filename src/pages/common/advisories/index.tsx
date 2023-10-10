/* eslint react/prop-types: 0 */
import {
  Button,
  PageSection,
  PageSectionVariants,
  Stack,
  StackItem,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import DownloadIcon from '@patternfly/react-icons/dist/esm/icons/download-icon';
import spacing from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import {
  ExpandableRowContent,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Advisory } from 'src/api/models';
import {
  FilterCategory,
  FilterToolbar,
  FilterType,
} from 'src/components/FilterToolbar';
import { SimplePagination } from 'src/components/SimplePagination';
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from 'src/components/TableControls';
import {
  getApiRequestParams,
  useTableControlProps,
} from 'src/hooks/table-controls';
import { useTableControlUrlParams } from 'src/hooks/table-controls';
import { useSelectionState } from 'src/hooks/useSelectionState';
import { Paths, formatPath } from 'src/paths';
import { useFetchAdvisories } from 'src/queries/advisories';
import { AdvisoryDetails } from './components/details';
import { Severity } from './components/severity';

export const AdvisoriesPage: React.FC = () => {
  const filterCategories: FilterCategory<
    Advisory,
    'q' | 'severity' | 'product'
  >[] = [
    {
      key: 'q',
      title: 'Q',
      type: FilterType.search,
      placeholderText: 'Search',
    },
    {
      key: 'severity',
      title: 'Severities',
      placeholderText: 'Severity',
      type: FilterType.multiselect,
      selectOptions: [
        { key: 'low', value: 'Low' },
        { key: 'moderate', value: 'Moderate' },
        { key: 'important', value: 'Important' },
        { key: 'critital', value: 'Critical' },
      ],
    },
    {
      key: 'product',
      title: 'Product',
      placeholderText: 'Product',
      type: FilterType.multiselect,
      selectOptions: [
        { key: 'rhel7', value: 'Red Hat Enterprise Linux 7' },
        { key: 'rhel8', value: 'Red Hat Enterprise Linux 8' },
        { key: 'rhel8', value: 'Red Hat Enterprise Linux 9' },
        { key: 'ocp3', value: 'OpenShift Container Platform 3' },
        { key: 'ocp4', value: 'OpenShift Container Platform 4' },
      ],
    },
  ];

  const tableControlState = useTableControlUrlParams({
    columnNames: {
      id: 'Id',
      title: 'Title',
      severity: 'Severity',
      revision: 'Revision',
      download: 'Download',
      vulnerabilities: 'Vulnerabilities',
    },
    sortableColumns: [],
    initialSort: null,
    filterCategories,
    initialItemsPerPage: 10,
    expandableVariant: 'single',
  });

  const {
    result: { data: currentPageItems, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchAdvisories(
    getApiRequestParams({
      ...tableControlState, // Includes filterState, sortState and paginationState
    }),
  );

  const tableControls = useTableControlProps({
    ...tableControlState, // Includes filterState, sortState and paginationState
    idProperty: 'id',
    currentPageItems,
    totalItemCount,
    isLoading: isFetching,
    selectionState: useSelectionState({
      items: currentPageItems,
      isEqual: (a, b) => a.id === b.id,
    }),
  });

  const {
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

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component='h1'>Advisories</Text>
          <Text component='p'>Search security advisories</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <div
          style={{
            backgroundColor: 'var(--pf-global--BackgroundColor--100)',
          }}
        >
          <Toolbar {...toolbarProps}>
            <ToolbarContent>
              <FilterToolbar {...filterToolbarProps} showFiltersSideBySide />
              <ToolbarItem {...paginationToolbarItemProps}>
                <SimplePagination
                  idPrefix='advisories-table'
                  isTop
                  paginationProps={paginationProps}
                />
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>

          <Table {...tableProps} aria-label='Advisories table'>
            <Thead>
              <Tr>
                <TableHeaderContentWithControls {...tableControls}>
                  <Th {...getThProps({ columnKey: 'id' })} />
                  <Th {...getThProps({ columnKey: 'title' })} />
                  <Th {...getThProps({ columnKey: 'severity' })} />
                  <Th {...getThProps({ columnKey: 'revision' })} />
                  <Th {...getThProps({ columnKey: 'download' })} />
                  <Th {...getThProps({ columnKey: 'vulnerabilities' })} />
                </TableHeaderContentWithControls>
              </Tr>
            </Thead>
            <ConditionalTableBody
              isLoading={isFetching}
              isError={!!fetchError}
              isNoData={totalItemCount === 0}
              numRenderedColumns={numRenderedColumns}
            >
              {currentPageItems?.map((item, rowIndex) => {
                return (
                  <Tbody key={item.id} isExpanded={isCellExpanded(item)}>
                    <Tr>
                      <TableRowContentWithControls
                        {...tableControls}
                        item={item}
                        rowIndex={rowIndex}
                      >
                        <Td width={15} {...getTdProps({ columnKey: 'id' })}>
                          <NavLink
                            to={formatPath(Paths.advisoryEdit, {
                              advisoryId: item.id,
                            })}
                          >
                            {item.id}
                          </NavLink>
                        </Td>
                        <Td
                          width={45}
                          modifier='truncate'
                          {...getTdProps({ columnKey: 'title' })}
                        >
                          {item.title}
                        </Td>
                        <Td {...getTdProps({ columnKey: 'severity' })}>
                          <Severity advisory={item} />
                        </Td>
                        <Td {...getTdProps({ columnKey: 'revision' })}>
                          {item.date}
                        </Td>
                        <Td {...getTdProps({ columnKey: 'download' })}>
                          <Button
                            variant='plain'
                            icon={<DownloadIcon />}
                            component='a'
                            href={item.href}
                            target='_blank'
                          />
                        </Td>
                        <Td {...getTdProps({ columnKey: 'download' })}>
                          {item.cves.length ?? 'N/A'}
                        </Td>
                      </TableRowContentWithControls>
                    </Tr>
                    {isCellExpanded(item) ? (
                      <Tr isExpanded>
                        <Td />
                        <Td
                          {...getExpandedContentTdProps({ item })}
                          className={spacing.pyLg}
                        >
                          <ExpandableRowContent>
                            <Stack hasGutter>
                              <StackItem>{item.desc}</StackItem>
                              <StackItem>
                                <AdvisoryDetails advisory={item} />
                              </StackItem>
                            </Stack>
                          </ExpandableRowContent>
                        </Td>
                      </Tr>
                    ) : null}
                  </Tbody>
                );
              })}
            </ConditionalTableBody>
          </Table>

          <SimplePagination
            idPrefix='advisories-table'
            isTop={false}
            paginationProps={paginationProps}
          />
        </div>
      </PageSection>
    </>
  );
};

export default AdvisoriesPage;
