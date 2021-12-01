import { ethers } from "ethers";

export const getSimpleRPCPRovider = (rpcUrl: string) => {
  return new ethers.providers.StaticJsonRpcProvider(rpcUrl);
};
