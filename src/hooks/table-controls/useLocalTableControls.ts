import { IUseLocalTableControlStateArgs } from './types';
import { useLocalTableControlState } from './useLocalTableControlState';
import { useTableControlProps } from './useTableControlProps';

export const useLocalTableControls = <
  TItem,
  TColumnKey extends string,
  TSortableColumnKey extends TColumnKey,
>(
  args: IUseLocalTableControlStateArgs<TItem, TColumnKey, TSortableColumnKey>,
) => useTableControlProps(useLocalTableControlState(args));
