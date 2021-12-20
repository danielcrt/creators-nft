import useSWRInfinite from 'swr/infinite'
import { fetcher } from '../utils/fetcher';
import { Transfer } from '../../../types';
import { ApiResponse } from '../../../types/ApiResponse';
import { Dictionary } from '../../../types/Dictionary';
import qs from 'qs';

const resourceUrl = 'transfers';

export const usePaginateTransfers = (filters: Dictionary<any> = {}, pageLimit: number = 50) => {
  const { data, error, size, setSize } = useSWRInfinite<ApiResponse<Transfer[]>>(
    (index: number) => {
      const query = qs.stringify({
        filters: filters !== {} ? JSON.stringify(filters) : '',
        limit: pageLimit,
        page: index + 1,
        order: 'created_at:desc'
      });
      return `${resourceUrl}?${query}`;
    },
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  const emptyArray: Transfer[] = [];

  const transfers = data ? emptyArray.concat(...getDataArraysFromPages(data)) : [];
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[0]?.data.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.length < pageLimit)

  return { transfers, error, isLoadingMore, size, setSize, isReachingEnd }
}

function getDataArraysFromPages(data: ApiResponse<Transfer[]>[]): Transfer[][] {
  return data.map(value => value.data);
}