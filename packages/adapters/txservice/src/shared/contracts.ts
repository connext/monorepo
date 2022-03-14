import { utils } from "ethers";
import _contractDeployments from "@connext/nxtp-contracts/deployments.json";
import { Interface } from "ethers/lib/utils";
import {
  TransactionManager as TTransactionManager,
  ConnextPriceOracle as TConnextPriceOracle,
  TokenRegistry as TTokenRegistry,
  StableSwap as TStableSwap,
} from "@connext/nxtp-contracts/typechain-types";

import PriceOracleArtifact from "@connext/nxtp-contracts/artifacts/contracts/ConnextPriceOracle.sol/ConnextPriceOracle.json";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import StableSwapArtifact from "@connext/nxtp-contracts/artifacts/contracts/StableSwap.sol/StableSwap.json";
import TokenRegistryArtifact from "@connext/nxtp-contracts/artifacts/contracts/nomad-xapps/contracts/bridge/TokenRegistry.sol/TokenRegistry.json";

/// MARK - CONTRACT DEPLOYMENTS
/**
 * Helper to allow easy mocking
 */
export const _getContractDeployments: any = () => {
  return _contractDeployments;
};

/**
 * Returns the address of the `TransactionManager` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedTransactionManagerContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = _getContractDeployments()[chainId.toString()] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.TransactionManager;
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
    const chainName = Object.keys(record)[0];
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
 *
 * @returns The deployed address or undefined if the contract has not yet been
 * deployed.
 */
export const getDeployedPriceOracleContract = (chainId: number): { address: string; abi: any } | undefined => {
  const _contractDeployments = _getContractDeployments();
  const record = _contractDeployments[chainId.toString()] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.ConnextPriceOracle;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export type ConnextContractDeploymentGetter = (chainId: number) => { address: string; abi: any } | undefined;

export type ConnextContractDeployments = {
  transactionManager: ConnextContractDeploymentGetter;
  priceOracle: ConnextContractDeploymentGetter;
  // TODO:
  // tokenRegistry: ConnextContractDeploymentGetter;
  // stableSwap: ConnextContractDeploymentGetter;
};

export const contractDeployments: ConnextContractDeployments = {
  transactionManager: getDeployedTransactionManagerContract,
  priceOracle: getDeployedPriceOracleContract,
};

/// MARK - CONTRACT INTERFACES
/**
 * Convenience methods for initializing Interface objects for the Connext
 * contracts' ABIs.
 *
 * @returns An ethers Interface object initialized for the corresponding ABI.
 */

export const getTransactionManagerInterface = () =>
  new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];

export const getPriceOracleInterface = () =>
  new utils.Interface(PriceOracleArtifact.abi) as TConnextPriceOracle["interface"];

export const getTokenRegistryInterface = () => new Interface(TokenRegistryArtifact.abi) as TTokenRegistry["interface"];

export const getStableSwapInterface = () => new Interface(StableSwapArtifact.abi) as TStableSwap["interface"];

export type ConnextContractInterfaces = {
  transactionManager: TTransactionManager["interface"];
  priceOracle: TConnextPriceOracle["interface"];
  tokenRegistry: TTokenRegistry["interface"];
  stableSwap: TStableSwap["interface"];
};

export const getContractInterfaces = (): ConnextContractInterfaces => ({
  transactionManager: getTransactionManagerInterface(),
  priceOracle: getPriceOracleInterface(),
  tokenRegistry: getTokenRegistryInterface(),
  stableSwap: getStableSwapInterface(),
});
