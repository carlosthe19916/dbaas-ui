import * as React from 'react';
import { parseMaybeNumericString } from 'src/utilities/utils';
import { useUrlParams } from '../../useUrlParams';
import { IExtraArgsForURLParamHooks } from '../types';

export interface IActiveRowState {
  activeRowId: string | number | null;
  setActiveRowId: (id: string | number | null) => void;
}

export const useActiveRowState = (): IActiveRowState => {
  const [activeRowId, setActiveRowId] = React.useState<string | number | null>(
    null,
  );
  return { activeRowId, setActiveRowId };
};

export const useActiveRowUrlParams = <
  TURLParamKeyPrefix extends string = string,
>({
  urlParamKeyPrefix,
}: IExtraArgsForURLParamHooks<TURLParamKeyPrefix> = {}): IActiveRowState => {
  const [activeRowId, setActiveRowId] = useUrlParams({
    keyPrefix: urlParamKeyPrefix,
    keys: ['activeRow'],
    defaultValue: null as string | number | null,
    serialize: (activeRowId) => ({
      activeRow: activeRowId !== null ? String(activeRowId) : null,
    }),
    deserialize: ({ activeRow }) => parseMaybeNumericString(activeRow),
  });
  return { activeRowId, setActiveRowId };
};
