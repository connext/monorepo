import { providers, Wallet } from "ethers";

import { getContract } from "../../helpers";

import { FiredrillDeployments } from "./types";

export const getDeployments = (args: {
  deployer: Wallet;
  chainInfo: { chain: string; rpc: providers.JsonRpcProvider };
}): FiredrillDeployments => {
  const {
    chainInfo: { rpc, chain },
    deployer: _deployer,
  } = args;
  const deployer = _deployer.connect(rpc);

  // NOTE: getContract will error if it could not find the contract in the
  // deployments.json file
  return {
    WatcherToken: getContract("BigBroERC20", chain, false, deployer),
  };
};
