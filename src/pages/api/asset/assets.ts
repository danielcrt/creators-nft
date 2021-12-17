import useSWRInfinite from 'swr/infinite'
import { fetcher } from '../utils/fetcher';
import resolve from '../utils/resolve';
import useSWR from 'swr';
import api from '../api';
import { Asset } from '../../../types';
import { ApiResponse } from '../../../types/ApiResponse';
import { Dictionary } from '../../../types/Dictionary';

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

export type CreateAssetRequest = {
  name: string;
  description: string;
  media: File | undefined;
}

export const getAsset = (id: string, parameters: Array<any> = []) => {
  const { data: asset, error, mutate } = useSWR<Asset>(resourceUrl + id, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  return { asset, error, mutate };
}

export const createAsset = async (parameters: CreateAssetRequest) => {
  return await resolve(api.post(resourceUrl,
    convertParametersToFormData(parameters),
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data));
}

export const editAsset = async (id: string, parameters: Array<any>) => {
  return await resolve(api.patch(resourceUrl + id, parameters).then(res => res.data));
}

export const deleteAsset = async (id: string) => {
  return await resolve(api.delete(resourceUrl).then(res => res.data));
}

export const usePaginateAssets = (pageLimit: number = 50) => {
  const { data, error, size, setSize } = useSWRInfinite<ApiResponse<Asset[]>>(
    (index: number) => `${resourceUrl}?page=${index + 1}&limit=${pageLimit}`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  const emptyArray: Asset[] = [];

  const assets = data ? emptyArray.concat(...getDataArraysFromPages(data)) : [];
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")
  const isEmpty = data?.[0]?.data.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.length < pageLimit)

  return { assets, error, isLoadingMore, size, setSize, isReachingEnd }
}

function getDataArraysFromPages(data: ApiResponse<Asset[]>[]): Asset[][] {
  return data.map(value => value.data);
}

function convertParametersToFormData(parameters: Dictionary<any>): FormData {
  const formData = new FormData();
  for (const name in parameters) {
    if (parameters.hasOwnProperty(name)) {
      formData.append(name, parameters[name]);
    }
  }
  return formData;
}