import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiPaginatedResult, ApiRequestParams, Package } from 'src/api/models';
import { PackageAPI } from 'src/api/package';
import { serializeRequestParamsForApi } from 'src/hooks/table-controls';

export interface IPackagesFetchState {
  result: ApiPaginatedResult<Package>;
  isFetching: boolean;
  fetchError: unknown;
  refetch: () => void;
}

export const PackagesQueryKey = 'packages';

export const useFetchPackages = (params: ApiRequestParams = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      PackagesQueryKey,
      serializeRequestParamsForApi(params).toString(),
    ],
    queryFn: async () => await PackageAPI.search(params),
    onError: (error) => console.log('error, ', error),
    keepPreviousData: true,
  });
  return {
    result: data || { data: [], total: 0, params },
    isFetching: isLoading,
    fetchError: error,
    refetch,
  };
};

export const usePackageById = (id: string) => {
  const { data, isLoading, error } = useQuery(
    [PackagesQueryKey, id],
    async () => (await PackageAPI.get(id)).data,
    { onError: (error) => console.log(error) },
  );

  return {
    result: data,
    isFetching: isLoading,
    fetchError: error as AxiosError,
  };
};
