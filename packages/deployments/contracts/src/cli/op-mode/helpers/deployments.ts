import { Wallet, providers } from "ethers";
import { getContract, getSpokeConnector } from "../../helpers";
import { OptimisticEnabledDeployments } from "./types";
import { Env } from "../../..";

export const getOptimisticEnabledDeployments = (
  chainId: number,
  connection: Wallet | providers.JsonRpcProvider,
  isHub: boolean,
  env: Env,
): OptimisticEnabledDeployments => {
  const chainStr = `${chainId}`;
  const useStaging = env === "staging";

  return isHub
    ? {
        SpokeConnector: getContract("MainnetSpokeConnector", chainStr, useStaging, connection),
        RootManager: getContract("RootManager", chainStr, useStaging, connection),
      }
    : {
        SpokeConnector: getSpokeConnector(chainId, env, connection),
      };
};
