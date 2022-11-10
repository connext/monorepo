import axios, { AxiosResponse, AxiosError } from "axios";

import { NxtpError } from "../types";

export class AxiosQueryError extends NxtpError {
  constructor(url: string, method: "get" | "post", data: any, errorObj: any) {
    super(`Error sending axios request to url ${url}`, { url, data, method, error: errorObj }, AxiosQueryError.name);
  }
}

export const axiosPost = async <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D): Promise<R> => {
  try {
    const response = await axios.post<T, R, D>(url, data);
    return response;
  } catch (error: unknown) {
    const errorObj: any = {};
    if ((error as AxiosError<T, D>).response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorObj.data = (error as AxiosError<T, D>).response!.data;
      errorObj.status = (error as AxiosError<T, D>).response!.status;
      errorObj.headers = (error as AxiosError<T, D>).response!.headers;
    } else if ((error as AxiosError<T, D>).request) {
      errorObj.request = (error as AxiosError<T, D>).request;
    } else {
      // Something happened in setting up the request that triggered an Error
      errorObj.message = (error as AxiosError<T, D>).message;
    }
    errorObj.config = (error as AxiosError<T, D>).config;
    throw new AxiosQueryError(url, "post", data, errorObj);
  }
};

export const axiosGet = async <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D): Promise<R> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await axios.get<T, R, D>(url, data as any);
    return response;
  } catch (error: unknown) {
    const errorObj: any = {};
    if ((error as AxiosError<T, D>).response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorObj.data = (error as AxiosError<T, D>).response!.data;
      errorObj.status = (error as AxiosError<T, D>).response!.status;
      errorObj.headers = (error as AxiosError<T, D>).response!.headers;
    } else if ((error as AxiosError<T, D>).request) {
      errorObj.request = (error as AxiosError<T, D>).request;
    } else {
      // Something happened in setting up the request that triggered an Error
      errorObj.message = (error as AxiosError<T, D>).message;
    }
    errorObj.config = (error as AxiosError<T, D>).config;
    throw new AxiosQueryError(url, "get", undefined, errorObj);
  }
};
