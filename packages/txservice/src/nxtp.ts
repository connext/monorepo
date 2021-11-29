// NXTP specific functionality, potentially move this
import { BigNumber, constants } from "ethers/lib/ethers";
import { Interface } from "ethers/lib/utils";
import contractDeployments from "@connext/nxtp-contracts/deployments.json";
import PriceOracleArtifact from "@connext/nxtp-contracts/artifacts/contracts/ConnextPriceOracle.sol/ConnextPriceOracle.json";
import { ConnextPriceOracle as TConnextPriceOracle } from "@connext/nxtp-contracts/typechain";
import { createLoggingContext, Logger, RequestContext } from "@connext/nxtp-utils";

import { ChainReader } from "./chainreader";

export const GAS_ESTIMATES = {
  prepare: "112000", // https://etherscan.io/tx/0x4e1be107ca80265b7ae65f77e00f14dd726d08dae763955fb1cf2a754d9cc1a8 example tx, add 5% buffer
  fulfill: "126000", // https://bscscan.com/tx/0xcaba240ab17f006586086cd460fffab09a028905d7c497c31667c1d5eb58e153 example tx, add 5% buffer
  prepareL1: "17300", // https://optimistic.etherscan.io/tx/0xd3ae8d8980aa464c4256ef6c734f7eb58211a02a6016201903e30fd35ec3bff8
  fulfillL1: "11800", // https://optimistic.etherscan.io/tx/0x280a1e70c10095d748babb85fa56fdf8285cdcae3e3962eae3dc451045c0b220
};

const NO_ORACLE_CHAINS: number[] = [];

/**
 * Returns the addresses where the price oracle contract is deployed to
 *
 */
const getDeployedChainIdsForGasFee = (): number[] => {
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

export const getPriceOracleInterface = () => new Interface(PriceOracleArtifact.abi) as TConnextPriceOracle["interface"];

/**
 * Gets token price in usd from price oracle
 *
 * @param chainId The network identifier
 * @param assetId The asset address to get price for
 */
export const getTokenPrice = async (
  chainId: number,
  assetId: string,
  chainReader: ChainReader,
  oracleContractAddress: string,
): Promise<BigNumber> => {
  const encodedTokenPriceData = getPriceOracleInterface().encodeFunctionData("getTokenPrice", [assetId]);
  const tokenPrice = await chainReader.readTx({ chainId, to: oracleContractAddress, data: encodedTokenPriceData });
  return BigNumber.from(tokenPrice);
};

/**
 * Helper to calculate router gas fee in token for prepare
 *
 * @param sendingAssetId The asset address on source chain
 * @param sendingChainId The source chain Id
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @param _outputDecimals Decimal number of receiving asset
 * @param requestContext Request context instance
 */
export const calculateGasFeeInReceivingTokenForPrepare = async (
  sendingAssetId: string,
  sendingChainId: number,
  receivingAssetId: string,
  receivingChainId: number,
  outputDecimals: number,
  chainReader: ChainReader,
  sendingOracleContractAddress: string,
  receivingOracleContractAddress: string,
  _requestContext: RequestContext,
  logger: Logger,
): Promise<BigNumber> => {
  const { requestContext, methodContext } = createLoggingContext(
    calculateGasFeeInReceivingTokenForPrepare.name,
    _requestContext,
  );
  logger.info("Method start", requestContext, methodContext, {
    sendingChainId,
    sendingAssetId,
    receivingAssetId,
    receivingChainId,
    outputDecimals,
  });

  const chaindIdsForGasFee = getDeployedChainIdsForGasFee();

  if (!chaindIdsForGasFee.includes(sendingChainId) && !chaindIdsForGasFee.includes(receivingChainId))
    return constants.Zero;
  let totalCost = constants.Zero;
  // TODO: this is returning zero when doing a rinkeby to goerli tx. i believe this is because the oracle
  // is not configured for goerli so theres no way to translate the price to goerli
  // TODO: we can combine these into just 2 if statements and remove the repeated logic
  // calculate receiving token amount for gas fee
  // if chaindIdsForGasFee includes only sendingChainId, calculate gas fee for fulfill transactions
  // if chaindIdsForGasFee includes only receivingChainId, calculate gas fee for prepare transactions

  const tokenPricingSendingChain = NO_ORACLE_CHAINS.includes(sendingChainId) ? 1 : sendingChainId;
  const tokenPricingReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId) ? 1 : receivingChainId;

  logger.info("Getting token prices", requestContext, methodContext, {
    tokenPricingSendingChain,
    tokenPricingReceivingChain,
    sendingAssetId,
    receivingAssetId,
    outputDecimals,
  });
  if (chaindIdsForGasFee.includes(sendingChainId)) {
    const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
    const [ethPriceInSendingChain, receivingTokenPrice, gasPriceInSendingChain] = await Promise.all([
      getTokenPrice(tokenPricingSendingChain, constants.AddressZero, chainReader, sendingOracleContractAddress),
      getTokenPrice(tokenPricingSendingChain, sendingAssetId, chainReader, receivingOracleContractAddress),
      chainReader.getGasPrice(sendingChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (sendingChainId === 10) {
      const gasPriceMainnet = await chainReader.getGasPrice(1, requestContext);
      l1GasInUsd = gasPriceMainnet.mul(GAS_ESTIMATES.fulfillL1).mul(ethPriceInSendingChain);
    }
    const gasAmountInUsd = gasPriceInSendingChain.mul(gasLimitForFulfill).mul(ethPriceInSendingChain).add(l1GasInUsd);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    totalCost = totalCost.add(tokenAmountForGasFee);
    logger.info("Calculated cost on sending chain", requestContext, methodContext, {
      totalCost: totalCost.toString(),
      l1GasInUsd: l1GasInUsd.toString(),
      ethPriceInSendingChain: ethPriceInSendingChain.toString(),
      receivingTokenPrice: receivingTokenPrice.toString(),
      gasPriceInSendingChain: gasPriceInSendingChain.toString(),
    });
  }

  if (chaindIdsForGasFee.includes(receivingChainId)) {
    const gasLimitForPrepare = BigNumber.from(GAS_ESTIMATES.prepare);
    const [ethPriceInReceivingChain, receivingTokenPrice, gasPriceInReceivingChain] = await Promise.all([
      getTokenPrice(tokenPricingReceivingChain, constants.AddressZero, chainReader, receivingOracleContractAddress),
      getTokenPrice(tokenPricingReceivingChain, receivingAssetId, chainReader, receivingOracleContractAddress),
      chainReader.getGasPrice(receivingChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (receivingChainId === 10) {
      const gasPriceMainnet = await chainReader.getGasPrice(1, requestContext);
      l1GasInUsd = gasPriceMainnet.mul(GAS_ESTIMATES.prepareL1).mul(ethPriceInReceivingChain);
    }
    const gasAmountInUsd = gasPriceInReceivingChain
      .mul(gasLimitForPrepare)
      .mul(ethPriceInReceivingChain)
      .add(l1GasInUsd);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    totalCost = totalCost.add(tokenAmountForGasFee);
    logger.info("Calculated cost on receiving chain", requestContext, methodContext, {
      totalCost: totalCost.toString(),
      tokenAmountForGasFee: tokenAmountForGasFee.toString(),
      l1GasInUsd: l1GasInUsd.toString(),
      ethPriceInSendingChain: ethPriceInReceivingChain.toString(),
      receivingTokenPrice: receivingTokenPrice.toString(),
      gasPriceInSendingChain: gasPriceInReceivingChain.toString(),
    });
  }

  // convert back to the intended decimals
  return totalCost;
};

/**
 * Helper to calculate router gas fee in token for meta transaction
 *
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @param outputDecimals Decimal number of receiving asset
 * @param requestContext Request context instance
 */
export const calculateGasFeeInReceivingTokenForFulfill = async (
  receivingAssetId: string,
  receivingChainId: number,
  outputDecimals: number,
  chainReader: ChainReader,
  receivingOracleContractAddress: string,
  logger: Logger,
  _requestContext: RequestContext,
): Promise<BigNumber> => {
  const { requestContext, methodContext } = createLoggingContext(
    calculateGasFeeInReceivingTokenForFulfill.name,
    _requestContext,
  );
  logger.info("Method start", requestContext, methodContext, {
    receivingAssetId,
    receivingChainId,
    outputDecimals,
  });
  const chaindIdsForGasFee = getDeployedChainIdsForGasFee();

  if (!chaindIdsForGasFee.includes(receivingChainId)) return constants.Zero;
  let totalCost = constants.Zero;

  const tokenPricingReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId) ? 1 : receivingChainId;

  if (chaindIdsForGasFee.includes(receivingChainId)) {
    const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
    const [ethPriceInReceivingChain, receivingTokenPrice, gasPriceInReceivingChain] = await Promise.all([
      getTokenPrice(tokenPricingReceivingChain, constants.AddressZero, chainReader, receivingOracleContractAddress),
      getTokenPrice(tokenPricingReceivingChain, receivingAssetId, chainReader, receivingOracleContractAddress),
      chainReader.getGasPrice(receivingChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (receivingChainId === 10) {
      const gasPriceMainnet = await chainReader.getGasPrice(1, requestContext);
      l1GasInUsd = gasPriceMainnet.mul(GAS_ESTIMATES.prepareL1).mul(ethPriceInReceivingChain);
    }

    const gasAmountInUsd = gasPriceInReceivingChain
      .mul(gasLimitForFulfill)
      .mul(ethPriceInReceivingChain)
      .add(l1GasInUsd);
    const tokenAmountForGasFee = receivingTokenPrice.isZero()
      ? constants.Zero
      : gasAmountInUsd.div(receivingTokenPrice).div(BigNumber.from(10).pow(18 - outputDecimals));

    logger.info("Calculated cost on receiving chain for fulfill", requestContext, methodContext, {
      totalCost: totalCost.toString(),
      tokenAmountForGasFee: tokenAmountForGasFee.toString(),
      l1GasInUsd: l1GasInUsd.toString(),
      ethPriceInReceivingChain: ethPriceInReceivingChain.toString(),
      receivingTokenPrice: receivingTokenPrice.toString(),
      gasPriceInReceivingChain: gasPriceInReceivingChain.toString(),
    });

    totalCost = totalCost.add(tokenAmountForGasFee);
  }

  return totalCost;
};
