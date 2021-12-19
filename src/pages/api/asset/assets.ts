import useSWRInfinite from 'swr/infinite'
import { fetcher } from '../utils/fetcher';
import resolve from '../utils/resolve';
import useSWR from 'swr';
import api from '../api';
import { Asset, Collection } from '../../../types';
import { ApiResponse } from '../../../types/ApiResponse';
import { Dictionary } from '../../../types/Dictionary';
import qs from 'qs';

const resourceUrl = 'assets';

export type AssetResponse = {
  id: string;
  token_id: string;
  collecion: Collection;
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

export type UpdateAssetRequest = {
  name: string | undefined;
  description: string | undefined;
  media: File | undefined;
};

export const getAsset = (id?: string, parameters: Dictionary<any> = {}) => {
  const { data, error, mutate } = useSWR<ApiResponse<Asset>>(
    id !== undefined ? `${resourceUrl}/${id}` : null,
    fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  const asset = data?.data;
  return { asset, error, mutate };
}

export const createAsset = async (parameters: CreateAssetRequest): Promise<ApiResponse<Asset>> => {
  return await resolve(api.post(resourceUrl,
    convertParametersToFormData(parameters),
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data));
}

export const updateAsset = async (id: string, parameters: UpdateAssetRequest) => {
  console.log(parameters);

  return await resolve(api.post(`${resourceUrl}/${id}`,
    convertParametersToFormData(
      {
        ...parameters,
        '_method': 'PATCH'
      }),
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  ).then(res => res.data));
}

export const deleteAsset = async (id: string) => {
  return await resolve(api.delete(`${resourceUrl}/${id}`).then(res => res.data));
}

export const usePaginateAssets = (filters: Dictionary<any> = {}, pageLimit: number = 50) => {
  const { data, error, size, setSize } = useSWRInfinite<ApiResponse<Asset[]>>(
    (index: number) => {
      const query = qs.stringify({
        filters: JSON.stringify(filters),
        limit: pageLimit,
        page: index + 1,
      });
      return `${resourceUrl}?${query}`;
    },
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
    if (parameters.hasOwnProperty(name) && parameters[name] !== undefined) {
      formData.append(name, parameters[name]);
    }
  }
  return formData;
}