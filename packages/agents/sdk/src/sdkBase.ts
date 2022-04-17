import { constants, providers, Signer, utils, BigNumber, Wallet } from "ethers";

import {
  getChainData,
  Logger,
  createLoggingContext,
  RequestContext,
  ChainData,
  XCallArgs,
  CallParams,
} from "@connext/nxtp-utils";
import {
  getContractInterfaces,
  ConnextContractInterfaces,
  contractDeployments,
  TransactionService,
} from "@connext/nxtp-txservice";

import { NxtpSdkConfig, getConfig } from "./config";

export const MIN_SLIPPAGE_TOLERANCE = "00.01"; // 0.01%;
export const MAX_SLIPPAGE_TOLERANCE = "15.00"; // 15.0%
export const DEFAULT_SLIPPAGE_TOLERANCE = "0.10"; // 0.10%
export const DEFAULT_AUCTION_TIMEOUT = 6_000;
export const FULFILL_TIMEOUT = 300_000;
export const DELAY_BETWEEN_RETRIES = 5_000;

/**
 * @classdesc Lightweight class to facilitate interaction with the TransactionManager contract on configured chains.
 *
 */
export class NxtpSdkBase {
  private readonly config: NxtpSdkConfig;
  private readonly logger: Logger;
  private readonly contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
  private txService: TransactionService;
  private chainData?: Map<string, ChainData>;

  constructor(config: NxtpSdkConfig, logger?: Logger) {
    this.config = config;
    this.logger = logger || new Logger({ name: "NxtpSdk", level: config.logLevel });
    this.contracts = getContractInterfaces();
    this.txService = new TransactionService(
      this.logger.child({ module: "TransactionService" }, this.config.logLevel),
      this.config.chains,
      this.config.signer,
    );
  }

  public async create(_config: NxtpSdkConfig): Promise<NxtpSdkBase> {
    const chainData = await getChainData();
    if (!chainData) {
      throw new Error("Could not get chain data");
    }

    this.chainData = chainData;
    const nxtpConfig = await getConfig(_config, chainData, contractDeployments);

    return new NxtpSdkBase(nxtpConfig);
  }

  async approveIfNeeded(
    domain: string,
    assetId: string,
    amount: string,
    infiniteApprove = false,
    _requestContext?: RequestContext,
  ): Promise<providers.TransactionRequest | undefined> {
    const { requestContext, methodContext } = createLoggingContext(this.approveIfNeeded.name, _requestContext);

    this.logger.info("Method start", requestContext, methodContext, { domain, assetId, amount });

    // this.assertChainIsConfigured(chainId);
    if (assetId !== constants.AddressZero) {
      const ConnextContractAddress = this.config.chains[domain].deployments!.connext;
      const chainId = this.chainData?.get(domain).chainId;

      const approvedData = this.contracts.erc20Interface.encodeFunctionData("allowance", [
        await this.config.signerAddress,
        ConnextContractAddress,
      ]);
      const approvedEncoded = await this.txService.readTx({
        to: assetId,
        data: approvedData,
        chainId,
      });
      const [approved] = this.contracts.erc20Interface.decodeFunctionResult("allowance", approvedEncoded);
      this.logger.info("Got approved tokens", requestContext, methodContext, { approved: approved.toString() });
      if (BigNumber.from(approved).lt(amount)) {
        const data = this.contracts.erc20Interface.encodeFunctionData("approve", [
          ConnextContractAddress,
          infiniteApprove ? constants.MaxUint256 : amount,
        ]);
        this.logger.info("Approve transaction created", requestContext, methodContext);
        return {
          to: assetId,
          data,
          from: await this.config.signerAddress,
          chainId,
        };
      } else {
        this.logger.info("Allowance sufficient", requestContext, methodContext, {
          approved: approved.toString(),
          amount,
        });
        return undefined;
      }
    }
    return undefined;
  }

  public async xcall(params: XCallArgs): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.xcall.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    // Validate Input schema
    // const validateInput = ajv.compile(XTransferSchema);
    // const validInput = validateInput(params);
    // if (!validInput) {
    //   const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    //   throw new ParamsInvalid({
    //     paramsError: msg,
    //     params,
    //   });
    // }

    /// create a bid
    const { originDomain, destinationDomain, to, callData, amount, transactingAssetId } = params;

    const ConnextContractAddress = this.config.chains[originDomain].deployments!.connext;

    const chainId = this.chainData?.get(originDomain).chainId;
    // generate bid params
    const callParams: CallParams = {
      to,
      callData,
      originDomain,
      destinationDomain,
    };

    const value = params.sendingAssetId === constants.AddressZero ? BigNumber.from(amount) : constants.Zero;
    const data = this.contracts.connext.encodeFunctionData("xcall", [
      {
        params: callParams,
        amount: amount,
        transactingAssetId: transactingAssetId,
      },
    ]);

    this.logger.info("xCall transaction created", requestContext, methodContext);

    return {
      to: ConnextContractAddress,
      value,
      data,
      from: this.config.signerAddress,
      chainId,
    };
  }

  /**
   * Gets gas price in target chain
   *
   * @param chainId The network identifier
   *
   * @returns Gas price in BigNumber
   */
  async getGasPrice(chainId: number, requestContext: RequestContext): Promise<BigNumber> {
    // this.assertChainIsConfigured(chainId);

    // get gas price
    let gasPrice = BigNumber.from(0);
    try {
      gasPrice = await this.txService.getGasPrice(chainId, requestContext);
    } catch (e) {}

    return gasPrice;
  }

  /**
   * Changes the signer associated with the sdk
   *
   * @param signer - Signer to change to
   */
  public changeInjectedSigner(signer: Signer) {
    this.config.signer = signer;
  }
}
