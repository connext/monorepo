import { providers, constants, BigNumber, utils } from "ethers";
import { domainToChainId } from "@connext/nxtp-utils";

import { SwapAndXCallParams } from "../../types";
import { getSwapAndXCallInterface } from "../../interfaces";
import { OriginSwapDataFns, OriginSwapperPerDomain, DEPLOYED_ADDRESSES } from "../../helpers";

/**
 * Prepares `SwapAndXCall` inputs and encodes the calldata. Returns `providers.TransactionRequest` object to be sent to the RPC provider.
 *
 * @param originDomain - The origin domain ID.
 * @param destinationDomain - The destination domain ID.
 * @param fromAsset - The address of the asset to swap from.
 * @param toAsset - The address of the asset to swap to.
 * @param amountIn - The number of `fromAsset` tokens.
 * @param to - The address to send the asset and call with the calldata on the destination.
 * @param delegate - (optional) The fallback address on the destination domain which defaults to `to`.
 * @param slippage - (optional) Maximum acceptable slippage in BPS which defaults to 300. For example, a value of 300 means 3% slippage.
 * @param route - (optional) The address of the `swapper` contract and the data to call the swapper contract with
 * @param calldata - (optional) The calldata to execute (can be empty: "0x").
 *
 * @param signerAddress - The address of the signer to send a transaction from
 * @param config - (optional) Contains API key for oneInch to generate swapData
 */
export const prepareSwapAndXCall = async (
  params: SwapAndXCallParams,
  signerAddress: string,
  config?:
    | {
        customURL: string;
        apiKey?: string;
      }
    | {
        customURL?: undefined;
        apiKey: string;
      },
): Promise<providers.TransactionRequest | undefined> => {
  let txRequest: providers.TransactionRequest | undefined = undefined;

  try {
    const {
      originDomain,
      destinationDomain,
      fromAsset,
      toAsset,
      amountIn,
      to,
      delegate: _delegate,
      slippage: _slippage,
      route: _route,
      callData: _callData,
      relayerFeeInNativeAsset: _relayerFeeInNativeAsset,
      relayerFeeInTransactingAsset: _relayerFeeInTransactingAsset,
    } = params;

    const delegate = _delegate ?? to;
    const slippage = _slippage ?? "300";
    const relayerFeeInNativeAsset = _relayerFeeInNativeAsset
      ? BigNumber.from(_relayerFeeInNativeAsset)
      : constants.Zero;
    const relayerFeeInTransactingAsset = _relayerFeeInTransactingAsset
      ? BigNumber.from(_relayerFeeInTransactingAsset)
      : constants.Zero;

    const callData = _callData ?? "0x";

    const swapAndXCallInterface = getSwapAndXCallInterface();

    const swapAndXCallAddress = DEPLOYED_ADDRESSES.swapandxcall[originDomain];
    if (!swapAndXCallAddress) {
      console.log(`SwapAndXCall contract not deployed on domain: ${originDomain}`);
      return txRequest;
    }

    const isSameAsset = utils.getAddress(toAsset) === utils.getAddress(fromAsset);
    const originRoute = !isSameAsset
      ? _route ??
        (await calculateRouteForSwapAndXCall(originDomain, fromAsset, toAsset, amountIn, swapAndXCallAddress, config))
      : null;

    const feeInNativeAsset = relayerFeeInTransactingAsset.eq(0) ?? false;
    let swapAndXCallData: string;

    const msgValue =
      fromAsset == constants.AddressZero
        ? BigNumber.from(amountIn).add(relayerFeeInNativeAsset)
        : relayerFeeInNativeAsset;

    const chainId = domainToChainId(+originDomain);

    if (feeInNativeAsset) {
      const formattedArguments: [string, string, BigNumber, string, string, string, string, string, string, string] = [
        fromAsset,
        toAsset,
        BigNumber.from(amountIn),
        originRoute ? originRoute.swapper : constants.AddressZero,
        originRoute ? originRoute.swapData : "0x",
        destinationDomain,
        to,
        delegate,
        slippage,
        callData,
      ];

      swapAndXCallData = swapAndXCallInterface.encodeFunctionData(
        "swapAndXCall(address,address,uint256,address,bytes,uint32,address,address,uint256,bytes)",
        formattedArguments,
      );
    } else {
      const formattedArguments: [
        string,
        string,
        BigNumber,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
      ] = [
        fromAsset,
        toAsset,
        BigNumber.from(amountIn),
        originRoute ? originRoute.swapper : constants.AddressZero,
        originRoute ? originRoute.swapData : "0x",
        destinationDomain,
        to,
        delegate,
        slippage,
        callData,
        relayerFeeInTransactingAsset.toString(),
      ];

      swapAndXCallData = swapAndXCallInterface.encodeFunctionData(
        "swapAndXCall(address,address,uint256,address,bytes,uint32,address,address,uint256,bytes,uint256)",
        formattedArguments,
      );
    }

    txRequest = {
      to: swapAndXCallAddress,
      value: msgValue,
      data: swapAndXCallData,
      from: signerAddress,
      chainId,
    };
  } catch (e: unknown) {
    console.error(e);
  }

  return txRequest;
};

/**
 * Calculates the best route (swapper and swapdata) to return the highest `amountOut` for the `SwapAndXCall` contract call.
 *
 * @param domainId - The origin domain
 * @param fromAsset - The address of the asset to swap from.
 * @param toAsset - The address of the asset to swap to.
 * @param amountIn - The number of `fromAsset` tokens.
 * @param config - (optional) Contains API key for oneInch to generate swapData
 *
 * @returns swapper - The address of the swapper contract, swapData - The calldata to be executed
 */
export const calculateRouteForSwapAndXCall = async (
  domainId: string,
  fromAsset: string,
  toAsset: string,
  amountIn: string,
  fromAddress: string,
  config?:
    | {
        customURL: string;
        apiKey?: string;
      }
    | {
        customURL?: undefined;
        apiKey: string;
      },
): Promise<{ swapper: string; swapData: string }> => {
  // TODO: The `swapper` is the smart contract interacting with different types of DEXes and DEX aggregators such as UniV2, UniV3, 1inch Aggregator
  // so we can have more than one `swapper` contract deployed on each domain.
  // Its important to figure out which swapper we choose for the `xcall` callers.
  //
  // [] What is the ideal solution here?
  //    We may choose the swapper based on the estimated output for a given `amountIn` when they want to xcall.
  //
  // [] What can be done for a quick solution?
  //    We can have a swapper contract deployed per domain. It would still work even if the `amountOut` wouldn't be the best.
  //
  // That seems enough to go ahead with a quick solution as of now but we will definitely update the function over time to make it ideal

  const swapperConfig = OriginSwapperPerDomain[domainId];
  if (!swapperConfig) {
    throw new Error(`Swapper config not found for domain: ${domainId}`);
  }
  const chainId = domainToChainId(+domainId);
  const originOriginSwapDataCallbackFn = OriginSwapDataFns[swapperConfig.type];
  const swapData = await originOriginSwapDataCallbackFn({ chainId, fromAsset, toAsset, amountIn, fromAddress, config });

  return { swapper: swapperConfig.address, swapData };
};
