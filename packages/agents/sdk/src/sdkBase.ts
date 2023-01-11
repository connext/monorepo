import { constants, providers, BigNumber, utils } from "ethers";
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

import { getChainData, getChainIdFromDomain, calculateRelayerFee } from "./lib/helpers";
import { SignerAddressMissing, ChainDataUndefined, ParamsInvalid, SlippageInvalid } from "./lib/errors";
import { NxtpSdkConfig, getConfig } from "./config";
import { NxtpSdkShared } from "./sdkShared";
import {
  SdkXCallParamsSchema,
  SdkXCallParams,
  SdkBumpTransferParamsSchema,
  SdkBumpTransferParams,
  SdkEstimateRelayerFeeParamsSchema,
  SdkEstimateRelayerFeeParams,
} from "./interfaces";

/**
 * @classdesc SDK class encapsulating bridge functions.
 */
export class NxtpSdkBase extends NxtpSdkShared {
  private static _instance: NxtpSdkBase;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    super(config, logger, chainData);
  }

  /**
   * Create a singleton instance of the NxtpSdkBase class.
   *
   * @param _config - NxtpSdkConfig object.
   * @param _config.chains - Chain config, at minimum with providers for each chain.
   * @param _config.signerAddress - Signer address for transactions.
   * @param _config.logLevel - (optional) One of "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent".
   * @param _config.network - (optional) One of "testnet" | "mainnet".
   * @returns providers.TransactionRequest object.
   *
   * @example:
   * ```ts
   * import { NxtpSdkBase } from "@connext/nxtp-sdk";
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
   * const nxtpSdkBase = await NxtpSdkBase.create(config);
   * ```
   */
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
   * Prepares xcall inputs and encodes the calldata. Returns an ethers TransactionRequest object, ready
   * to be sent to an RPC provider.
   *
   * @param params - SdkXCallParams object.
   * @param params.origin - The origin domain ID.
   * @param params.destination - The destination domain ID.
   * @param params.to - Address receiving funds or the target contract.
   * @param params.asset - (optional) Address of the token contract. Use zero address only for non-value xcalls.
   * @param params.delegate - (optional) Address allowed to cancel an xcall on destination.
   * @param params.amount - (optional) Amount of tokens to transfer.
   * @param params.slippage - (optional) Maximum acceptable slippage in BPS. For example, a value of 30 means 0.3% slippage.
   * @param params.callData - (optional) Calldata to execute (can be empty: "0x").
   * @param params.relayerFee - (optional) Fee paid to relayers, in native asset on origin. Use `calculateRelayerFee` to estimate.
   * @param params.receiveLocal - (optional) Whether to receive the local asset ("nextAsset").
   * @returns providers.TransactionRequest object.
   *
   * @example
   * ```ts
   * // call NxtpSdkBase.create(), instantiate a signer
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
   *   relayerFee: "10000000000000"
   * };
   *
   * const txRequest = nxtpSdkBase.xcall(params);
   * signer.sendTransaction(txRequest);
   * ```
   */
  async xcall(params: SdkXCallParams): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.xcall.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }
    const {
      origin,
      destination,
      to,
      callData: _callData,
      asset: _asset,
      delegate: _delegate,
      amount: _amount,
      slippage: _slippage,
      relayerFee: _relayerFee,
      receiveLocal: _receiveLocal,
    } = params;

    // Set default values if not provided
    const callData = _callData ?? "0x";
    const asset = _asset ?? constants.AddressZero;
    const delegate = _delegate ?? to;
    const amount = _amount ?? "0";
    const slippage = _slippage ?? "10000";
    const relayerFee = _relayerFee ?? "0";
    const receiveLocal = _receiveLocal ?? false;

    // Input validation
    if (asset == constants.AddressZero && amount != "0") {
      throw new Error("Transacting asset specified was address zero; native assets are not supported!");
    }
    if (parseInt(slippage) < 0 || parseInt(slippage) > 10000) {
      throw new SlippageInvalid(slippage, context);
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

    const ConnextContractAddress = (await this.getConnext(origin)).address;

    let chainId = this.config.chains[origin].chainId;
    if (!chainId) {
      chainId = await getChainIdFromDomain(origin, this.chainData);
    }

    // Add callback and relayer fee together to get the total ETH value that should be sent
    const value = BigNumber.from(relayerFee);
    let data: string;

    // Check if receiveLocal is desired
    if (receiveLocal ?? false) {
      data = this.contracts.connext.encodeFunctionData("xcallIntoLocal", [
        destination,
        to,
        asset,
        delegate,
        amount,
        slippage,
        callData,
      ]);
    } else {
      data = this.contracts.connext.encodeFunctionData("xcall", [
        destination,
        to,
        asset,
        delegate,
        amount,
        slippage,
        callData,
      ]);
    }

    const txRequest: providers.TransactionRequest = {
      to: ConnextContractAddress,
      value,
      data,
      from: signerAddress,
      chainId,
    };

    this.logger.info("XCall transaction formatted.", requestContext, methodContext, {
      args: { ...params, callData, delegate },
      to: txRequest.to,
      from: txRequest.from,
      value: txRequest.value?.toString(),
    });

    return txRequest;
  }

  /**
   * Increases the relayer fee for a specific transfer on origin; anyone is allowed to bump for any transfer.
   *
   * @param params - SdkBumpTransferParams object.
   * @param params.domainId - The origin domain ID of the transfer.
   * @param params.transferId - The transfer ID.
   * @param params.relayerFee - The additional relayer fee to increase the transfer by, in native gas token.
   * @returns providers.TransactionRequest object.
   *
   * @example
   * ```ts
   * // call NxtpSdkBase.create(), instantiate a signer
   *
   * const params = {
   *   domainId: "6648936",
   *   transferId: "0xdd252f58a45dc78fee1ac12a628782bda6a98315b286aadf76e4d7322bf135ca",
   *   relayerFee: "10000",
   * };
   *
   * const txRequest = nxtpSdkBase.bumpTransfer(params);
   * signer.sendTransaction(txRequest);
   * ```
   */
  async bumpTransfer(params: SdkBumpTransferParams): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.bumpTransfer.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const { domainId, transferId, relayerFee } = params;

    // Input validation
    if (parseInt(relayerFee) <= 0) {
      throw new Error("Must increase relayerFee by > 0");
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

  /**
   * Calculates an estimated relayer fee in the native asset of the origin domain to be used in xcall.
   *
   * @param params - SdkEstimateRelayerFeeParams object.
   * @param params.originDomain - The origin domain ID of the transfer.
   * @param params.destinationDomain - The destination domain ID of the transfer.
   * @returns The relayer fee in native asset of the origin domain.
   *
   * @example
   * ```ts
   * // call NxtpSdkBase.create(), instantiate a signer
   *
   * const params = {
   *   originDomain: "6648936",
   *   destinationDomain: "1869640809",
   * };
   *
   * const txRequest = nxtpSdkBase.estimateRelayerFee(params);
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

    const relayerFeeInOriginNativeAsset = await calculateRelayerFee(params, this.chainData, this.logger);

    return relayerFeeInOriginNativeAsset;
  }

  /**
   * Prepares a Multisend transaction request containing a call to wrap ETH and to xcall with the received WETH.
   *
   * @param params - SdkXCallParams object.
   * @param params.origin - The origin domain ID.
   * @param params.destination - The destination domain ID.
   * @param params.to - Address receiving funds or the target contract.
   * @param params.asset - (optional) Address of the token contract. Use zero address only for non-value xcalls.
   * @param params.delegate - (optional) Address allowed to cancel an xcall on destination.
   * @param params.amount - (optional) Amount of tokens to transfer.
   * @param params.slippage - (optional) Maximum acceptable slippage in BPS. For example, a value of 30 means 0.3% slippage.
   * @param params.callData - (optional) Calldata to execute (can be empty: "0x").
   * @param params.relayerFee - (optional) Fee paid to relayers, in native asset on origin. Use `calculateRelayerFee` to estimate.
   * @param params.receiveLocal - (optional) Whether to receive the local asset ("nextAsset").
   * @returns providers.TransactionRequest object.
   *
   * @example
   * ```ts
   * // call NxtpSdkBase.create(), instantiate a signer
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
   *   relayerFee: "10000000000000"
   * };
   *
   * const txRequest = nxtpSdkBase.wrapEthAndXCall(params);
   * signer.sendTransaction(txRequest);
   * ```
   */
  async wrapEthAndXCall(params: SdkXCallParams): Promise<providers.TransactionRequest> {
    const txs: MultisendTransaction[] = [];
    const { asset, amount: _amount, origin, slippage } = params;
    const amount = BigNumber.from(_amount);

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    // TODO: Check that asset address is correct WETH contract
    // Input validation
    if (asset == constants.AddressZero && _amount != "0") {
      throw new Error("Transacting asset specified was address zero; native assets are not supported!");
    }
    if (parseInt(slippage) < 0 || parseInt(slippage) > 10000) {
      throw new SlippageInvalid(slippage, context);
    }

    let chainId = this.config.chains[origin].chainId;
    if (!chainId) {
      chainId = await getChainIdFromDomain(origin, this.chainData);
    }

    const connextContractAddress = (await this.getConnext(origin)).address;
    const multisendContractAddress = this.config.chains[origin].deployments?.multisend;
    const weth = new utils.Interface(WETHAbi);

    if (!multisendContractAddress) {
      throw new Error(`Multisend contract deployment not found for chain ${chainId}! Unable to perform multicall.`);
    }

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
    const xcallRequest = await this.xcall(params);

    // Sanity check: the `to` recipient of xcall matches what we used as connext contract address
    // for token approval.
    if (!xcallRequest.to || connextContractAddress !== xcallRequest.to) {
      throw new Error(
        "Formatted XCall recipient address did not match expected Connext address!" +
          `Got: ${xcallRequest.to}; Expected: ${connextContractAddress}`,
      );
    }

    const relayerFee = BigNumber.from(params.relayerFee ?? "0");
    // Sanity check: value is correct.
    if (!xcallRequest.value || !BigNumber.from(xcallRequest.value).eq(relayerFee)) {
      throw new Error(
        "Formatted XCall msg.value did not match expected value (params.relayerFee)." +
          `Got: ${xcallRequest.value?.toString()}; Expected: ${params.relayerFee}`,
      );
    }

    txs.push({
      to: connextContractAddress,
      data: xcallRequest.data!.toString(),
      value: relayerFee,
    });

    // 5. Format Multisend call in an ethers TransactionRequest object.
    const txRequest: providers.TransactionRequest = {
      to: multisendContractAddress,
      value: amount.add(relayerFee), // Amount in ETH (which will be converted to WETH) + ETH for xcall relayer fee.
      data: encodeMultisendCall(txs),
      from: signerAddress,
      chainId,
    };
    return txRequest;
  }
}
