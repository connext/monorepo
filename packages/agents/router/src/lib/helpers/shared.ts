import {
  CrossChainTx,
  RequestContext,
  FulfilledTransaction,
  createLoggingContext,
  getExternalCallHash,
  getReconciledHash,
  ChainData,
} from "@connext/nxtp-utils";
import { getTransactionManagerAddress, getTxManagerInerface } from ".";
import { getContext } from "../../router";
import { BigNumber, constants } from "ethers";

import { SanitationCheckFailed } from "../errors";

export const sanitationCheck = async (
  transactionData: CrossChainTx,
  functionCall: "prepare" | "fulfill" | "reconcile",
  _requestContext?: RequestContext<string>,
) => {
  const {
    adapters: { txservice },
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(sanitationCheck.name);

  if (functionCall === "fulfill") {
    // Check out if this transaction provides fast liquidity
    // TransactionManager.sol:  bool _isFast = reconciledTransactions[_transactionId] == bytes32(0);
    const transactionId = transactionData.transactionId;
    const txManagerContractAddress = getTransactionManagerAddress(transactionData.destinationDomain);
    const encodeReconciledTransaction = getTxManagerInerface().encodeFunctionData("reconciledTransactions", [
      transactionId,
    ]);
    const reconciledTxHash = await txservice.readTx({
      chainId: parseInt(transactionData.destinationDomain),
      to: txManagerContractAddress,
      data: encodeReconciledTransaction,
    });

    const isFast = reconciledTxHash == constants.HashZero;

    // If the transaction provides fast liquidity, ensure it has not been fulfilled already
    // If not, check the reconciled transactions to ensur it is the right data
    if (isFast) {
      const encodeRoutedTransaction = getTxManagerInerface().encodeFunctionData("routedTransactions", [transactionId]);
      const fulfilledTxEncoded = await txservice.readTx({
        chainId: parseInt(transactionData.destinationDomain),
        to: txManagerContractAddress,
        data: encodeRoutedTransaction,
      });
      const [fulfillTx] = getTxManagerInerface().decodeFunctionResult("routedTransactions", fulfilledTxEncoded);

      const fulfillTxTyped = fulfillTx as FulfilledTransaction;
      if (fulfillTx != constants.AddressZero && fulfillTxTyped.router != constants.AddressZero) {
        throw new SanitationCheckFailed("fulfill", transactionId, transactionData.destinationDomain, {
          requestContext,
          methodContext,
        });
      }
    } else {
      /// TODO: Not implemented yet
      // const externalCallHash = getExternalCallHash({
      //   recipient: transactionData.recipient,
      //   callData: transactionData.callData,
      //   callTo: transactionData.callTo,
      // });
      // const _reconciledTxHash = getReconciledHash({
      //   externalHash: externalCallHash,
      //   local: transactionData.fulfillLocalAsset,
      //   amount: transactionData.fulfillLocalAsset,
      //   recipient: transactionData.recipient,
      // });
      // const [decodedReconciledTxHash] = getTxManagerInerface().decodeFunctionResult(
      //   "reconciledTransactions",
      //   reconciledTxHash,
      // );
      // if (_reconciledTxHash !== decodedReconciledTxHash) {
      //   throw new SanitationCheckFailed("fulfill", transactionId, chainId, {
      //     requestContext,
      //     methodContext,
      //     message: "Reconciled TxHash doesn't match",
      //   });
      // }
    }
  } else if (functionCall == "reconcile") {
    // This function is called by the bridge router to pass through the information provided by the user on prepare.
  }
};

/**
 * Returns transacting asset address on destination domain corresponding to transacting asset on origin domain
 *
 * @param originDomain The domain for sending chain
 * @param originTransactingAsset The asset the caller sent with the transaction
 * @param destinationDomain The domain for receiving chain
 * @returns
 */
export const getDestinationTransactingAsset = async (
  originDomain: string,
  originTransactingAsset: string,
  destinationDomain: string,
): Promise<string> => {
  // TODO: Not implemented yet
  return originTransactingAsset;
};

/**
 * Returns local asset address on destination domain corresponding to local asset on origin domain
 *
 * @param originDomain
 * @param originLocalAsset The asset sent over the bridge
 * @param destinationDomain
 * @returns
 */
export const getDestinationLocalAsset = async (
  originDomain: string,
  originLocalAsset: string,
  destinationDomain: string,
): Promise<string> => {
  // TODO: Not implemented yet
  return originLocalAsset;
};

/**
 * Returns input amount to get `amountOut` in `outputAsset` on `domain` through stable swap
 *
 * @param amountOut The output amount to get
 * @param domain The domain that we're getting tokens on
 * @param outputAsset The output asset address
 * @param inputAsset The input asset address
 */
export const getAmountIn = async (
  amountOut: string,
  domain: string,
  outputAsset: string,
  inputAsset: string,
): Promise<string> => {
  // TODO: moved to utils after everything done correctly
  return amountOut;
};

/**
 * Returns output amount in `outputAsset` to get by swapping `amountIn` input asset through stable swap
 *
 * @param amountIn The input amount to swap
 * @param domain The domain that we're getting tokens on
 * @param outputAsset The output asset address
 * @param inputAsset The input asset address
 * @returns
 */
export const getAmountOut = async (
  amountIn: string,
  domain: string,
  outputAsset: string,
  inputAsset: string,
): Promise<string> => {
  // TODO: moved to utils after everything done correctly
  return amountIn;
};

/**
 * Returns the decimal number of `asset` on `doamin` network.
 *
 * @param domain The network identifier that we're getting the asset decimal on
 * @param asset The asset address
 * @returns The decimal number of asset
 */
export const getDecimalsForAsset = async (domain: string, asset: string): Promise<number> => {
  // TODO. Not implemented yet, it should be updated once txservice is updated for domain schema
  return 18;
};

/**
 * Calculates total router gas fee in token.
 *
 * @param originDomain The origin domain
 * @param originAssetId The asset address on origin domain network
 * @param destinationDomain The destination domain
 * @param destinationAssetId The asset address on destination domain network
 * @param outputDecimals Decimal number of destination asset
 * @param _requestContext Request context instance
 */
export const calculateGasFeeInReceivingToken = async (
  originDomain: string,
  originAssetId: string,
  destinationDomain: string,
  destinationAssetId: string,
  outputDecimals: number,
  chainData?: Map<string, ChainData>,
  _requestContext?: RequestContext,
): Promise<BigNumber> => {
  // TODO. Not implemented yet

  return BigNumber.from("0");
};
