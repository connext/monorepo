import { utils } from "ethers";
import _contractDeployments from "@connext/smart-contracts/deployments.json";
import {
  IERC20 as TIERC20Minimal,
  Connext as TConnext,
  ConnextPriceOracle as TConnextPriceOracle,
  StableSwap as TStableSwap,
  SpokeConnector as TSpokeConnector,
  MerkleTreeManager as TMerkleTreeManager,
  RelayerProxy as TRelayerProxy,
  RelayerProxyHub as TRelayerProxyHub,
  RootManager as TRootManager,
  MultiSend as TMultisend,
  Unwrapper as TUnwrapper,
} from "@connext/smart-contracts";
import RootManagerAbi from "@connext/smart-contracts/abi/contracts/messaging/RootManager.sol/RootManager.json";
import PriceOracleAbi from "@connext/smart-contracts/abi/contracts/core/connext/helpers/ConnextPriceOracle.sol/ConnextPriceOracle.json";
import ConnextAbi from "@connext/smart-contracts/abi/hardhat-diamond-abi/HardhatDiamondABI.sol/Connext.json";
import StableSwapAbi from "@connext/smart-contracts/abi/contracts/core/connext/helpers/StableSwap.sol/StableSwap.json";
import SpokeConnectorAbi from "@connext/smart-contracts/abi/contracts/messaging/connectors/SpokeConnector.sol/SpokeConnector.json";
import MerkleTreeManagerAbi from "@connext/smart-contracts/abi/contracts/messaging/MerkleTreeManager.sol/MerkleTreeManager.json";
import RelayerProxyAbi from "@connext/smart-contracts/abi/contracts/core/connext/helpers/RelayerProxy.sol/RelayerProxy.json";
import RelayerProxyHubAbi from "@connext/smart-contracts/abi/contracts/core/connext/helpers/RelayerProxyHub.sol/RelayerProxyHub.json";
import MultiSendAbi from "@connext/smart-contracts/abi/contracts/shared/libraries/Multisend.sol/MultiSend.json";
import UnwrapperAbi from "@connext/smart-contracts/abi/contracts/core/xreceivers/Unwrapper.sol/Unwrapper.json";
import GnosisAmbAbi from "@connext/smart-contracts/abi/contracts/messaging/interfaces/ambs/GnosisAmb.sol/GnosisAmb.json";
import MultichainAmbAbi from "@connext/smart-contracts/abi/contracts/messaging/interfaces/ambs/Multichain.sol/Multichain.json";
import OptimismAmbAbi from "@connext/smart-contracts/abi/contracts/messaging/interfaces/ambs/optimism/OptimismAmb.sol/OptimismAmb.json";
import ArbitrumAmbAbi from "@connext/smart-contracts/abi/contracts/messaging/interfaces/ambs/arbitrum/ArbitrumL2Amb.sol/ArbitrumL2Amb.json";
import { ERC20Abi } from "@connext/nxtp-utils";

export type ContractPostfix = "Staging" | "";

/// MARK - CONTRACT DEPLOYMENTS
/**
 * Helper to allow easy mocking
 */
export const _getContractDeployments = (): Record<string, Record<string, any>> => {
  return _contractDeployments as any;
};

/**
 * Returns the address of the `Connext` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @param postfix - The postfix to use for the contract
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedConnextContract = (
  chainId: number,
  postfix: ContractPostfix = "",
): { address: string; abi: any } | undefined => {
  const record = _getContractDeployments()[chainId.toString()] ?? {};
  const contract = record[0]?.contracts ? record[0]?.contracts[`Connext${postfix}`] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const getDeployedRootManagerContract = (
  chainId: number,
  postfix: ContractPostfix = "",
): { address: string; abi: any } | undefined => {
  const record = _getContractDeployments()[chainId.toString()] ?? {};
  const contract = record[0]?.contracts ? record[0]?.contracts[`RootManager${postfix}`] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const _getDeployedRelayerProxyContract = (
  chainId: number,
  postfix: ContractPostfix = "",
): { address: string; abi: any } | undefined => {
  const record = _getContractDeployments()[chainId.toString()] ?? {};
  const contract = record[0]?.contracts ? record[0]?.contracts[`RelayerProxy${postfix}`] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const _getDeployedRelayerProxyHubContract = (
  chainId: number,
  postfix: ContractPostfix = "",
): { address: string; abi: any } | undefined => {
  const record = _getContractDeployments()[chainId.toString()] ?? {};
  const contract = record[0]?.contracts ? record[0]?.contracts[`RelayerProxyHub${postfix}`] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const getDeployedRelayerProxyContract = (
  chainId: number,
  postfix: ContractPostfix = "",
): { address: string; abi: any } | undefined => {
  if (chainId === 5 || chainId === 1) {
    return _getDeployedRelayerProxyHubContract(chainId, postfix);
  }

  return _getDeployedRelayerProxyContract(chainId, postfix);
};

export const getDeployedSpokeConnecterContract = (
  chainId: number,
  prefix: string,
  postfix: ContractPostfix = "",
): { address: string; abi: any } | undefined => {
  const record = _getContractDeployments()[chainId.toString()] ?? {};
  const contract = record[0]?.contracts ? record[0]?.contracts[`${prefix}SpokeConnector${postfix}`] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const getDeployedMerkleRootManagerContract = (
  chainId: number,
  isHub: boolean,
  postfix: ContractPostfix = "",
): { address: string; abi: any } | undefined => {
  const record = _getContractDeployments()[chainId.toString()] ?? {};
  const contract = record[0]?.contracts
    ? record[0]?.contracts[`MerkleTreeManager${isHub ? "Spoke" : ""}UpgradeBeaconProxy${postfix}`]
    : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const getDeployedHubConnecterContract = (
  chainId: number,
  prefix: string,
  postfix: ContractPostfix = "",
): { address: string; abi: any } | undefined => {
  const record = _getContractDeployments()[chainId.toString()] ?? {};
  const contract = record[0]?.contracts ? record[0]?.contracts[`${prefix}HubConnector${postfix}`] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const getDeployedMultisendContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = _getContractDeployments()[chainId.toString()] ?? {};
  const contract = record[0]?.contracts ? record[0]?.contracts["MultiSend"] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const getDeployedUnwrapperContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = _getContractDeployments()[chainId.toString()] ?? {};
  const contract = record[0]?.contracts ? record[0]?.contracts["Unwrapper"] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

/**
 * A number[] list of all chain IDs on which a Connext Price Oracle Contracts
 * have been deployed.
 */
export const CHAINS_WITH_PRICE_ORACLES: number[] = ((): number[] => {
  const chainIdsForGasFee: number[] = [];
  const _contractDeployments = _getContractDeployments();
  Object.keys(_contractDeployments).forEach((chainId) => {
    const record = _contractDeployments[chainId];
    const chainName = Object.keys(record)[0] as string | undefined;
    if (chainName) {
      const priceOracleContract = record[chainName]?.contracts?.ConnextPriceOracle;
      if (priceOracleContract) {
        chainIdsForGasFee.push(parseInt(chainId));
      }
    }
  });
  return chainIdsForGasFee;
})();

/**
 * Returns the address of the Connext Price Oracle contract deployed on the
 * given chain ID; returns undefined if no such contract has been deployed.
 *
 * @param chainId - The chain you want the address on.
 * @param postfix - The postfix to use for the contract
 * @returns The deployed address or undefined if the contract has not yet been
 * deployed.
 */
export const getDeployedPriceOracleContract = (
  chainId: number,
  postfix: ContractPostfix = "",
): { address: string; abi: any } | undefined => {
  const _contractDeployments = _getContractDeployments();
  const record = _contractDeployments[chainId.toString()] ?? {};
  const name = Object.keys(record)[0] as string | undefined;
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts ? record[name]?.contracts[`ConnextPriceOracle${postfix}`] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export const getDeployedStableSwapContract = (
  chainId: number,
  postfix: ContractPostfix = "",
): { address: string; abi: any } | undefined => {
  const _contractDeployments = _getContractDeployments();
  const record = _contractDeployments[chainId.toString()] ?? {};
  const name = Object.keys(record)[0] as string | undefined;
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts ? record[name]?.contracts[`StableSwap${postfix}`] : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

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

export type MerkleTreeManagerDeploymentGetter = (
  chainId: number,
  isHub: boolean,
  postfix?: ContractPostfix,
) => { address: string; abi: any } | undefined;

export type AmbDeploymentGetter = (
  chainId: number,
  prefix: string,
  postfix?: ContractPostfix,
) => { address: string; abi: any } | undefined;

export type HubConnectorDeploymentGetter = (
  chainId: number,
  prefix: string,
  postfix?: ContractPostfix,
) => { address: string; abi: any } | undefined;

export type RootManagerPropagateWrapperGetter = (
  chainId: number,
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
  spokeMerkleTreeManager: MerkleTreeManagerDeploymentGetter;
  hubConnector: HubConnectorDeploymentGetter;
  multisend: MultisendContractDeploymentGetter;
  unwrapper: UnwrapperContractDeploymentGetter;
  rootManager: RootManagerPropagateWrapperGetter;
};

export const contractDeployments: ConnextContractDeployments = {
  connext: getDeployedConnextContract,
  relayerProxy: getDeployedRelayerProxyContract,
  priceOracle: getDeployedPriceOracleContract,
  stableSwap: getDeployedStableSwapContract,
  spokeConnector: getDeployedSpokeConnecterContract,
  spokeMerkleTreeManager: getDeployedMerkleRootManagerContract,
  hubConnector: getDeployedHubConnecterContract,
  multisend: getDeployedMultisendContract,
  unwrapper: getDeployedUnwrapperContract,
  rootManager: getDeployedRootManagerContract,
};

/// MARK - CONTRACT INTERFACES
/**
 * Convenience methods for initializing Interface objects for the Connext
 * contracts' ABIs.
 *
 * @returns An ethers Interface object initialized for the corresponding ABI.
 */

export const getErc20Interface = () => new utils.Interface(ERC20Abi) as TIERC20Minimal["interface"];

export const getConnextInterface = () => new utils.Interface(ConnextAbi) as TConnext["interface"];

export const getRelayerProxyInterface = () => new utils.Interface(RelayerProxyAbi) as TRelayerProxy["interface"];

export const getRelayerProxyHubInterface = () =>
  new utils.Interface(RelayerProxyHubAbi) as TRelayerProxyHub["interface"];

export const getPriceOracleInterface = () => new utils.Interface(PriceOracleAbi) as TConnextPriceOracle["interface"];

export const getStableSwapInterface = () => new utils.Interface(StableSwapAbi) as TStableSwap["interface"];

export const getSpokeConnectorInterface = () => new utils.Interface(SpokeConnectorAbi) as TSpokeConnector["interface"];

export const getMerkleTreeManagerInterface = () =>
  new utils.Interface(MerkleTreeManagerAbi) as TMerkleTreeManager["interface"];

export const getRootManagerInterface = () => new utils.Interface(RootManagerAbi) as TRootManager["interface"];

export const getMultisendInterface = () => new utils.Interface(MultiSendAbi) as TMultisend["interface"];

export const getUnwrapperInterface = () => new utils.Interface(UnwrapperAbi) as TUnwrapper["interface"];

export type ConnextContractInterfaces = {
  erc20: TIERC20Minimal["interface"];
  connext: TConnext["interface"];
  priceOracle: TConnextPriceOracle["interface"];
  stableSwap: TStableSwap["interface"];
  spokeConnector: TSpokeConnector["interface"];
  merkleTreeManager: TMerkleTreeManager["interface"];
  rootManager: TRootManager["interface"];
  relayerProxy: TRelayerProxy["interface"];
  relayerProxyHub: TRelayerProxyHub["interface"];
  multisend: TMultisend["interface"];
  unwrapper: TUnwrapper["interface"];
};

export const getContractInterfaces = (): ConnextContractInterfaces => ({
  erc20: getErc20Interface(),
  connext: getConnextInterface(),
  priceOracle: getPriceOracleInterface(),
  stableSwap: getStableSwapInterface(),
  spokeConnector: getSpokeConnectorInterface(),
  merkleTreeManager: getMerkleTreeManagerInterface(),
  rootManager: getRootManagerInterface(),
  relayerProxy: getRelayerProxyInterface(),
  relayerProxyHub: getRelayerProxyHubInterface(),
  multisend: getMultisendInterface(),
  unwrapper: getUnwrapperInterface(),
});

export type AmbContractABIs = {
  optimism: any[];
  gnosis: any[];
  arbitrum: any[];
  bnb: any[];
};

export const getAmbABIs = (): AmbContractABIs => ({
  optimism: OptimismAmbAbi,
  gnosis: GnosisAmbAbi,
  arbitrum: ArbitrumAmbAbi,
  bnb: MultichainAmbAbi,
});
