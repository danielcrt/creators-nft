import useSWRInfinite from 'swr/infinite'
import { fetcher } from '../utils/fetcher';
import axios from 'axios';
import resolve from '../utils/resolve';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/';
const resourceUrl = baseUrl + 'assets/';

export const getAsset = async (id: string, parameters: Array<any>) => {
  return await resolve(axios.get(resourceUrl + id).then(res => res.data));
}

export const createAsset = async (parameters: Array<any>) => {
  return await resolve(axios.post(resourceUrl, parameters).then(res => res.data));
}

export const editAsset = async (id: string, parameters: Array<any>) => {
  return await resolve(axios.patch(resourceUrl + id, parameters).then(res => res.data));
}

export const deleteAsset = async (id: string) => {
  return await resolve(axios.delete(resourceUrl).then(res => res.data));
}

export const usePaginateAssets = (pageLimit: number = 50) => {

  const { data, error, size, setSize } = useSWRInfinite(
    (index: number) => `${resourceUrl}?page=${index + 1}&limit=${pageLimit}`,
    fetcher
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