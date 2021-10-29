import axios from "axios";
import { Bytes } from "ethers";

export const signing = async (web3HostedUrl: string, data: string | Bytes, _identifier?: string) => {
  const identifier = _identifier ?? "0";
  const response: string = await axios.post(`${web3HostedUrl}/api/v1/eth1/sign/${identifier}`, {
    data,
  });
  return response;
};

export const reload = async (web3HostedUrl: string) => {
  const response = await axios.post(`${web3HostedUrl}/reload`);
  return response;
};

export const getServerStatus = async (web3HostedUrl: string) => {
  const response: string = await axios.get(`${web3HostedUrl}/upcheck`);
  return response;
};

export const getPublicKey = async (web3HostedUrl: string) => {
  const response: string = await axios.get(`${web3HostedUrl}/api/v1/eth1/publicKeys`);
  return response;
};
