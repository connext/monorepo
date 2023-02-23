import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import { jsonifyError, NxtpError } from "../types";

import { delay } from "./time";

export class AxiosQueryError extends NxtpError {
  constructor(url: string, method: "get" | "post", data: any, errorObj: any) {
    super(`Error sending axios request to url ${url}`, { url, data, method, error: errorObj }, AxiosQueryError.name);
  }
}

export const axiosPost = async <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
  numAttempts = 30,
  retryDelay = 2000,
): Promise<R> => {
  let error;
  for (let i = 0; i < numAttempts; i++) {
    try {
      const response = await axios.post<T, R, D>(url, data, config);
      return response;
    } catch (err: unknown) {
      // eslint-disable-next-line import/no-named-as-default-member
      if (axios.isAxiosError(err)) {
        error = { error: err.toJSON(), status: err.response?.status };
      }
      error = jsonifyError(err as NxtpError);
    }
    await delay(retryDelay);
  }
  throw new AxiosQueryError(url, "post", data, error);
};

export const axiosGet = async <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  numAttempts = 5,
  retryDelay = 2000,
): Promise<R> => {
  let error;
  for (let i = 0; i < numAttempts; i++) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const response = await axios.get<T, R, D>(url, data as any);
      return response;
    } catch (err: unknown) {
      // eslint-disable-next-line import/no-named-as-default-member
      if (axios.isAxiosError(err)) {
        error = { error: err.toJSON(), status: err.response?.status };
      }
      error = jsonifyError(err as NxtpError);
    }
    await delay(retryDelay);
  }
  throw new AxiosQueryError(url, "get", data, error);
};
