import { Toast } from "../../../components/Toast/toast";

export type Response<T> = {
  data: T;
  meta: {
    [key: string]: any
  };
  links: {
    [key: string]: any
  };
  error: {
    [key: string]: any
  };
  networkError?: any;
}

async function resolve<T>(promise: Promise<Response<T>>): Promise<Response<T>> {
  let resolved: Response<T> = {
    data: {} as T,
    meta: [],
    links: {},
    error: {},
  };

  try {
    resolved = await promise;
  } catch (e: any) {
    resolved.error = e?.response?.data?.error;
    resolved.networkError = e;
    Toast.error(resolved.error?.title);
  }

  return resolved;
};

export default resolve;