import { constants, providers, BigNumber, BigNumberish, utils } from "ethers";
import {
  Logger,
  createLoggingContext,
  ChainData,
  WETHAbi,
  MultisendTransaction,
  encodeMultisendCall,
  ajv,
} from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

export type logger = Logger;

import { calculateRelayerFee } from "./lib/helpers";
import {
  SignerAddressMissing,
  CannotUnwrapOnDestination,
  ParamsInvalid,
  SlippageInvalid,
  ProviderMissing,
} from "./lib/errors";
import { SdkConfig, getConfig, LOCKBOX_ADAPTER_DOMAIN_ADDRESS } from "./config";
import { SdkShared } from "./sdkShared";
import {
  SdkXCallParamsSchema,
  SdkXCallParams,
  SdkBumpTransferParamsSchema,
  SdkBumpTransferParams,
  SdkUpdateSlippageParamsSchema,
  SdkUpdateSlippageParams,
  SdkEstimateRelayerFeeParamsSchema,
  SdkEstimateRelayerFeeParams,
} from "./interfaces";
import { SdkUtils } from "./sdkUtils";
import { SdkPool } from "./sdkPool";

/**
 * @classdesc SDK class encapsulating bridge functions.
 *
 */
export class SdkBase extends SdkShared {
  private static _instance: SdkBase;

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
  }

  /**
   * Create a singleton instance of the SdkBase class.
   *
   * @param _config - SdkConfig object.
   * @param _config.chains - Chain config, at minimum with providers for each chain.
   * @param _config.signerAddress - Signer address for transactions.
   * @param _config.logLevel - (optional) Logging severity level.
   * @param _config.network - (optional) Blockchain environment to interact with.
   * @returns providers.TransactionRequest object.
   *
   * @example:
   * ```ts
   * import { SdkBase } from "@connext/sdk";
   *
   * const config = {
   *   "chains": {
   *     "6648936": {
   *       "providers": ["https://rpc.ankr.com/eth"]
   *     },
   *     "1869640809": {
   *       "providers": ["https://mainnet.optimism.io"]
   *     },
   *     "1886350457": {
   *       "providers": ["https://polygon-rpc.com"]
   *     },
   *   },
   *   "signerAddress": "<wallet_address>",
   * }
   *
   * const sdkBase = await SdkBase.create(config);
   * ```
   */

  static async create(_config: SdkConfig, _logger?: Logger, _chainData?: Map<string, ChainData>): Promise<SdkBase> {
    const { nxtpConfig, chainData } = await getConfig(_config, contractDeployments, _chainData);
    const logger = _logger
      ? _logger.child({ name: "SdkBase" })
      : new Logger({ name: "SdkBase", level: nxtpConfig.logLevel });

    return (this._instance = new SdkBase(nxtpConfig, logger, chainData));
  }

  async memoizeConversionRate(): Promise<any> {
    Object.keys(this.config.chains).map(async (domain) => {
      const chainId = await this.getChainId(domain);
      this.getConversionRate(chainId);
    });
  }
  /**
   * Prepares xcall inputs and encodes the calldata. Returns an ethers TransactionRequest object, ready
   * to be sent to an RPC provider.
   *
   * @param params - SdkXCallParams object.
   * @param params.origin - The origin domain ID.
   * @param params.destination - The destination domain ID.
   * @param params.to - Address receiving funds or the target contract.
   * @param params.asset - (optional) The target asset to send with the xcall. Can be set to `address(0)` if this is a 0-value
   * transfer. If `wrapNativeOnOrigin` is true, this should be the target wrapper contract (e.g. WETH) address.
   * @param params.delegate - (optional) Address allowed to cancel an xcall on destination.
   * @param params.amount - (optional) The amount of tokens (in specified asset) to send with the xcall. If `wrapNativeOnOrigin`
   * is true, this will be used as the amount of native token to deposit into the wrapper contract and withdraw
   * as wrapped native token for sending (e.g. deposit ETH to the WETH contract in exchange for the WETH ERC20).
   * @param params.slippage - (optional) Maximum acceptable slippage in BPS. For example, a value of 30 means 0.3% slippage.
   * @param params.callData - (optional) Calldata to execute (can be empty: "0x").
   * @param params.relayerFee - (optional) Fee paid to relayers, in native asset on origin. Use `calculateRelayerFee` to estimate.
   * @param params.receiveLocal - (optional) Whether to receive the local asset ("nextAsset").
   * @param params.wrapNativeOnOrigin - (optional) Whether we should wrap the native token before sending the xcall. This will
   * use the Multisend utility contract to deposit ETH, approve Connext as a spender, and call xcall. If set true, `asset` should
   * be the target wrapper contract (e.g. WETH) address.
   * @param params.unwrapNativeOnDestination - (optional) Whether we should unwrap the wrapped native token when the transfer
   * reaches its destination. By default, if sending a wrapped native token, the wrapped token is what gets delivered at the
   * destination. Setting this to `true` means we should overwrite `callData` to target the Unwrapper utility contract, which
   * will unwrap the wrapped native token and deliver it to the target recipient (the `to` address).
   * @returns providers.TransactionRequest object.
   *
   * @example
   * ```ts
   * // call SdkBase.create(), instantiate a signer
   *
   *
   * [case 1] If a user wants to pay a fee in the native asset, you can put params for `xcall` method as the following.
   *
   * const params = {
   *   origin: "6648936"
   *   destination: "1869640809"
   *   to: "0x3cEe6c5c0fB713925BdA590829EA574b7b4f96b6"
   *   asset: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
   *   delegate: "0x3cEe6c5c0fB713925BdA590829EA574b7b4f96b6"
   *   amount: "1000000"
   *   slippage: "300"
   *   callData: "0x",
   *   relayerFee: "10000000000000" // relayer fee in native asset
   * };
   *
   *
   * [case 2] If a user wants to pay a fee in the transacting asset,
   *
   * const params = {
   *   origin: "6648936"
   *   destination: "1869640809"
   *   to: "0x3cEe6c5c0fB713925BdA590829EA574b7b4f96b6"
   *   asset: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
   *   delegate: "0x3cEe6c5c0fB713925BdA590829EA574b7b4f96b6"
   *   amount: "1000000"
   *   slippage: "300"
   *   callData: "0x",
   *   relayerFeeInTransactingAsset: "10000000000000" // relayer fee in transacting asset
   * };
   *
   * const txRequest = sdkBase.xcall(params);
   * signer.sendTransaction(txRequest);
   *
   */
  async xcall(params: SdkXCallParams): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.xcall.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const {
      origin,
      destination,
      callData: _callData,
      asset: _asset,
      delegate: _delegate,
      amount: _amount,
      slippage: _slippage,
      relayerFee: _relayerFee,
      relayerFeeInTransactingAsset: _relayerFeeInTransactingAsset,
      receiveLocal: _receiveLocal,
      wrapNativeOnOrigin,
      unwrapNativeOnDestination,
      options,
    } = params;
    const isProviderValid = await this.providerSanityCheck({ domains: [origin], options });
    if (!isProviderValid) {
      throw new ProviderMissing(origin);
    }

    // Ensure signer is provided.
    const _signerAddress = options?.signerAddress ?? this.config.signerAddress;
    if (!_signerAddress) {
      throw new SignerAddressMissing();
    }

    let { to, callData } = params;

    // Set default values if not provided
    callData = _callData ?? "0x";
    const asset = _asset ?? constants.AddressZero;
    const delegate = _delegate ?? to;
    const amount = _amount ?? "0";
    const amountBN = BigNumber.from(amount);
    const slippage = _slippage ?? "10000";
    const relayerFeeInTransactingAsset = _relayerFeeInTransactingAsset
      ? BigNumber.from(_relayerFeeInTransactingAsset)
      : constants.Zero;
    const relayerFeeInNativeAsset = _relayerFee ? BigNumber.from(_relayerFee) : constants.Zero;

    const receiveLocal = _receiveLocal ?? false;

    // Input validation
    if (asset == constants.AddressZero && amount != "0") {
      throw new ParamsInvalid({
        paramsError: "Transacting asset specified was address zero; native assets are not supported!",
      });
    }
    if (parseInt(slippage) < 0 || parseInt(slippage) > 10000) {
      throw new SlippageInvalid(slippage, params);
    }
    if (to === constants.AddressZero) {
      throw new ParamsInvalid("Valid recipient `to` address must be provided; received address(0) as recipient.");
    }

    const validateInput = ajv.compile(SdkXCallParamsSchema);
    const validInput = validateInput(params);
    if (!validInput) {
      const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
      throw new ParamsInvalid({
        paramsError: msg,
        params,
      });
    }

    const isValidAsset = await this.hasXERC20(origin, asset, options);
    const LOCKBOX_ADAPTER_ADDRESS = LOCKBOX_ADAPTER_DOMAIN_ADDRESS[origin];

    if (isValidAsset && !LOCKBOX_ADAPTER_ADDRESS) {
      throw new Error("Lockbox adapter not deployed on given domain");
    }

    // In case given asset is XERC20 and have lockbox tx should hit adapter rather than connext contracts
    const connextContractAddress = isValidAsset
      ? LOCKBOX_ADAPTER_ADDRESS
      : (await this.getConnext(origin, options)).address;

    const chainId = await this.getChainId(origin);

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
    let xcallData: string;
    if (relayerFeeInTransactingAsset.gt(0)) {
      const formattedArguments: [string, string, string, string, BigNumber, string, string, string] = [
        destination,
        to,
        asset,
        delegate,
        amountBN,
        slippage,
        callData,
        relayerFeeInTransactingAsset.toString(),
      ];
      xcallData = receiveLocal
        ? this.contracts.connext.encodeFunctionData(
            "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes,uint256)",
            formattedArguments,
          )
        : this.contracts.connext.encodeFunctionData(
            "xcall(uint32,address,address,address,uint256,uint256,bytes,uint256)",
            formattedArguments,
          );
    } else {
      const formattedArguments: [string, string, string, string, BigNumber, string, string] = [
        destination,
        to,
        asset,
        delegate,
        amountBN,
        slippage,
        callData,
      ];
      xcallData = receiveLocal
        ? this.contracts.connext.encodeFunctionData(
            "xcallIntoLocal(uint32,address,address,address,uint256,uint256,bytes)",
            formattedArguments,
          )
        : this.contracts.connext.encodeFunctionData(
            "xcall(uint32,address,address,address,uint256,uint256,bytes)",
            formattedArguments,
          );
    }

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
        value: amountBN,
      });

      // 2. WETH.approve(connext)
      txs.push({
        to: asset,
        data: weth.encodeFunctionData("approve", [connextContractAddress, amountBN]),
      });

      // 3. xcall(args)
      txs.push({
        to: connextContractAddress,
        data: xcallData,
        value: relayerFeeInNativeAsset,
      });

      // 5. Format Multisend call in an ethers TransactionRequest object.
      txRequest = {
        to: multisendContractAddress,
        value: amountBN.add(relayerFeeInNativeAsset), // Amount in ETH (which will be converted to WETH) + ETH for xcall relayer fee.
        data: encodeMultisendCall(txs),
        from: _signerAddress,
        chainId,
      };
    } else {
      // Add callback and relayer fee together to get the total ETH value that should be sent.
      const value = relayerFeeInNativeAsset;

      // Format the ethers TransactionRequest object.
      if (relayerFeeInNativeAsset.gt(0)) {
        txRequest = {
          to: connextContractAddress,
          value,
          data: xcallData,
          from: _signerAddress,
          chainId,
        };
      } else {
        txRequest = {
          to: connextContractAddress,
          data: xcallData,
          from: _signerAddress,
          chainId,
        };
      }
    }

    this.logger.info("XCall transaction formatted.", requestContext, methodContext, {
      args: { ...params, callData, delegate },
      to: txRequest.to,
      from: txRequest.from,
      value: txRequest.value ? txRequest.value.toString() : "0",
    });

    return txRequest;
  }

  /**
   * Updates the slippage tolerance for a specific transfer on origin; only the origin sender is allowed to do so.
   *
   * @param params - SdkUpdateSlippageParams object.
   * @param params.domainId - The origin domain ID of the transfer.
   * @param params.transferId - The transfer ID.
   * @param params.slippage - The new relayer fee to use for this transfer, in BPS.
   * @returns providers.TransactionRequest object.
   *
   * @example
   * ```ts
   * // call SdkBase.create(), instantiate a signer
   *
   * const params = {
   *   domainId: "6648936",
   *   transferId: "0xdd252f58a45dc78fee1ac12a628782bda6a98315b286aadf76e4d7322bf135ca",
   *   relayerFee: "1000",
   * };
   *
   * const txRequest = sdkBase.updateSlippage(params);
   * signer.sendTransaction(txRequest);
   * ```
   */
  async updateSlippage(params: SdkUpdateSlippageParams): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.updateSlippage.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const { domainId, transferId, slippage: _newSlippage, options } = params;

    const isProviderValid = await this.providerSanityCheck({ domains: [domainId], options });
    if (!isProviderValid) {
      throw new ProviderMissing(domainId);
    }

    const _signerAddress = options?.signerAddress ?? this.config.signerAddress;
    if (!_signerAddress) {
      throw new SignerAddressMissing();
    }

    // Input validation
    if (parseInt(_newSlippage) < 0 || parseInt(_newSlippage) > 10000) {
      throw new SlippageInvalid(_newSlippage, params);
    }

    const validateInput = ajv.compile(SdkUpdateSlippageParamsSchema);
    const validInput = validateInput(params);
    if (!validInput) {
      const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
      throw new ParamsInvalid({
        paramsError: msg,
        params,
      });
    }

    // Construct the TransferInfo for this transferId
    const sdkUtils = await SdkUtils.create(this.config);
    const transfers = await sdkUtils.getTransfers({ transferId: transferId });

    if (transfers.length <= 0) {
      throw new ParamsInvalid({
        paramsError: "No transfer found for this transferId",
        transferId: transferId,
      });
    }
    const transfer = transfers[0];

    // Check to make sure this domain is the destination
    if (transfer.destination_domain !== domainId) {
      throw new ParamsInvalid({
        paramsError: "Must update slippage on destination domain",
        domain: domainId,
        destination: transfer.destination_domain,
        transferId,
      });
    }

    // Check to make sure it is being sent from delegate
    if (transfer.delegate.toLowerCase() !== _signerAddress.toLowerCase()) {
      throw new ParamsInvalid({
        paramsError: "Must update slippage with delegate",
        delegate: transfer.delegate,
        signer: _signerAddress,
        transferId,
      });
    }

    const chainId = await this.getChainId(domainId);
    const ConnextContractAddress = (await this.getConnext(domainId, options)).address;

    const transferInfo = {
      originDomain: transfer.origin_domain,
      destinationDomain: transfer.destination_domain,
      canonicalDomain: transfer.canonical_domain,
      to: transfer.to,
      delegate: transfer.delegate,
      receiveLocal: transfer.receive_local,
      callData: transfer.call_data,
      slippage: transfer.slippage,
      originSender: transfer.origin_sender,
      bridgedAmt: transfer.bridged_amt,
      normalizedIn: transfer.normalized_in,
      nonce: transfer.nonce,
      canonicalId: transfer.canonical_id,
    };

    const data = this.contracts.connext.encodeFunctionData("forceUpdateSlippage", [transferInfo, _newSlippage]);

    const txRequest = {
      to: ConnextContractAddress,
      data,
      from: _signerAddress,
      chainId,
    };

    this.logger.info(`${this.updateSlippage.name} transaction created`, requestContext, methodContext, txRequest);

    return txRequest;
  }

  /**
   * Increases the relayer fee for a specific transfer on origin; anyone is allowed to bump for any transfer.
   *
   * @param params - SdkBumpTransferParams object.
   * @param params.domainId - The origin domain ID of the transfer.
   * @param params.transferId - The transfer ID.
   * @param params.asset - The asset address you want to pay in.
   * @param params.relayerFee - The additional relayer fee to increase the transfer by, in native gas token.
   * @returns providers.TransactionRequest object.
   *
   * @example
   * ```ts
   * // call SdkBase.create(), instantiate a signer
   *
   * const params = {
   *   domainId: "6648936",
   *   transferId: "0xdd252f58a45dc78fee1ac12a628782bda6a98315b286aadf76e4d7322bf135ca",
   *   asset: "0x0000000000000000000000000000000000000000" // can be either native asset or transacting asset
   *   relayerFee: "10000",
   * };
   *
   * const txRequest = sdkBase.bumpTransfer(params);
   * signer.sendTransaction(txRequest);
   * ```
   */
  async bumpTransfer(params: SdkBumpTransferParams): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.bumpTransfer.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const { domainId, transferId, asset, relayerFee, options } = params;

    const isProviderValid = await this.providerSanityCheck({ domains: [domainId], options });
    if (!isProviderValid) {
      throw new ProviderMissing(domainId);
    }

    const _signerAddress = options?.signerAddress ?? this.config.signerAddress;
    if (!_signerAddress) {
      throw new SignerAddressMissing();
    }

    // Input validation
    if (parseInt(relayerFee) <= 0) {
      throw new ParamsInvalid({ paramsError: "Must increase relayerFee by > 0", relayerFee: relayerFee });
    }

    const validateInput = ajv.compile(SdkBumpTransferParamsSchema);
    const validInput = validateInput(params);
    if (!validInput) {
      const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
      throw new ParamsInvalid({
        paramsError: msg,
        params,
      });
    }

    const chainId = await this.getChainId(domainId);
    const ConnextContractAddress = (await this.getConnext(domainId, options)).address;

    // if asset is AddressZero then we are adding relayerFee to amount for value
    const value = asset == constants.AddressZero ? BigNumber.from(relayerFee) : constants.Zero;
    const data =
      asset == constants.AddressZero
        ? this.contracts.connext.encodeFunctionData("bumpTransfer(bytes32)", [transferId])
        : this.contracts.connext.encodeFunctionData("bumpTransfer(bytes32,address,uint256)", [
            transferId,
            asset,
            relayerFee,
          ]);

    const txRequest =
      asset == constants.AddressZero
        ? {
            to: ConnextContractAddress,
            value,
            data,
            from: _signerAddress,
            chainId,
          }
        : {
            to: ConnextContractAddress,
            data,
            from: _signerAddress,
            chainId,
          };

    this.logger.info(`${this.bumpTransfer.name} transaction created`, requestContext, methodContext, txRequest);

    return txRequest;
  }

  /**
   * Calculates an estimated relayer fee in either the native asset of the origin domain or the USD price to be used in xcall.
   *
   * @param params - SdkEstimateRelayerFeeParams object.
   * @param params.originDomain - The origin domain ID of the transfer.
   * @param params.destinationDomain - The destination domain ID of the transfer.
   * @param params.priceIn - `native` or `usd`, the currency to return the relayer fee in.`
   * @param params.callDataGasAmount - (optional) The gas amount needed for calldata.
   * @param params.originNativeTokenPrice - (optional) The USD price of the origin native token.
   * @param params.destinationNativetokenPrice - (optional) The USD price of the destination native token.
   * @param params.destinationGasPrice - (optional) The gas price of the destination chain, in gwei units.
   * @returns The relayer fee in either native asset of the origin domain or USD (18 decimal fidelity).
   *
   * @example
   * ```ts
   * // call SdkBase.create(), instantiate a signer
   *
   * const params = {
   *   originDomain: "6648936",
   *   destinationDomain: "1869640809",
   * };
   *
   * const txRequest = sdkBase.estimateRelayerFee(params);
   * signer.sendTransaction(txRequest);
   * ```
   */
  async estimateRelayerFee(params: SdkEstimateRelayerFeeParams): Promise<BigNumber> {
    const { requestContext, methodContext } = createLoggingContext(this.estimateRelayerFee.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    // Input validation
    const validateInput = ajv.compile(SdkEstimateRelayerFeeParamsSchema);
    const validInput = validateInput(params);
    if (!validInput) {
      const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
      throw new ParamsInvalid({
        paramsError: msg,
        params,
      });
    }

    const [originChainId, destinationChainId] = await Promise.all([
      this.getChainId(params.originDomain),
      this.getChainId(params.destinationDomain),
    ]);

    const [originNativeTokenPrice, destinationNativeTokenPrice] = await Promise.all([
      params.originNativeTokenPrice
        ? Promise.resolve(params.originNativeTokenPrice)
        : this.getConversionRate(originChainId),
      params.destinationNativeTokenPrice
        ? Promise.resolve(params.destinationNativeTokenPrice)
        : this.getConversionRate(destinationChainId),
    ]);

    const relayerFeeInOriginNativeAsset = await calculateRelayerFee(
      {
        ...params,
        originChainId,
        destinationChainId,
        originNativeTokenPrice,
        destinationNativeTokenPrice,
        getGasPriceCallback: (domain: number) => this.chainreader.getGasPrice(domain, requestContext),
      },
      this.chainData,
      this.logger,
      requestContext,
    );

    return relayerFeeInOriginNativeAsset;
  }

  /**
   * Calculates the estimated amount received on the destination domain for a bridge transaction.
   *
   * @param originDomain - The domain ID of the origin chain.
   * @param destinationDomain - The domain ID of the destination chain.
   * @param originTokenAddress - The address of the token to be bridged from origin.
   * @param amount - The amount of the origin token to bridge, in the origin token's native decimal precision.
   * @param receiveLocal - (optional) Whether the desired destination token is the local asset ("nextAsset").
   * @param checkFastLiquidity - (optional) Whether to check for fast liquidity availability.
   * @returns Estimated amount received for local/adopted assets, if applicable, in their native decimal precisions.
   */
  async calculateAmountReceived(
    originDomain: string,
    destinationDomain: string,
    originTokenAddress: string,
    amount: BigNumberish,
    receiveLocal = false,
    checkFastLiquidity = false,
  ): Promise<{
    amountReceived: BigNumberish;
    originSlippage: BigNumberish;
    routerFee: BigNumberish;
    destinationSlippage: BigNumberish;
    isFastPath: boolean;
  }> {
    const sdkPool = await SdkPool.create(this.config);
    return await sdkPool.calculateAmountReceived(
      originDomain,
      destinationDomain,
      originTokenAddress,
      amount,
      receiveLocal,
      checkFastLiquidity,
    );
  }
}
