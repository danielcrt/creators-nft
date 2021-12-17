export type ResponseErrorMeta = {
  [key: string]: string;
}

export type ResponseError = {
  code: number;
  detail: string;
  meta: ResponseErrorMeta,
  status: number;
  title: string;
}