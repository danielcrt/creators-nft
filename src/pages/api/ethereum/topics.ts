import useSWRInfinite from 'swr/infinite'
import { fetcher } from '../utils/fetcher';
import { ApiResponse } from '../../../types/ApiResponse';
import { Dictionary } from '../../../types/Dictionary';
import qs from 'qs';
import { EthereumTopic } from '../../../types/Topic';

const resourceUrl = 'ethereum-topics';

export const usePaginateTopics = (filters: Dictionary<any> = {}, pageLimit: number = 50) => {
  const { data, error, size, setSize } = useSWRInfinite<ApiResponse<EthereumTopic[]>>(
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

  const emptyArray: EthereumTopic[] = [];

  const topics = data ? emptyArray.concat(...getDataArraysFromPages(data)) : [];
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[0]?.data.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.length < pageLimit)

  return { topics, error, isLoadingMore, size, setSize, isReachingEnd }
}

function getDataArraysFromPages(data: ApiResponse<EthereumTopic[]>[]): EthereumTopic[][] {
  return data.map(value => value.data);
}