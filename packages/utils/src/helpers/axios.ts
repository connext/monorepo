import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

import { NxtpError } from "../types";

export class AxiosQueryError extends NxtpError {
  constructor(url: string, method: "get" | "post", data: any, errorObj: any) {
    super(`Error sending axios request to url ${url}`, { url, data, method, error: errorObj }, AxiosQueryError.name);
  }
}

export const axiosPost = async <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<R> => {
  try {
    const response = await axios.post<T, R, D>(url, data, config);
    return response;
  } catch (error: unknown) {
    throw new AxiosQueryError(url, "post", data, (error as AxiosError).toJSON());
  }
};

export const axiosGet = async <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D): Promise<R> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await axios.get<T, R, D>(url, data as any);
    return response;
  } catch (error: unknown) {
    throw new AxiosQueryError(url, "get", undefined, (error as AxiosError).toJSON());
  }
};
