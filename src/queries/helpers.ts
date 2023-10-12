import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useMockData } from 'src/constants';

const defaultTimeout = 1000;

const mockPromise = <TQueryFnData>(
  data: TQueryFnData,
  timeout = defaultTimeout,
  success = true,
) => {
  return new Promise<TQueryFnData>((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });
};

export const useMockableQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(
  params: UseQueryOptions<TQueryFnData, TError, TData>,
  mockData: TQueryFnData,
) => {
  return useQuery<TQueryFnData, TError, TData>({
    ...params,
    queryFn: !useMockData()
      ? params.queryFn
      : () => {
          return mockPromise(mockData);
        },
  });
};
