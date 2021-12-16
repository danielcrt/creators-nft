import useSWRInfinite from 'swr/infinite'
import { fetcher } from '../utils/fetcher';
import resolve from '../utils/resolve';
import useSWR from 'swr';
import api from '../api';

const resourceUrl = 'assets';

export type CollectionResponse = {
  id: string;
  name: string;
  address: string;
  standard: string;
  created_at: string;
  updated_at: string;
}

export type AssetResponse = {
  id: string;
  token_id: string;
  collecion: CollectionResponse;
  name: string;
  description: string;
  owner: string;
  created_at: string;
  updated_at: string;
}

export const getAsset = (id: string, parameters: Array<any> = []) => {
  const { data: asset, error } = useSWR(resourceUrl + id, fetcher, { shouldRetryOnError: false });
  return { asset, error };
}

export const createAsset = async (parameters: Array<any>) => {
  return await resolve(api.post(resourceUrl, parameters).then(res => res.data));
}

export const editAsset = async (id: string, parameters: Array<any>) => {
  return await resolve(api.patch(resourceUrl + id, parameters).then(res => res.data));
}

export const deleteAsset = async (id: string) => {
  return await resolve(api.delete(resourceUrl).then(res => res.data));
}

export const usePaginateAssets = (pageLimit: number = 50) => {

  const { data, error, size, setSize } = useSWRInfinite(
    (index: number) => `${resourceUrl}?page=${index + 1}&limit=${pageLimit}`,
    fetcher,
    { shouldRetryOnError: false }
  )

  const assets = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.length < pageLimit)

  return { assets, error, isLoadingMore, size, setSize, isReachingEnd }
}