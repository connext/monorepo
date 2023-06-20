import { utils } from "ethers";

import { Connext as TConnext, ConnextAbi } from "../typechain-types";

export type ContractPostfix = "Staging" | "";

export type ConnextContractDeploymentGetter = (
  chainId: number,
  postfix?: ContractPostfix,
  proxy?: boolean,
) => { address: string; abi: any } | undefined;

export type SpokeConnectorDeploymentGetter = (
  chainId: number,
  prefix: string,
  postfix?: ContractPostfix,
) => { address: string; abi: any } | undefined;

export type HubConnectorDeploymentGetter = (
  chainId: number,
  prefix: string,
  postfix?: ContractPostfix,
) => { address: string; abi: any } | undefined;

export type MultisendContractDeploymentGetter = (chainId: number) => { address: string; abi: any } | undefined;
export type UnwrapperContractDeploymentGetter = (chainId: number) => { address: string; abi: any } | undefined;

export type ConnextContractDeployments = {
  connext: ConnextContractDeploymentGetter;
  relayerProxy: ConnextContractDeploymentGetter;
  priceOracle: ConnextContractDeploymentGetter;
  stableSwap: ConnextContractDeploymentGetter;
  spokeConnector: SpokeConnectorDeploymentGetter;
  hubConnector: HubConnectorDeploymentGetter;
  multisend: MultisendContractDeploymentGetter;
  unwrapper: UnwrapperContractDeploymentGetter;
};

export const getConnextInterface = () => new utils.Interface(ConnextAbi) as TConnext["interface"];

export type ConnextContractInterfaces = {
  connext: TConnext["interface"];
};

export const getContractInterfaces = (): ConnextContractInterfaces => ({
  connext: getConnextInterface(),
});
