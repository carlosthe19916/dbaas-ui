import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiPaginatedResponseToApiPaginatedResult } from 'src/api/base';
import { ApiPaginatedResult, ApiRequestParams, Package } from 'src/api/models';
import { ProductAPI } from 'src/api/product';
import { serializeRequestParamsForApi } from 'src/hooks/table-controls';
import { useMockableQuery } from './helpers';
import { MOCK_PRODUCTS } from './mocks/products.mock';

export interface IPackagesFetchState {
  result: ApiPaginatedResult<Package>;
  isFetching: boolean;
  fetchError: unknown;
  refetch: () => void;
}

export const ProductsQueryKey = 'products';

export const useFetchProducts = (params: ApiRequestParams = {}) => {
  const { data, isLoading, error, refetch } = useMockableQuery(
    {
      queryKey: [
        ProductsQueryKey,
        serializeRequestParamsForApi(params).toString(),
      ],
      queryFn: async () => await ProductAPI.search(params),
      onError: (error) => console.log('error, ', error),
      keepPreviousData: true,
    },
    apiPaginatedResponseToApiPaginatedResult(MOCK_PRODUCTS, params),
  );
  return {
    result: data || { data: [], total: 0, params },
    isFetching: isLoading,
    fetchError: error,
    refetch,
  };
};

// export const usePackageById = (id: string) => {
//   const { data, isLoading, error } = useQuery(
//     [ProductsQueryKey, id],
//     async () => (await PackageAPI.get(id)).data,
//     { onError: (error) => console.log(error) },
//   );

//   return {
//     result: data,
//     isFetching: isLoading,
//     fetchError: error as AxiosError,
//   };
// };
