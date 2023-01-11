import { constants, providers, BigNumber, utils } from "ethers";
import {
  Logger,
  createLoggingContext,
  ChainData,
  WETHAbi,
  MultisendTransaction,
  encodeMultisendCall,
} from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { getChainData, getChainIdFromDomain, calculateRelayerFee } from "./lib/helpers";
import { SignerAddressMissing, ChainDataUndefined, CannotUnwrapOnDestination } from "./lib/errors";
import { NxtpSdkConfig, getConfig } from "./config";
import { NxtpSdkShared } from "./sdkShared";
import { NxtpSdkXCallArgs } from "./interfaces";

/**
 * @classdesc SDK class encapsulating bridge functions.
 */
export class NxtpSdkBase extends NxtpSdkShared {
  private static _instance: NxtpSdkBase;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
  }

  static async create(
    _config: NxtpSdkConfig,
    _logger?: Logger,
    _chainData?: Map<string, ChainData>,
  ): Promise<NxtpSdkBase> {
    const chainData = _chainData ?? (await getChainData());
    if (!chainData) {
      throw new ChainDataUndefined();
    }

    const nxtpConfig = await getConfig(_config, contractDeployments, chainData);
    const logger = _logger
      ? _logger.child({ name: "NxtpSdkBase" })
      : new Logger({ name: "NxtpSdkBase", level: nxtpConfig.logLevel });

    return this._instance || (this._instance = new NxtpSdkBase(nxtpConfig, logger, chainData));
  }

  /**
   * Check, sanitize, and format the XCall and encode calldata. Returns an ethers TransactionRequest object, ready
   * to be sent to an RPC provider.
   *
   * @param args - XCall arguments. Some fields in args.params are optional and have default values provided.
   * @param args.wrapNativeOnOrigin - Whether we should wrap the native token before sending the xcall. This will
   * use the Multisend utility contract to deposit ETH, approve Connext as a spender, and call xcall.
   * @param args.unwrapNativeOnDestination - Whether we should unwrap the wrapped native token when the transfer
   * reaches its destination. By default, if sending a wrapped native token, the wrapped token is what gets
   * delivered at the destination. Setting this to `true` means we should overwrite `callData` to target the
   * Unwrapper utility contract, which will unwrap the wrapped native token and deliver it to the target
   * recipient (the `to` address).
   * @param args.asset - The target asset to send with the xcall. Can be set to `address(0)` if this is a 0-value
   * transfer. If `wrapNativeOnOrigin` is true, this should be the target wrapper contract (e.g. WETH) address.
   * @param args.amount - The amount of tokens (in specified asset) to send with the xcall. If `wrapNativeOnOrigin`
   * is true, this will be used as the amount of native token to deposit into the wrapper contract and withdraw
   * as wrapped native token for sending (e.g. deposit ETH to the WETH contract in exchange for the WETH ERC20).
   * @returns providers.TransactionRequest object.
   */
  async xcall(args: NxtpSdkXCallArgs): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.xcall.name);
    this.logger.info("Method start", requestContext, methodContext, { args });

    const {
      origin,
      relayerFee: _relayerFee,
      destination,
      asset,
      amount: _amount,
      slippage,
      receiveLocal,
      wrapNativeOnOrigin,
      unwrapNativeOnDestination,
    } = args;
    let { to } = args;

    // Ensure signer is provided.
    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }
    // Get the origin chain ID.
    const chainId = await this.getChainId(origin);
    // Get Connext address for origin.
    const connextContractAddress = await this.getDeploymentAddress(origin, "connext");

    /// MARK - Validate arguments.
    // If address(0) provided for asset, must be a 0-value transfer.
    if (asset === constants.AddressZero && _amount !== "0") {
      // TODO: Custom error.
      throw new Error("Transacting asset specified was address zero; native assets are not supported!");
    }
    // Valid (non-zero) recipient must be provided.
    if (to === constants.AddressZero) {
      // TODO: Custom error.
      throw new Error("Valid recipient `to` address must be provided; received address(0) as recipient.");
    }

    // Sanitize arguments. Substitute default values as needed.
    const amount = BigNumber.from(_amount);
    let callData = args.callData ?? "0x";
    const delegate = args.delegate ?? to; // Default to using the recipient address as the delegate.
    const relayerFee = BigNumber.from(_relayerFee ?? "0");
    // TODO: Calculate estimate for relayer fee and include it in the call params.
    // TODO: Should additionally make sure the asset is set to address(0) if the amount is 0.
    // TODO: Use ajv validator.

    if (unwrapNativeOnDestination) {
      // Sanity check: We'll need to overwrite the callData with an unwrapping call. If a `callData` argument
      // is also specified, we throw to ensure the user's callData isn't being overwritten unexpectedly.
      // TODO: Implement an xReceive Multisend call to have the option to combine the unwrapping AND the user's
      // original callData!
      if (callData !== "0x") {
        throw new CannotUnwrapOnDestination("`callData` argument must be empty!" + ` callData specified: ${callData}`);
      }
      // NOTE: We don't need to check on-chain to ensure destination Unwrapper supports unwrapping the
      // target native token; if it didn't, it wouldn't be deployed and therefore wouldn't be configured.

      // Sanity check: `receiveLocal` must be false.
      if (receiveLocal) {
        throw new CannotUnwrapOnDestination("`receiveLocal` is set to true.");
      }

      // Retrieve destination unwrapper xReceive utility contract (will throw if it has not been configured).
      const unwrapperContractAddress = await this.getDeploymentAddress(destination, "unwrapper");

      // Set the `callData` to the unwrap method. Specify `to`: the preserved original recipient.
      // NOTE: Super important, this is how we preserve the original recipient here. We CANNOT rely on
      // `originSender` to be the recipient on destination, as the `originSender` could be a contract (e.g.
      // Multisend, in the case of wrapping ETH on origin).
      callData = utils.defaultAbiCoder.encode(["address"], [to]);
      // Now we can overwrite the `to` address to be the target unwrapper contract.
      to = unwrapperContractAddress;
    }

    // Take the finalized xcall arguments and encode calldata.
    // NOTE: Using a tuple here to satisfy compiler for `encodeFunctionData` call below.
    const formattedArguments: [string, string, string, string, BigNumber, string, string] = [
      destination,
      to,
      asset,
      delegate,
      amount,
      slippage,
      callData,
    ];
    const xcallData = receiveLocal
      ? this.contracts.connext.encodeFunctionData("xcallIntoLocal", formattedArguments)
      : this.contracts.connext.encodeFunctionData("xcall", formattedArguments);

    let txRequest: providers.TransactionRequest;
    if (wrapNativeOnOrigin) {
      /**
       * Wrapping native on origin:
       * Produce a singular transaction that will first wrap the native token and then send an XCall with the
       * wrapped native token (e.g. wrap ETH, xcall WETH). This single transaction relies on the Multisend
       * utility contract (deployed by Connext).
       */
      // Get multisend utility contract (will throw if it has not been configured).
      const multisendContractAddress = await this.getDeploymentAddress(origin, "multisend");
      // ERC20Wrapper interface for deposit/withdraw.
      const weth = new utils.Interface(WETHAbi);

      const txs: MultisendTransaction[] = [];

      // 1. WETH.deposit(amount)
      txs.push({
        to: asset,
        data: weth.encodeFunctionData("deposit"),
        value: amount,
      });

      // 2. WETH.approve(connext)
      txs.push({
        to: asset,
        data: weth.encodeFunctionData("approve", [connextContractAddress, amount]),
      });

      // 3. xcall(args)
      txs.push({
        to: connextContractAddress,
        data: xcallData,
        value: relayerFee,
      });

      // 5. Format Multisend call in an ethers TransactionRequest object.
      txRequest = {
        to: multisendContractAddress,
        value: amount.add(relayerFee), // Amount in ETH (which will be converted to WETH) + ETH for xcall relayer fee.
        data: encodeMultisendCall(txs),
        from: signerAddress,
        chainId,
      };
    } else {
      // Add callback and relayer fee together to get the total ETH value that should be sent.
      const value = BigNumber.from(relayerFee ?? "0");

      // Format the ethers TransactionRequest object.
      txRequest = {
        to: connextContractAddress,
        value,
        data: xcallData,
        from: signerAddress,
        chainId,
      };
    }

    this.logger.info("XCall transaction formatted.", requestContext, methodContext, {
      args: { ...args, callData, delegate },
      to: txRequest.to,
      from: txRequest.from,
      value: txRequest.value?.toString(),
    });

    return txRequest;
  }

  /**
   * Bump the relayer fee bid for a specified transfer.
   *
   * @param params.domainId - The origin domain of the xcall.
   * @param params.transferId - The sent xcall's transfer ID value.
   * @param params.relayerFee - The amount by which to increase the relayer fee bid in native token (ETH).
   */
  async bumpTransfer(params: {
    domainId: string;
    transferId: string;
    relayerFee: string;
  }): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.bumpTransfer.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const { domainId, transferId, relayerFee } = params;

    let chainId = this.config.chains[domainId].chainId;
    if (!chainId) {
      chainId = await getChainIdFromDomain(domainId, this.chainData);
    }
    const ConnextContractAddress = (await this.getConnext(domainId)).address;

    // if asset is AddressZero then we are adding relayerFee to amount for value
    const value = BigNumber.from(relayerFee);

    const data = this.contracts.connext.encodeFunctionData("bumpTransfer", [transferId]);

    const txRequest = {
      to: ConnextContractAddress,
      value,
      data,
      from: signerAddress,
      chainId,
    };

    this.logger.info(`${this.bumpTransfer.name} transaction created`, requestContext, methodContext, txRequest);

    return txRequest;
  }

  async estimateRelayerFee(params: {
    originDomain: string;
    destinationDomain: string;
    originNativeToken?: string;
    destinationNativeToken?: string;
    callDataGasAmount?: number;
    isHighPriority?: boolean;
  }): Promise<BigNumber> {
    const { requestContext, methodContext } = createLoggingContext(this.estimateRelayerFee.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const relayerFeeInOriginNativeAsset = await calculateRelayerFee(params, this.chainData, this.logger);

    return relayerFeeInOriginNativeAsset;
  }
}
