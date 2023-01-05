import { constants, providers, BigNumber, utils } from "ethers";
import {
  Logger,
  createLoggingContext,
  ChainData,
  XCallArgs,
  WETHAbi,
  MultisendTransaction,
  encodeMultisendCall,
} from "@connext/nxtp-utils";
import { contractDeployments } from "@connext/nxtp-txservice";

import { getChainData, getChainIdFromDomain, calculateRelayerFee } from "./lib/helpers";
import { SignerAddressMissing, ChainDataUndefined } from "./lib/errors";
import { NxtpSdkConfig, getConfig } from "./config";
import { NxtpSdkShared } from "./sdkShared";

type NxtpSdkXCallArgs = Omit<XCallArgs, "callData" | "delegate"> &
  Partial<XCallArgs> & {
    origin: string;
    relayerFee?: string;
  } & { receiveLocal?: boolean };

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
   * @returns providers.TransactionRequest object.
   */
  async xcall(args: NxtpSdkXCallArgs): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.xcall.name);
    this.logger.info("Method start", requestContext, methodContext, { args });

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }
    const { origin, relayerFee, destination, to, asset, amount, slippage, receiveLocal } = args;

    // Substitute default values as needed.
    const callData = args.callData ?? "0x";
    const delegate = args.delegate ?? to; // Default to using the user's signer address as the delegate.

    // TODO: Calculate estimate for relayer fee and include it in the call params.

    // Validate XCall arguments.
    if (asset === constants.AddressZero && amount !== "0") {
      // TODO: Custom error.
      throw new Error("Transacting asset specified was address zero; native assets are not supported!");
    }
    // TODO: Should additionally make sure the asset is set to address(0) if the amount is 0.

    // TODO: Use ajv validator:
    // const validateInput = ajv.compile(XTransferSchema);
    // const validInput = validateInput(params);
    // if (!validInput) {
    //   const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    //   throw new ParamsInvalid({
    //     paramsError: msg,
    //     params,
    //   });
    // }

    const ConnextContractAddress = (await this.getConnext(origin)).address;

    // Get the origin chain ID.
    let chainId = this.config.chains[origin].chainId;
    if (!chainId) {
      chainId = await getChainIdFromDomain(origin, this.chainData);
    }

    // Add callback and relayer fee together to get the total ETH value that should be sent.
    const value = BigNumber.from(relayerFee ?? "0");

    let data: string;

    // Take the finalized xcall arguments and encode calldata.
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

    // Make an ethers TransactionRequest object.
    const txRequest: providers.TransactionRequest = {
      to: ConnextContractAddress,
      value,
      data,
      from: signerAddress,
      chainId,
    };
    this.logger.info("XCall transaction formatted.", requestContext, methodContext, {
      args: { ...args, callData, delegate },
      to: txRequest.to,
      from: txRequest.from,
      value: txRequest.value?.toString(),
    });

    return txRequest;
  }

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

  /**
   *
   * @param args - XCall arguments. Some fields in args.params are optional and have default values provided.
   * @param args.amount - Will be used as the amount of ETH to deposit into WETH contract and withdraw as WETH.
   * @param args.asset - Should be the target wrapper contract (e.g. WETH) address.
   * @returns providers.TransactionRequest object.
   */
  async wrapEthAndXCall(args: NxtpSdkXCallArgs): Promise<providers.TransactionRequest> {
    const txs: MultisendTransaction[] = [];
    const { asset, amount: _amount, origin } = args;
    const amount = BigNumber.from(_amount);

    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
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
    const xcallRequest = await this.xcall(args);

    // Sanity check: the `to` recipient of xcall matches what we used as connext contract address
    // for token approval.
    if (!xcallRequest.to || connextContractAddress !== xcallRequest.to) {
      throw new Error(
        "Formatted XCall recipient address did not match expected Connext address!" +
          `Got: ${xcallRequest.to}; Expected: ${connextContractAddress}`,
      );
    }

    const relayerFee = BigNumber.from(args.relayerFee ?? "0");
    // Sanity check: value is correct.
    if (!xcallRequest.value || !BigNumber.from(xcallRequest.value).eq(relayerFee)) {
      throw new Error(
        "Formatted XCall msg.value did not match expected value (args.relayerFee)." +
          `Got: ${xcallRequest.value?.toString()}; Expected: ${args.relayerFee}`,
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
