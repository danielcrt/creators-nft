import { ResponseError } from ".";

export type ApiResponse<T> = {
  data: T;
  meta: {
    [key: string]: any
  };
  links: {
    [key: string]: any
  };
  error?: ResponseError;
  networkError?: any;
}