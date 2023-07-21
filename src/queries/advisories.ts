import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Advisory, ApiPaginatedResult, ApiRequestParams } from 'src/api/models';
import { getAdvisories, getAdvisoryById } from 'src/api/rest';
import { serializeRequestParamsForApi } from 'src/hooks/table-controls';

export interface IAdvisoriesFetchState {
  result: ApiPaginatedResult<Advisory>;
  isFetching: boolean;
  fetchError: unknown;
  refetch: () => void;
}

export const AdvisoriesQueryKey = 'advisories';

export const useFetchAdvisories = (params: ApiRequestParams = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      AdvisoriesQueryKey,
      serializeRequestParamsForApi(params).toString(),
    ],
    queryFn: async () => await getAdvisories(params),
    onError: (error) => {
      console.log('error, ', error);
    },
    keepPreviousData: true,
  });
  return {
    result: data || { data: [], total: 0, params },
    isFetching: isLoading,
    fetchError: error,
    refetch,
  };
};

export const useAdvisoryById = (id: string) => {
  const { data, isLoading, error } = useQuery(
    [AdvisoriesQueryKey, id],
    async () => (await getAdvisoryById(id)).data,
    { onError: (error) => console.log(error) },
  );

  return {
    result: data,
    isFetching: isLoading,
    fetchError: error as AxiosError,
  };
};
