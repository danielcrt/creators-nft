import api from '../api';
import resolve, { Response } from '../utils/resolve';

const resourceUrl = 'auth/';

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

export const request = async (parameters: RequestParams): Promise<Response<RequestResponse>> => {
  return await resolve(api.post(resourceUrl + 'requests', parameters).then(res => res.data));
}

export const verify = async (id: string, parameters: VerifyParams): Promise<Response<VerifyResponse>> => {
  return await resolve(api.post(resourceUrl + id, parameters).then(res => res.data));
}

export const refresh = async (): Promise<Response<void>> => {
  return await resolve(api.post(resourceUrl).then(res => res.data));
}

export const logout = async () => {
  return await resolve(api.delete(resourceUrl).then(res => res.data));
}
