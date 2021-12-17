import { ApiResponse } from '../../../types/ApiResponse';
import api from '../api';
import resolve from '../utils/resolve';

const resourceUrl = 'auth';

export const REFRESH_TOKEN_URL = resourceUrl;

export type RequestParams = {
  address: string;
  os: 'web';
}

export type RequestResponse = {
  id: string;
  address: string;
  attempts: number | null;
  nonce: string;
  os: string;
  user_agent: string;
}

export type VerifyParams = {
  address: string;
  signature: string;
  locale: string;
}

export type VerifyResponse = {
  id: string;
  address: string;
  attempts: number | null;
  nonce: string;
  os: string;
  user_agent: string;
}

export const request = async (parameters: RequestParams): Promise<ApiResponse<RequestResponse>> => {
  return await resolve(api.post(resourceUrl + '/requests', parameters).then(res => res.data));
}

export const verify = async (id: string, parameters: VerifyParams): Promise<ApiResponse<VerifyResponse>> => {
  return await resolve(api.post(resourceUrl + '/' + id, parameters).then(res => res.data));
}

export const refresh = async (): Promise<ApiResponse<void>> => {
  return await resolve(api.post(resourceUrl).then(res => res.data));
}

export const logout = async () => {
  return await resolve(api.delete(resourceUrl).then(res => res.data));
}
