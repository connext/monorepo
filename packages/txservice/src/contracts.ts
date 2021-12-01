import { Interface } from "ethers/lib/utils";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import PriceOracleArtifact from "@connext/nxtp-contracts/artifacts/contracts/ConnextPriceOracle.sol/ConnextPriceOracle.json";
import { ConnextPriceOracle as TConnextPriceOracle } from "@connext/nxtp-contracts/typechain";

/**
 * Returns the addresses where the price oracle contract is deployed to
 *
 */
export const getDeployedChainIdsForGasFee = (): number[] => {
  const chainIdsForGasFee: number[] = [];
  const chainIds = Object.keys(contractDeployments);
  chainIds.forEach((chainId) => {
    const record = (contractDeployments as any)[String(chainId)];
    const chainName = Object.keys(record)[0];
    if (chainName) {
      const priceOracleContract = record[chainName]?.contracts?.ConnextPriceOracle;
      if (priceOracleContract) {
        chainIdsForGasFee.push(Number(chainId));
      }
    }
  });
  return chainIdsForGasFee;
};

/**
 * Returns the address of the `PriceOracle` deployed to the provided chain, or undefined if it has not been deployed
 *
 * @param chainId - The chain you want the address on
 * @returns The deployed address or `undefined` if it has not been deployed yet
 */
export const getDeployedPriceOracleContract = (chainId: number): { address: string; abi: any } | undefined => {
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.ConnextPriceOracle;
  return { address: contract.address, abi: contract.abi };
};

export const getPriceOracleInterface = () => new Interface(PriceOracleArtifact.abi) as TConnextPriceOracle["interface"];
