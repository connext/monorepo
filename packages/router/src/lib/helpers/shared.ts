import {
  getNtpTimeSeconds as _getNtpTimeSeconds,
  RequestContext,
  GAS_ESTIMATES,
  getChainData,
  createLoggingContext,
  getInvariantTransactionDigest,
  getVariantTransactionDigest,
  TransactionData,
  PrepareParams,
  FulfillParams,
  CancelParams,
} from "@connext/nxtp-utils";
import { BigNumber, constants, utils, Contract } from "ethers";
import { Evt } from "evt";

import { Interface } from "ethers/lib/utils";
import {
  TransactionManager as TTransactionManager,
  ConnextPriceOracle as TConnextPriceOracle,
} from "@connext/nxtp-contracts/typechain";
import { Router as TRouter } from "@connext/nxtp-contracts/typechain";

import RouterArtifact from "@connext/nxtp-contracts/artifacts/contracts/Router.sol/Router.json";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import PriceOracleArtifact from "@connext/nxtp-contracts/artifacts/contracts/ConnextPriceOracle.sol/ConnextPriceOracle.json";

import { getDeployedChainIdsForGasFee } from "../../config";

import { NotExistPriceOracle } from "../../lib/errors/contracts";
import { getContext } from "../../router";

import { TransactionStatus } from "../../adapters/subgraph/graphqlsdk";
import { SanitationCheckFailed } from "../../lib/errors/contracts";

const { HashZero } = constants;

const NO_ORACLE_CHAINS: number[] = [];

/**
 * Helper to allow easy mocking
 */
export const getNtpTimeSeconds = async () => {
  return await _getNtpTimeSeconds();
};

export const getContractAddress = (chainId: number): string => {
  const { config } = getContext();
  const nxtpContractAddress = config.chainConfig[chainId]?.transactionManagerAddress;
  if (!nxtpContractAddress) {
    throw new Error(`No contract exists for chain ${chainId}`);
  }
  return nxtpContractAddress;
};

export const getOracleContractAddress = (chainId: number, requestContext: RequestContext): string => {
  const { config } = getContext();
  const oracleContractAddress = config.chainConfig[chainId]?.priceOracleAddress;
  if (!oracleContractAddress) {
    throw new NotExistPriceOracle(chainId, requestContext);
  }
  return oracleContractAddress;
};

export const getRouterContractInterface = () => new Interface(RouterArtifact.abi) as TRouter["interface"];

export const getTxManagerInterface = () =>
  new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];

export const getPriceOracleInterface = () => new Interface(PriceOracleArtifact.abi) as TConnextPriceOracle["interface"];

/**
 * Returns the mainnet equivalent of the given asset on the given chain.
 * @param assetId Address you want mainnet equivalent of
 * @param chainId Chain your asset lives on
 * @returns Address of equivalent asset on mainnet
 */
export const getMainnetEquivalent = async (assetId: string, chainId: number): Promise<string> => {
  const chainData = await getChainData();
  if (!chainData || !chainData.has(chainId.toString())) {
    throw new Error(`No chain data found for ${chainId}`);
  }
  const chain = chainData.get(chainId.toString())!;
  const equiv =
    chain.assetId[utils.getAddress(assetId)] ??
    chain.assetId[assetId.toLowerCase()] ??
    chain.assetId[assetId.toUpperCase()] ??
    chain.assetId[assetId];

  if (!equiv || !equiv.mainnetEquivalent) {
    throw new Error(`No mainnet equivalent found for ${assetId} on ${chainId}`);
  }
  return utils.getAddress(equiv.mainnetEquivalent);
};

/**
 * Returns the decimals of mainnet equivalent of the given asset on the given chain.
 * @param assetId Address you want mainnet equivalent of
 * @param chainId Chain your asset lives on
 * @returns Decimals of equivalent asset on mainnet
 */
export const getMainnetDecimals = async (assetId: string, chainId: number): Promise<number> => {
  const mainnet = await getMainnetEquivalent(assetId, chainId);

  const { txService } = getContext();
  const decimals = await txService.getDecimalsForAsset(1, mainnet);
  return decimals;
};

/**
 * Helper to calculate router gas fee in token
 *
 * @param sendingAssetId The asset address on source chain
 * @param sendingChainId The source chain Id
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @param _outputDecimals Decimal number of receiving asset
 * @param requestContext Request context instance
 */
export const calculateGasFeeInReceivingToken = async (
  sendingAssetId: string,
  sendingChainId: number,
  receivingAssetId: string,
  receivingChainId: number,
  outputDecimals: number,
  _requestContext: RequestContext,
): Promise<BigNumber> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(calculateGasFeeInReceivingToken.name, _requestContext);
  logger.info("Method start", requestContext, methodContext, {
    sendingChainId,
    sendingAssetId,
    receivingAssetId,
    receivingChainId,
    outputDecimals,
  });

  const chaindIdsForGasFee = getChainIdForGasFee();

  if (!chaindIdsForGasFee.includes(sendingChainId) && !chaindIdsForGasFee.includes(receivingChainId))
    return constants.Zero;
  let totalCost = constants.Zero;
  // TODO: this is returning zero when doing a rinkeby to goerli tx. i believe this is because the oracle
  // is not configured for goerli so theres no way to translate the price to goerli
  // TODO: we can combine these into just 2 if statements and remove the repeated logic
  // calculate receiving token amount for gas fee
  // if chaindIdsForGasFee includes only sendingChainId, calculate gas fee for fulfill transactions
  // if chaindIdsForGasFee includes only receivingChainId, calculate gas fee for prepare transactions

  // NOTE: to handle optimism gas fees before oracle is deployed, use mainnet
  // oracle token pricing and optimism gas price
  const tokenPricingSendingChain = NO_ORACLE_CHAINS.includes(sendingChainId) ? 1 : sendingChainId;
  const tokenPricingReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId) ? 1 : receivingChainId;

  const tokenPricingAssetIdSendingChain = NO_ORACLE_CHAINS.includes(sendingChainId)
    ? await getMainnetEquivalent(sendingAssetId, sendingChainId)
    : sendingAssetId;
  const tokenPricingAssetIdReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId)
    ? await getMainnetEquivalent(receivingAssetId, receivingChainId)
    : receivingAssetId;

  logger.info("Getting token prices", requestContext, methodContext, {
    tokenPricingSendingChain,
    tokenPricingReceivingChain,
    tokenPricingAssetIdSendingChain,
    tokenPricingAssetIdReceivingChain,
    outputDecimals,
  });
  if (chaindIdsForGasFee.includes(sendingChainId)) {
    const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
    const [ethPriceInSendingChain, receivingTokenPrice, gasPriceInSendingChain] = await Promise.all([
      getTokenPrice(tokenPricingSendingChain, constants.AddressZero, requestContext),
      getTokenPrice(tokenPricingSendingChain, tokenPricingAssetIdSendingChain, requestContext),
      getGasPrice(sendingChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (sendingChainId === 10) {
      const gasPriceMainnet = await getGasPrice(1, requestContext);
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
      getTokenPrice(tokenPricingReceivingChain, constants.AddressZero, requestContext),
      getTokenPrice(tokenPricingReceivingChain, tokenPricingAssetIdReceivingChain, requestContext),
      getGasPrice(receivingChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (receivingChainId === 10) {
      const gasPriceMainnet = await getGasPrice(1, requestContext);
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
  _requestContext: RequestContext,
): Promise<BigNumber> => {
  const { logger } = getContext();
  const { requestContext, methodContext } = createLoggingContext(calculateGasFeeInReceivingToken.name, _requestContext);
  logger.info("Method start", requestContext, methodContext, {
    receivingAssetId,
    receivingChainId,
    outputDecimals,
  });
  const chaindIdsForGasFee = getChainIdForGasFee();

  if (!chaindIdsForGasFee.includes(receivingChainId)) return constants.Zero;
  let totalCost = constants.Zero;

  const tokenPricingReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId) ? 1 : receivingChainId;

  const tokenPricingAssetIdReceivingChain = NO_ORACLE_CHAINS.includes(receivingChainId)
    ? await getMainnetEquivalent(receivingAssetId, receivingChainId)
    : receivingAssetId;

  if (chaindIdsForGasFee.includes(receivingChainId)) {
    const gasLimitForFulfill = BigNumber.from(GAS_ESTIMATES.fulfill);
    const [ethPriceInReceivingChain, receivingTokenPrice, gasPriceInReceivingChain] = await Promise.all([
      getTokenPrice(tokenPricingReceivingChain, constants.AddressZero, requestContext),
      getTokenPrice(tokenPricingReceivingChain, tokenPricingAssetIdReceivingChain, requestContext),
      getGasPrice(receivingChainId, requestContext),
    ]);

    // https://community.optimism.io/docs/users/fees-2.0.html#fees-in-a-nutshell
    let l1GasInUsd = BigNumber.from(0);
    if (receivingChainId === 10) {
      const gasPriceMainnet = await getGasPrice(1, requestContext);
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

/**
 * Gets token price in usd from price oracle
 *
 * @param chainId The network identifier
 * @param assetId The asset address to get price for
 */
export const getTokenPrice = async (
  chainId: number,
  assetId: string,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();
  const oracleContractAddress = getOracleContractAddress(chainId, requestContext);
  const encodedTokenPriceData = getPriceOracleInterface().encodeFunctionData("getTokenPrice", [assetId]);
  const tokenPrice = await txService.readTx({ chainId, to: oracleContractAddress, data: encodedTokenPriceData });
  return BigNumber.from(tokenPrice);
};

/**
 * Gets gas price in usd
 *
 * @param chainId The network identifier
 * @param requestContext Request context
 * @returns Gas price
 */
export const getGasPrice = async (chainId: number, requestContext: RequestContext): Promise<BigNumber> => {
  const { txService } = getContext();
  const gasPrice = await txService.getGasPrice(chainId, requestContext);
  return gasPrice;
};

/**
 * Gets chain ids to take fee from
 */
export const getChainIdForGasFee = (): number[] => {
  return getDeployedChainIdsForGasFee();
};

export const prepareEvt = new Evt<{ event: any; args: PrepareParams }>(); // TODO: fix types
export const fulfillEvt = new Evt<{ event: any; args: FulfillParams }>();
export const cancelEvt = new Evt<{ event: any; args: CancelParams }>();

export const startContractListeners = (): void => {
  const { config, txService } = getContext();
  Object.entries(config.chainConfig).forEach(async ([_chainId, conf]) => {
    const chainId = Number(_chainId);
    if (conf.routerContractAddress) {
      // needs event listeners for listening to relayed events
      // TODO remove this when we can query gelato for tx receipts
      // alternatively allow listening on the subgraph
      const contract = new Contract(
        conf.transactionManagerAddress,
        TransactionManagerArtifact.abi,
        txService.getProvider(chainId).provider,
      ) as TTransactionManager;

      contract.on("TransactionPrepared", (_user, _router, _transactionId, _txData, _caller, args, event) => {
        prepareEvt.post({ event, args });
      });

      contract.on(
        "TransactionFulfilled",
        (_user, _router, _transactionId, args, _success, _isContract, _returnData, _caller, event) => {
          fulfillEvt.post({ event, args });
        },
      );

      contract.on("TransactionCancelled", (_user, _router, _transactionId, args, _caller, event) => {
        cancelEvt.post({ event, args });
      });
    }
  });
};

export const sanitationCheck = async (
  chainId: number,
  transactionData: TransactionData,
  functionCall: "prepare" | "fulfill" | "cancel",
  _requestContext?: RequestContext<string>,
) => {
  const { txService, contractReader } = getContext();

  const { requestContext, methodContext } = createLoggingContext(
    sanitationCheck.name,
    _requestContext,
    transactionData.transactionId,
  );

  const nxtpContractAddress = getContractAddress(chainId);

  const invariantDigest = getInvariantTransactionDigest({
    receivingChainTxManagerAddress: transactionData.receivingChainTxManagerAddress,
    user: transactionData.user,
    router: transactionData.router,
    initiator: transactionData.initiator,
    sendingAssetId: transactionData.sendingAssetId,
    receivingAssetId: transactionData.receivingAssetId,
    sendingChainFallback: transactionData.sendingChainFallback,
    callTo: transactionData.callTo,
    receivingAddress: transactionData.receivingAddress,
    sendingChainId: transactionData.sendingChainId,
    receivingChainId: transactionData.receivingChainId,
    callDataHash: transactionData.callDataHash,
    transactionId: transactionData.transactionId,
  });

  const encodeVariantTransactionData = getTxManagerInterface().encodeFunctionData("variantTransactionData", [
    invariantDigest,
  ]);

  const variantTransactionDigest = await txService.readTx({
    chainId,
    to: nxtpContractAddress,
    data: encodeVariantTransactionData,
  });

  if (functionCall === "prepare") {
    // variantTransactionDigest exist then transaction is already prepared
    if (variantTransactionDigest !== HashZero) {
      throw new SanitationCheckFailed(functionCall, transactionData.transactionId, chainId, {
        requestContext,
        methodContext,
        variantTransactionDigest,
      });
    }
  } else {
    const expectedVariantDigest = getVariantTransactionDigest({
      amount: transactionData.amount,
      expiry: transactionData.expiry,
      preparedBlockNumber: transactionData.preparedBlockNumber,
    });

    if (expectedVariantDigest === variantTransactionDigest) {
      // All is good, no issues
      return;
    }

    // transaction should be prepared before fulfill
    if (variantTransactionDigest === HashZero) {
      throw new SanitationCheckFailed(functionCall, transactionData.transactionId, chainId, {
        requestContext,
        methodContext,
        variantTransactionDigest,
      });
    }

    // transaction is already fulfilled
    // get expected fulfilled/cancelled variant hash
    const fulfilledOrCancelledVariant = getVariantTransactionDigest({
      amount: transactionData.amount,
      expiry: transactionData.expiry,
      preparedBlockNumber: 0,
    });

    if (variantTransactionDigest === fulfilledOrCancelledVariant) {
      throw new SanitationCheckFailed(functionCall, transactionData.transactionId, chainId, {
        requestContext,
        methodContext,
        variantTransactionDigest,
        fulfilledOrCancelledVariant,
      });
    }

    if (functionCall === "cancel" && chainId === transactionData.sendingChainId) {
      const receivingChainNxtpContractAddress = getContractAddress(transactionData.receivingChainId);

      const receivingChainVariantTransactionDigest = await txService.readTx({
        chainId: transactionData.receivingChainId,
        to: receivingChainNxtpContractAddress,
        data: encodeVariantTransactionData,
      });

      if (receivingChainVariantTransactionDigest === HashZero) {
        // cancel is allowed when no transaction is prepared
        return;
      } else {
        const receivingChainTransaction = await contractReader.getTransactionForChain(
          transactionData.transactionId,
          transactionData.user,
          transactionData.receivingChainId,
        );

        if (receivingChainTransaction?.status === TransactionStatus.Cancelled) {
          // cancel is allowed when transaction is cancelled on receiving chain
          return;
        } else {
          throw new SanitationCheckFailed(functionCall, transactionData.transactionId, chainId, {
            requestContext,
            methodContext,
          });
        }
      }
    }
  }
};
