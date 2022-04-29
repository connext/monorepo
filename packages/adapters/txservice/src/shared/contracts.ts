import { utils } from "ethers";
import _contractDeployments from "@connext/nxtp-contracts/deployments.json";
import {
  IERC20Minimal as TIERC20Minimal,
  ConnextHandler as TConnext,
  ConnextPriceOracle as TConnextPriceOracle,
  TokenRegistry as TTokenRegistry,
  StableSwap as TStableSwap,
  RouterPermissionsManager as TRouterPermissionsManager,
} from "@connext/nxtp-contracts/typechain-types";
import PriceOracleArtifact from "@connext/nxtp-contracts/artifacts/contracts/ConnextPriceOracle.sol/ConnextPriceOracle.json";
import ERC20Artifact from "@connext/nxtp-contracts/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";
import ConnextArtifact from "@connext/nxtp-contracts/artifacts/contracts/nomad-xapps/contracts/connext/ConnextHandler.sol/ConnextHandler.json";
import StableSwapArtifact from "@connext/nxtp-contracts/artifacts/contracts/StableSwap.sol/StableSwap.json";
import TokenRegistryArtifact from "@connext/nxtp-contracts/artifacts/contracts/nomad-xapps/contracts/connext/TokenRegistry.sol/TokenRegistry.json";
import RouterPermissionsManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/RouterPermissionsManager.sol/RouterPermissionsManager.json";

export type ContractPostfix = "Staging" | "";

/// MARK - CONTRACT DEPLOYMENTS
/**
 * Helper to allow easy mocking
 */
export const _getContractDeployments = (): Record<string, Record<string, any>> => {
  return _contractDeployments;
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
  const contract = record[0]?.contracts ? record[0]?.contracts[`ConnextHandler${postfix}`] : undefined;
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

export const getDeployedTokenRegistryContract = (
  chainId: number,
  postfix: ContractPostfix = "",
  proxy = false,
): { address: string; abi: any } | undefined => {
  const _contractDeployments = _getContractDeployments();
  const record = _contractDeployments[chainId.toString()] ?? {};
  const name = Object.keys(record)[0] as string | undefined;
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts
    ? record[name]?.contracts[`TokenRegistry${proxy ? "UpgradeBeaconProxy" : ""}${postfix}`]
    : undefined;
  return contract ? { address: contract.address, abi: contract.abi } : undefined;
};

export type ConnextContractDeploymentGetter = (
  chainId: number,
  postfix?: ContractPostfix,
) => { address: string; abi: any } | undefined;

export type ConnextContractDeployments = {
  connext: ConnextContractDeploymentGetter;
  priceOracle: ConnextContractDeploymentGetter;
  tokenRegistry: ConnextContractDeploymentGetter;
  // stableSwap: ConnextContractDeploymentGetter;
};

export const contractDeployments: ConnextContractDeployments = {
  connext: getDeployedConnextContract,
  priceOracle: getDeployedPriceOracleContract,
  tokenRegistry: getDeployedTokenRegistryContract,
};

/// MARK - CONTRACT INTERFACES
/**
 * Convenience methods for initializing Interface objects for the Connext
 * contracts' ABIs.
 *
 * @returns An ethers Interface object initialized for the corresponding ABI.
 */

export const getErc20Interface = () => new utils.Interface(ERC20Artifact.abi) as TIERC20Minimal["interface"];

export const getConnextInterface = () => new utils.Interface(ConnextArtifact.abi) as TConnext["interface"];

export const getPriceOracleInterface = () =>
  new utils.Interface(PriceOracleArtifact.abi) as TConnextPriceOracle["interface"];

export const getTokenRegistryInterface = () =>
  new utils.Interface(TokenRegistryArtifact.abi) as TTokenRegistry["interface"];

export const getStableSwapInterface = () => new utils.Interface(StableSwapArtifact.abi) as TStableSwap["interface"];

export const getRouterPermissionsManagerInterface = () =>
  new utils.Interface(RouterPermissionsManagerArtifact.abi) as TRouterPermissionsManager["interface"];

export type ConnextContractInterfaces = {
  erc20: TIERC20Minimal["interface"];
  connext: TConnext["interface"];
  priceOracle: TConnextPriceOracle["interface"];
  tokenRegistry: TTokenRegistry["interface"];
  stableSwap: TStableSwap["interface"];
};

export const getContractInterfaces = (): ConnextContractInterfaces => ({
  erc20: getErc20Interface(),
  connext: getConnextInterface(),
  priceOracle: getPriceOracleInterface(),
  tokenRegistry: getTokenRegistryInterface(),
  stableSwap: getStableSwapInterface(),
});
