// All utilities for swap calculations, including fees.
import { BigNumber, constants, utils } from "ethers";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import PriceOracleArtifact from "@connext/nxtp-contracts/artifacts/contracts/ConnextPriceOracle.sol/ConnextPriceOracle.json";
import { ConnextPriceOracle as TConnextPriceOracle } from "@connext/nxtp-contracts/typechain";

import { getRateFromPercentage } from "./util";
import { calculateExchangeAmount, calculateExchangeWad } from "./math";
import { GAS_ESTIMATES } from "./gasEstimates";

const ROUTER_FEE = "0.05"; // 0.05%
const L1_GAS_LIMIT_CHAINS = [10];

export enum TaxedMethod {
  SenderFulfill,
  ReceiverPrepare,
  ReceiverFulfill,
}

const DEFAULT_METATX_METHODS = [TaxedMethod.SenderFulfill, TaxedMethod.ReceiverFulfill];

/**
 * A number[] list of all chain IDs on which a Connext Price Oracle Contracts
 * have been deployed.
 */
export const CHAINS_WITH_PRICE_ORACLES: number[] = ((): number[] => {
  const chainIdsForGasFee: number[] = [];
  Object.keys(contractDeployments).forEach((chainId) => {
    const record = (contractDeployments as any)[chainId];
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
  const record = (contractDeployments as any)[String(chainId)] ?? {};
  const name = Object.keys(record)[0];
  if (!name) {
    return undefined;
  }
  const contract = record[name]?.contracts?.ConnextPriceOracle;
  return { address: contract.address, abi: contract.abi };
};

/**
 * Convenience method for initializing an Interface object for the Connext
 * Price Oracle contract ABI.
 *
 * @returns An ethers Interface object initialized with the Connext Price
 * Oracle ABI.
 */
export const getPriceOracleInterface = () =>
  new utils.Interface(PriceOracleArtifact.abi) as TConnextPriceOracle["interface"];

/**
 * Returns the swapRate
 *
 * @param TODO
 * @returns The swapRate, determined by the AMM
 *
 * @remarks
 * TODO: getSwapRate using AMM
 */
export const getSwapRate = async (): Promise<string> => {
  return "1";
};

/**
 * Returns the amount * swapRate to deduct fees when going from sending -> recieving chain to incentivize routing.
 *
 * @param amount The amount of the transaction on the sending chain
 * @returns The amount, less fees as determined by the swapRate
 *
 * @remarks
 * Router fulfills on sending chain, so gets `amount`, and user fulfills on receiving chain so gets `amount * swapRate`
 */
export const getReceiverAmount = async (
  amount: string,
  inputDecimals: number,
  outputDecimals: number,
): Promise<{ receivingAmount: string; routerFee: string; amountAfterSwapRate: string }> => {
  // 1. swap rate from AMM
  const swapRate = await getSwapRate();
  const amountAfterSwapRate = calculateExchangeWad(BigNumber.from(amount), inputDecimals, swapRate, outputDecimals);

  // 2. flat fee by Router
  const routerFeeRate = getRateFromPercentage(ROUTER_FEE);
  const receivingAmountFloat = calculateExchangeAmount(amountAfterSwapRate.toString(), routerFeeRate);

  const receivingAmount = receivingAmountFloat.split(".")[0];

  const routerFee = amountAfterSwapRate.sub(receivingAmount);

  return { receivingAmount, routerFee: routerFee.toString(), amountAfterSwapRate: amountAfterSwapRate.toString() };
};

type ChainInfo = {
  id: number;
  // Gas price in wei of native token.
  gasPrice: BigNumber;
  // Native token price in USD ?
  ethPrice: BigNumber;
};

export const getGasFees = async (
  // Target token price in USD
  tokenPrice: BigNumber,
  tokenDecimals: number,
  sendingChain: ChainInfo,
  receivingChain: ChainInfo,
  metaTxMethods: TaxedMethod[] = DEFAULT_METATX_METHODS,
) => {
  const operations = [
    {
      method: TaxedMethod.SenderFulfill,
      chain: sendingChain,
    },
    {
      method: TaxedMethod.ReceiverPrepare,
      chain: receivingChain,
    },
    {
      method: TaxedMethod.ReceiverFulfill,
      chain: receivingChain,
    },
  ];
  let total = BigNumber.from(0);
  for (const operation of operations) {
    const { id, gasPrice, ethPrice } = operation.chain;
    // Get estimate in gas units for this method.
    const gasLimit = getGasEstimateForMethod(id, operation.method);
    // Get the gas price in USD. It will be in wei units - 18 decimals.
    const gasPriceUsd = gasPrice.mul(gasLimit).mul(ethPrice);
    // Token amount = gasPriceUsd / (tokenPriceUsd * 10^(18 - tokenDecimals))
    const tokenAmount = tokenPrice.isZero()
      ? constants.Zero
      : gasPriceUsd.div(tokenPrice).div(BigNumber.from(10).pow(18 - tokenDecimals));
    // Apply relayer fee if applicable.
    const final = metaTxMethods.includes(operation.method)
      ? tokenAmount.add(tokenAmount.mul(getMetaTxBuffer()).div(100))
      : tokenAmount;
    // Add to the total fees.
    total = total.add(final);
  }
  return total;
};

const getGasEstimateForMethod = (chainId: number, method: TaxedMethod): string => {
  if (L1_GAS_LIMIT_CHAINS.includes(chainId)) {
    switch (method) {
      case TaxedMethod.SenderFulfill:
        return GAS_ESTIMATES.fulfillL1;
      case TaxedMethod.ReceiverFulfill:
        return GAS_ESTIMATES.fulfillL1;
      case TaxedMethod.ReceiverPrepare:
        return GAS_ESTIMATES.prepareL1;
    }
  }
  switch (method) {
    case TaxedMethod.SenderFulfill:
      return GAS_ESTIMATES.fulfill;
    case TaxedMethod.ReceiverFulfill:
      return GAS_ESTIMATES.fulfill;
    case TaxedMethod.ReceiverPrepare:
      return GAS_ESTIMATES.prepare;
  }
};

/**
 * Returns the meta tx buffer in percentage points (integer). The buffer is
 * a flat fee that is applied to the gas fee used to incentivize relayers.
 *
 * @returns Percentage value to be added.
 */
export const getMetaTxBuffer = () => {
  return 10; // 10%
};
