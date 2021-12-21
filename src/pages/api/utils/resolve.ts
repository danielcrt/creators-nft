import { Toast } from "../../../components/Toast/toast";
import { ApiResponse } from "../../../types/ApiResponse";

async function resolve<T>(promise: Promise<ApiResponse<T>>): Promise<ApiResponse<T>> {
  let resolved: ApiResponse<T> = {
    data: {} as T,
    meta: [],
    links: {},
    error: undefined,
  };

  try {
    resolved = await promise;
  } catch (e: any) {
    resolved.error = e?.response?.data?.error;
    resolved.networkError = e;
    if (resolved.error?.status !== 403) {
      Toast.error(resolved.error?.title || '');
    }
  }

  return resolved;
};

export default resolve;