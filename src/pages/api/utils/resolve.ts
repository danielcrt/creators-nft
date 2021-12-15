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
  } catch (e) {
    resolved.networkError = e;
  }

  return resolved;
};

export default resolve;