import { axiosGet as _axiosGet } from "@connext/nxtp-utils";
import { SdkConfig, create } from "@connext/sdk-core";
import { Contract, providers } from "ethers";

export const axiosGet = _axiosGet;
export const JsonRpcProvider = providers.JsonRpcProvider;

export const getContract = (address: string, abi: any[], provider: providers.JsonRpcProvider) => {
  return new Contract(address, abi, provider);
};

export const initCoreSDK = async () => {
  const sdkConfig: SdkConfig = {
    signerAddress: "0x",
    network: "mainnet",
    chains: {},
  };
  const { sdkBase } = await create(sdkConfig);
  return { sdkBase };
};