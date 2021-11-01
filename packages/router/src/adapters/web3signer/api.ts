import axios, { AxiosResponse } from "axios";
import { Bytes } from "ethers";

export const signing = async (web3HostedUrl: string, identifier: string, data: string | Bytes) => {
  const response: AxiosResponse<string> = await axios.post(`${web3HostedUrl}/api/v1/eth1/sign/${identifier}`, {
    data,
  });
  return response.data;
};

export const reload = async (web3HostedUrl: string) => {
  const response: AxiosResponse<string> = await axios.post(`${web3HostedUrl}/reload`);
  return response.data[0];
};

export const getServerStatus = async (web3HostedUrl: string) => {
  const response: AxiosResponse<string> = await axios.get(`${web3HostedUrl}/upcheck`);
  return response.data[0];
};

export const getPublicKey = async (web3HostedUrl: string) => {
  const response: AxiosResponse<string> = await axios.get(`${web3HostedUrl}/api/v1/eth1/publicKeys`);
  return response.data[0];
};
