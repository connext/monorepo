import {
  getNtpTimeSeconds as _getNtpTimeSeconds,
  RequestContext,
  createLoggingContext,
  getInvariantTransactionDigest,
  getVariantTransactionDigest,
  TransactionData,
  multicall as _multicall,
  Call,
  MethodContext,
  ERC20Abi,
} from "@connext/nxtp-utils";
import { getAddress, Interface } from "ethers/lib/utils";
import { BigNumber, constants, utils } from "ethers/lib/ethers";
import {
  TransactionManager as TTransactionManager,
  ConnextPriceOracle as TConnextPriceOracle,
  Router as TRouter,
  ERC20 as TERC20,
} from "@connext/nxtp-contracts/typechain";
import RouterArtifact from "@connext/nxtp-contracts/artifacts/contracts/Router.sol/Router.json";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import PriceOracleArtifact from "@connext/nxtp-contracts/artifacts/contracts/ConnextPriceOracle.sol/ConnextPriceOracle.json";

import { TransactionStatus } from "../../adapters/subgraph/runtime/graphqlsdk";
import { getContext } from "../../router";
import { SanitationCheckFailed } from "../errors";

const { HashZero } = constants;
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

export const getErc20ContractInterface = () => new Interface(ERC20Abi) as TERC20["interface"];
export const getRouterContractInterface = () => new Interface(RouterArtifact.abi) as TRouter["interface"];

export const getTxManagerInterface = () =>
  new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];

export const getPriceOracleInterface = () => new Interface(PriceOracleArtifact.abi) as TConnextPriceOracle["interface"];

/**
 * Returns the mainnet equivalent of the given asset on the given chain from chain data.
 * @param assetId Address you want mainnet equivalent of
 * @param chainId Chain your asset lives on
 * @returns Address of equivalent asset on mainnet
 */
export const getMainnetEquivalentFromChainData = async (assetId: string, chainId: number): Promise<string | null> => {
  const { chainData } = getContext();
  if (!chainData || !chainData.has(chainId.toString())) {
    return null;
  }
  const chain = chainData.get(chainId.toString())!;
  const equiv =
    chain.assetId[utils.getAddress(assetId)] ??
    chain.assetId[assetId.toLowerCase()] ??
    chain.assetId[assetId.toUpperCase()] ??
    chain.assetId[assetId];

  if (!equiv || !equiv.mainnetEquivalent) {
    return null;
  }
  return utils.getAddress(equiv.mainnetEquivalent);
};

/**
 * Returns the mainnet equivalent of the given asset on the given chain
 * Reads from config first, if it fails, tries to read from chain data.
 *
 * @param assetId Address you want mainnet equivalent of
 * @param chainId Chain your asset lives on
 * @returns Address of equivalent asset on mainnet
 */
export const getMainnetEquivalent = async (assetId: string, chainId: number): Promise<string | null> => {
  const { config } = getContext();
  const allowedSwapPool = config.swapPools.find((pool) =>
    pool.assets.find((a) => getAddress(a.assetId) === getAddress(assetId) && a.chainId === chainId),
  );
  if (allowedSwapPool && allowedSwapPool.mainnetEquivalent) {
    return allowedSwapPool.mainnetEquivalent;
  } else {
    return await getMainnetEquivalentFromChainData(assetId, chainId);
  }
};

/**
 *
 * Converts the received amount into the sending asset, assuming 1:1 price
 *
 * @param sendingAssetId The asset address on source chain
 * @param sendingChainId The source chain Id
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @returns
 */
export const getFeesInSendingAsset = async (
  receivedAmount: BigNumber, // receiving asset
  sentAmount: BigNumber,
  sendingAssetId: string,
  sendingChainId: number,
  receivingAssetId: string,
  receivingChainId: number,
): Promise<string> => {
  const { txService } = getContext();
  const [sendingDecimals, receivingDecimals] = await Promise.all([
    txService.getDecimalsForAsset(sendingChainId, sendingAssetId),
    txService.getDecimalsForAsset(receivingChainId, receivingAssetId),
  ]);

  // Convert both to 18 decimals
  const normalizedReceived = receivedAmount.mul(BigNumber.from(10).pow(18 - receivingDecimals));
  const normalizedSending = sentAmount.mul(BigNumber.from(10).pow(18 - sendingDecimals));

  // Assume 1:1 once normalized
  const fees = normalizedSending.sub(normalizedReceived).div(BigNumber.from(10).pow(18 - sendingDecimals));

  // Return in sending decimals
  return fees.toString();
};

/**
 * Helper to calculate router gas fee in token
 *
 * @param sendingAssetId The asset address on source chain
 * @param sendingChainId The source chain Id
 * @param receivingAssetId The asset address on destination chain
 * @param receivingChainId The destination chain Id
 * @param outputDecimals Decimal number of receiving asset
 * @param requestContext Request context instance
 */
export const calculateGasFeeInReceivingToken = async (
  sendingAssetId: string,
  sendingChainId: number,
  receivingAssetId: string,
  receivingChainId: number,
  outputDecimals: number,
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();
  const sendingAssetIdOnMainnet = await getMainnetEquivalent(sendingAssetId, sendingChainId);
  const tokenPricingSendingChain = sendingAssetIdOnMainnet ? 1 : sendingChainId;
  const tokenPricingAssetIdSendingChain = sendingAssetIdOnMainnet ? sendingAssetIdOnMainnet : sendingAssetId;

  const sendingNativeAssetIdOnMainnet = await getMainnetEquivalent(constants.AddressZero, sendingChainId);
  const nativeTokenPricingSendingChain = sendingNativeAssetIdOnMainnet ? 1 : sendingChainId;
  const nativeTokenPricingAssetIdSendingChain = sendingNativeAssetIdOnMainnet
    ? sendingNativeAssetIdOnMainnet
    : constants.AddressZero;

  const receivingAssetIdOnMainnet = await getMainnetEquivalent(receivingAssetId, receivingChainId);
  const tokenPricingReceivingChain = receivingAssetIdOnMainnet ? 1 : receivingChainId;
  const tokenPricingAssetIdReceivingChain = receivingAssetIdOnMainnet ? receivingAssetIdOnMainnet : receivingAssetId;

  const receicingNativeAssetIdOnMainnet = await getMainnetEquivalent(constants.AddressZero, receivingChainId);
  const nativeTokenPricingReceivingChain = receicingNativeAssetIdOnMainnet ? 1 : receivingChainId;
  const nativeTokenPricingAssetIdReceivingChain = receicingNativeAssetIdOnMainnet
    ? receicingNativeAssetIdOnMainnet
    : constants.AddressZero;

  return txService.calculateGasFeeInReceivingToken(
    tokenPricingSendingChain,
    sendingChainId,
    tokenPricingAssetIdSendingChain,
    nativeTokenPricingSendingChain,
    nativeTokenPricingAssetIdSendingChain,
    tokenPricingReceivingChain,
    receivingChainId,
    tokenPricingAssetIdReceivingChain,
    nativeTokenPricingReceivingChain,
    nativeTokenPricingAssetIdReceivingChain,
    outputDecimals,
    requestContext,
  );
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
  requestContext: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();

  const receivingAssetIdOnMainnet = await getMainnetEquivalent(receivingAssetId, receivingChainId);
  const tokenPricingReceivingChain = receivingAssetIdOnMainnet ? 1 : receivingChainId;
  const tokenPricingAssetIdReceivingChain = receivingAssetIdOnMainnet ? receivingAssetIdOnMainnet : receivingAssetId;

  const receicingNativeAssetIdOnMainnet = await getMainnetEquivalent(constants.AddressZero, receivingChainId);
  const nativeTokenPricingReceivingChain = receicingNativeAssetIdOnMainnet ? 1 : receivingChainId;
  const nativeTokenPricingAssetIdReceivingChain = receicingNativeAssetIdOnMainnet
    ? receicingNativeAssetIdOnMainnet
    : constants.AddressZero;

  return txService.calculateGasFeeInReceivingTokenForFulfill(
    tokenPricingReceivingChain,
    receivingChainId,
    tokenPricingAssetIdReceivingChain,
    nativeTokenPricingReceivingChain,
    nativeTokenPricingAssetIdReceivingChain,
    outputDecimals,
    requestContext,
  );
};

/**
 * Helper to calculate gas fee for specific transactions
 *
 * @param chainId The network id that we're going to get gas fee on
 * @param assetId The asset address that we're going to get gas fee in
 * @param decimals Decimal number of assets
 * @param method "prepare" | "fulfill" | "cancel"
 * @param requestContext Request context instance.
 * @param methodContext Method context instance.
 * @param whichChain "sending" | "receiving"
 */
export const calculateGasFee = async (
  chainId: number,
  assetId: string,
  decimals: number,
  method: "prepare" | "fulfill" | "cancel",
  requestContext: RequestContext,
  methodContext: MethodContext,
): Promise<BigNumber> => {
  const { txService, isRouterContract } = getContext();

  const assetIdOnMainnet = await getMainnetEquivalent(assetId, chainId);
  const tokenPricingChain = assetIdOnMainnet ? 1 : chainId;
  const tokenPricingAssetId = assetIdOnMainnet ? assetIdOnMainnet : assetId;

  const nativeAssetIdOnMainnet = await getMainnetEquivalent(constants.AddressZero, chainId);
  const nativeTokenPricingChain = nativeAssetIdOnMainnet ? 1 : chainId;
  const nativeTokenPricingAssetId = nativeAssetIdOnMainnet ? nativeAssetIdOnMainnet : constants.AddressZero;

  const gasFeeRes = await txService.calculateGasFee(
    tokenPricingChain,
    chainId,
    tokenPricingAssetId,
    nativeTokenPricingChain,
    nativeTokenPricingAssetId,
    decimals,
    method,
    isRouterContract,
    requestContext,
    methodContext,
  );

  return gasFeeRes;
};

export const getTokenPriceFromOnChain = async (
  chainId: number,
  assetId: string,
  requestContext?: RequestContext,
): Promise<BigNumber> => {
  const { txService } = getContext();
  return txService.getTokenPriceFromOnChain(chainId, assetId, requestContext);
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
/**
 * Runs multiple calls at a time, call data should be read methods. used to make it easier for sinon mocks to happen in test cases.
 *
 * @param abi - The ABI data of target contract
 * @param calls - The call data what you want to read from contract
 * @param multicallAddress - The address of multicall contract deployed to configured chain
 * @param rpcUrl - The rpc endpoints what you want to call with
 *
 * @returns Array in ethers.BigNumber
 */
export const multicall = async (abi: any[], calls: Call[], multicallAddress: string, rpcUrl: string) => {
  return await _multicall(abi, calls, multicallAddress, rpcUrl);
};

export const isRouterWhitelisted = async (routerAddress: string, chainId: number): Promise<boolean> => {
  const { txService } = getContext();
  const nxtpContractAddress = getContractAddress(chainId);

  const encodeApprovedRoutersData = getTxManagerInterface().encodeFunctionData("approvedRouters", [routerAddress]);

  const approvedRoutersEncoded = await txService.readTx({
    chainId,
    to: nxtpContractAddress,
    data: encodeApprovedRoutersData,
  });

  const [result] = getTxManagerInterface().decodeFunctionResult("approvedRouters", approvedRoutersEncoded);

  return result;
};
