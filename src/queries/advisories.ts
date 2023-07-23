import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AdvisoryAPI } from 'src/api/advisory';
import { Advisory, ApiPaginatedResult, ApiRequestParams } from 'src/api/models';
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
    queryFn: async () => await AdvisoryAPI.search(params),
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
    async () => (await AdvisoryAPI.get(id)).data,
    { onError: (error) => console.log(error) },
  );

  return {
    result: data,
    isFetching: isLoading,
    fetchError: error as AxiosError,
  };
};
