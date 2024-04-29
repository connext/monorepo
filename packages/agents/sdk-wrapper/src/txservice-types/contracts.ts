import { utils } from "ethers";

import { Connext as TConnext, ConnextAbi } from "../typechain-types";

export type ContractPostfix = "Staging" | "";
export type Network = "mainnet" | "testnet" | "local" | "devnet";

export type ConnextContractDeploymentGetter = (
  chainId: number,
  postfix?: ContractPostfix,
  network?: Network,
) => { address: string; abi: any } | undefined;

export type SpokeConnectorDeploymentGetter = (
  chainId: number,
  prefix: string,
  postfix?: ContractPostfix,
  network?: Network,
) => { address: string; abi: any } | undefined;

export type HubConnectorDeploymentGetter = (
  chainId: number,
  prefix: string,
  postfix?: ContractPostfix,
  network?: Network,
) => { address: string; abi: any } | undefined;

export type RootManagerPropagateWrapperGetter = (
  chainId: number,
  postfix?: ContractPostfix,
  network?: Network,
) => { address: string; abi: any } | undefined;

export type MultisendContractDeploymentGetter = (
  chainId: number,
  network?: Network,
) => { address: string; abi: any } | undefined;

export type UnwrapperContractDeploymentGetter = (
  chainId: number,
  postfix?: ContractPostfix,
  network?: Network,
) => { address: string; abi: any } | undefined;

export type ConnextContractDeployments = {
  connext: ConnextContractDeploymentGetter;
  relayerProxy: ConnextContractDeploymentGetter;
  priceOracle: ConnextContractDeploymentGetter;
  stableSwap: ConnextContractDeploymentGetter;
  spokeConnector: SpokeConnectorDeploymentGetter;
  hubConnector: HubConnectorDeploymentGetter;
  multisend: MultisendContractDeploymentGetter;
  unwrapper: UnwrapperContractDeploymentGetter;
  rootManager: RootManagerPropagateWrapperGetter;
};

export const getConnextInterface = () => new utils.Interface(ConnextAbi) as TConnext["interface"];

export type ConnextContractInterfaces = {
  connext: TConnext["interface"];
};

export const getContractInterfaces = (): ConnextContractInterfaces => ({
  connext: getConnextInterface(),
});
