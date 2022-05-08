import { constants, providers, BigNumber } from "ethers";
import {
  getChainData,
  Logger,
  createLoggingContext,
  getChainIdFromDomain,
  ChainData,
  XCallArgs,
} from "@connext/nxtp-utils";
import {
  getContractInterfaces,
  ConnextContractInterfaces,
  contractDeployments,
  ChainReader,
} from "@connext/nxtp-txservice";

import { NxtpSdkConfig, getConfig } from "./config";

/**
 * @classdesc Lightweight class to facilitate interaction with the Connext contract on configured chains.
 *
 */
export class NxtpSdkBase {
  public readonly config: NxtpSdkConfig;
  private readonly logger: Logger;
  private readonly contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
  private chainReader: ChainReader;
  public readonly chainData: Map<string, ChainData>;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.contracts = getContractInterfaces();
    this.chainReader = new ChainReader(
      this.logger.child({ module: "ChainReader" }, this.config.logLevel),
      this.config.chains,
    );
  }

  static async create(
    _config: NxtpSdkConfig,
    _logger?: Logger,
    _chainData?: Map<string, ChainData>,
  ): Promise<NxtpSdkBase> {
    const chainData = _chainData ?? (await getChainData());
    if (!chainData) {
      throw new Error("Could not get chain data");
    }

    const nxtpConfig = await getConfig(_config, chainData, contractDeployments);
    const logger = _logger || new Logger({ name: "NxtpSdkBase", level: nxtpConfig.logLevel });

    return new NxtpSdkBase(nxtpConfig, logger, chainData);
  }

  async approveIfNeeded(
    domain: string,
    assetId: string,
    amount: string,
    infiniteApprove = false,
  ): Promise<providers.TransactionRequest | undefined> {
    const { requestContext, methodContext } = createLoggingContext(this.approveIfNeeded.name);

    this.logger.info("Method start", requestContext, methodContext, { domain, assetId, amount });

    const chainId = await getChainIdFromDomain(domain, this.chainData);
    if (assetId !== constants.AddressZero) {
      const ConnextContractAddress = this.config.chains[domain].deployments!.connext;

      const approvedData = this.contracts.erc20.encodeFunctionData("allowance", [
        this.config.signerAddress,
        ConnextContractAddress,
      ]);
      const approvedEncoded = await this.chainReader.readTx({
        to: assetId,
        data: approvedData,
        chainId: Number(domain),
      });
      const [approved] = this.contracts.erc20.decodeFunctionResult("allowance", approvedEncoded);
      this.logger.info("Got approved tokens", requestContext, methodContext, { approved: approved.toString() });
      if (BigNumber.from(approved).lt(amount)) {
        const data = this.contracts.erc20.encodeFunctionData("approve", [
          ConnextContractAddress,
          infiniteApprove ? constants.MaxUint256 : amount,
        ]);
        this.logger.info("Approve transaction created", requestContext, methodContext);
        return {
          to: assetId,
          data,
          from: this.config.signerAddress,
          value: 0,
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

  public async xcall(xcallParams: XCallArgs): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.xcall.name);
    this.logger.info("Method start", requestContext, methodContext, { xcallParams });

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
    const { params, amount, transactingAssetId, relayerFee } = xcallParams;

    const { originDomain } = params;

    const ConnextContractAddress = this.config.chains[originDomain].deployments!.connext;

    const chainId = await getChainIdFromDomain(originDomain, this.chainData);
    // if transactingAssetId is AddressZero then we are adding relayerFee to amount for value
    const value =
      transactingAssetId === constants.AddressZero
        ? BigNumber.from(amount).add(BigNumber.from(relayerFee))
        : BigNumber.from(relayerFee);

    const data = this.contracts.connext.encodeFunctionData("xcall", [
      {
        params,
        amount,
        transactingAssetId,
        relayerFee,
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

  async bumpTransfer(params: {
    domain: string;
    transferId: string;
    relayerFee: string;
  }): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.bumpTransfer.name);
    this.logger.info("Method start", requestContext, methodContext, { params });

    const { domain, transferId, relayerFee } = params;

    const chainId = await getChainIdFromDomain(domain, this.chainData);
    const ConnextContractAddress = this.config.chains[domain].deployments!.connext;

    // if transactingAssetId is AddressZero then we are adding relayerFee to amount for value
    const value = BigNumber.from(relayerFee);

    const data = this.contracts.connext.encodeFunctionData("bumpTransfer", [transferId]);

    this.logger.info(`${this.bumpTransfer.name} transaction created`, requestContext, methodContext);

    return {
      to: ConnextContractAddress,
      value,
      data,
      from: this.config.signerAddress,
      chainId,
    };
  }
}
