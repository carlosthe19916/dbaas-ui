import {
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FilterToolbar, FilterType } from 'src/components/FilterToolbar';
import { SimplePagination } from 'src/components/SimplePagination';
import {
  ConditionalTableBody,
  TableHeaderContentWithControls,
  TableRowContentWithControls,
} from 'src/components/TableControls';
import { TableURLParamKeyPrefix } from 'src/constants';
import {
  getApiRequestParams,
  useTableControlProps,
  useTableControlUrlParams,
} from 'src/hooks/table-controls';
import { useSelectionState } from 'src/hooks/useSelectionState';
import { useFetchProducts } from 'src/queries/products';

export const Organizations: React.FC = () => {
  // Search
  const tableControlState = useTableControlUrlParams({
    urlParamKeyPrefix: TableURLParamKeyPrefix.products,
    columnNames: {
      name: 'Name',
      version: 'Version',
      supplier: 'Supplier',
      createdOn: 'Created on',
      packagesCount: 'Dependencies',
      advisoriesCount: 'Advisories',
    },
    sortableColumns: ['name'],
    initialSort: { columnKey: 'name', direction: 'asc' },
    filterCategories: [
      {
        key: 'q',
        title: 'Name',
        type: FilterType.search,
        placeholderText: 'Filter by name...',
        getServerFilterValue: (value) => (value ? [`*${value[0]}*`] : []),
      },
    ],
    initialItemsPerPage: 10,
  });

  const {
    result: { data: currentPageRepositories, total: totalItemCount },
    isFetching,
    fetchError,
    refetch: refetchProducts,
  } = useFetchProducts(
    getApiRequestParams({
      ...tableControlState,
      apiSortFieldKeys: {
        name: 'name',
      },
    }),
  );

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: 'id',
    currentPageItems: currentPageRepositories,
    totalItemCount,
    isLoading: isFetching,
    // TODO FIXME - we don't need selectionState but it's required by this hook?
    selectionState: useSelectionState({
      items: currentPageRepositories,
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
    },
  } = tableControls;

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component='h1'>Products</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <div
          style={{
            backgroundColor: 'var(--pf-v5-global--BackgroundColor--100)',
          }}
        >
          <Toolbar {...toolbarProps}>
            <ToolbarContent>
              <FilterToolbar {...filterToolbarProps} />
              {/* <ToolbarGroup variant='button-group'>
                <ToolbarItem>
                  <Button
                    type='button'
                    id='create-organization'
                    aria-label='Create new organization'
                    variant={ButtonVariant.primary}
                    onClick={() => setCreateUpdateModalState('create')}
                  >
                    Create Organization
                  </Button>
                </ToolbarItem>
              </ToolbarGroup> */}
              <ToolbarItem {...paginationToolbarItemProps}>
                <SimplePagination
                  idPrefix='products-table'
                  isTop
                  paginationProps={paginationProps}
                />
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>

          <Table {...tableProps} aria-label='Organizations table'>
            <Thead>
              <Tr>
                <TableHeaderContentWithControls {...tableControls}>
                  <Th {...getThProps({ columnKey: 'name' })} />
                  <Th {...getThProps({ columnKey: 'version' })} />
                </TableHeaderContentWithControls>
              </Tr>
            </Thead>
            <ConditionalTableBody
              isLoading={isFetching}
              isError={!!fetchError}
              isNoData={totalItemCount === 0}
              numRenderedColumns={numRenderedColumns}
            >
              <Tbody>
                {currentPageRepositories?.map((repository, rowIndex) => {
                  return (
                    <Tr key={repository.id}>
                      <TableRowContentWithControls
                        {...tableControls}
                        item={repository}
                        rowIndex={rowIndex}
                      >
                        <Td {...getTdProps({ columnKey: 'name' })}>
                          <NavLink to={`/repositories/${repository.id}`}>
                            {repository.name}
                          </NavLink>
                        </Td>
                        <Td
                          modifier='truncate'
                          {...getTdProps({ columnKey: 'version' })}
                        >
                          {repository.version}
                        </Td>
                        <Td
                          modifier='truncate'
                          {...getTdProps({ columnKey: 'supplier' })}
                        >
                          {repository.supplier}
                        </Td>
                        <Td
                          modifier='truncate'
                          {...getTdProps({ columnKey: 'createdOn' })}
                        >
                          {repository.createdOn}
                        </Td>
                        <Td
                          modifier='truncate'
                          {...getTdProps({ columnKey: 'packagesCount' })}
                        >
                          {repository.packagesCount}
                        </Td>
                        <Td
                          modifier='truncate'
                          {...getTdProps({ columnKey: 'advisoriesCount' })}
                        >
                          {repository.advisoriesCount}
                        </Td>
                      </TableRowContentWithControls>
                    </Tr>
                  );
                })}
              </Tbody>
            </ConditionalTableBody>
          </Table>

          <SimplePagination
            idPrefix='organizations-table'
            isTop={false}
            paginationProps={paginationProps}
          />
        </div>
      </PageSection>
    </>
  );
};
