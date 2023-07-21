import { useSelectionState } from 'src/hooks/useSelectionState';
import { useActiveRowState } from './active-row';
import { useExpansionState } from './expansion';
import { getLocalFilterDerivedState, useFilterState } from './filtering';
import {
  getLocalPaginationDerivedState,
  usePaginationState,
} from './pagination';
import { getLocalSortDerivedState, useSortState } from './sorting';
import {
  IUseLocalTableControlStateArgs,
  IUseTableControlPropsArgs,
} from './types';

export const useLocalTableControlState = <
  TItem,
  TColumnKey extends string,
  TSortableColumnKey extends TColumnKey,
>(
  args: IUseLocalTableControlStateArgs<TItem, TColumnKey, TSortableColumnKey>,
): IUseTableControlPropsArgs<TItem, TColumnKey, TSortableColumnKey> => {
  const {
    items,
    filterCategories = [],
    sortableColumns = [],
    getSortValues,
    initialSort = null,
    hasPagination = true,
    initialItemsPerPage = 10,
    idProperty,
    initialSelected,
    isItemSelectable,
  } = args;

  const filterState = useFilterState(args);
  const { filteredItems } = getLocalFilterDerivedState({
    items,
    filterCategories,
    filterState,
  });

  const selectionState = useSelectionState({
    items: filteredItems,
    isEqual: (a, b) => a[idProperty] === b[idProperty],
    initialSelected,
    isItemSelectable,
  });

  const sortState = useSortState({ sortableColumns, initialSort });
  const { sortedItems } = getLocalSortDerivedState({
    sortState,
    items: filteredItems,
    getSortValues,
  });

  const paginationState = usePaginationState({
    initialItemsPerPage,
  });
  const { currentPageItems } = getLocalPaginationDerivedState({
    paginationState,
    items: sortedItems,
  });

  const expansionState = useExpansionState<TColumnKey>();

  const activeRowState = useActiveRowState();

  return {
    ...args,
    filterState,
    expansionState,
    selectionState,
    sortState,
    paginationState,
    activeRowState,
    totalItemCount: items.length,
    currentPageItems: hasPagination ? currentPageItems : sortedItems,
  };
};
