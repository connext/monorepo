import { axiosGet as _axiosGet } from "@connext/nxtp-utils";
import { Contract, providers } from "ethers";

export const axiosGet = _axiosGet;
export const JsonRpcProvider = providers.JsonRpcProvider;

export const getContract = (address: string, abi: any[], provider: providers.JsonRpcProvider) => {
  return new Contract(address, abi, provider);
};
