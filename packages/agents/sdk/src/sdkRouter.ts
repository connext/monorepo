import { constants, providers, BigNumber } from "ethers";
import { getChainData, Logger, createLoggingContext, ChainData, getChainIdFromDomain } from "@connext/nxtp-utils";
import {
  getContractInterfaces,
  ConnextContractInterfaces,
  contractDeployments,
  ChainReader,
} from "@connext/nxtp-txservice";

import { SignerAddressMissing } from "./lib/errors";
import { NxtpSdkConfig, getConfig } from "./config";

/**
 * @classdesc Lightweight class to facilitate interaction with the Connext contract on configured chains.
 *
 */
export class NxtpSdkRouter {
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
  ): Promise<NxtpSdkRouter> {
    const chainData = _chainData ?? (await getChainData());
    if (!chainData) {
      throw new Error("Could not get chain data");
    }

    const nxtpConfig = await getConfig(_config, chainData, contractDeployments);
    const logger = _logger
      ? _logger.child({ name: "NxtpSdkRouter" })
      : new Logger({ name: "NxtpSdkRouter", level: nxtpConfig.logLevel });

    return new NxtpSdkRouter(nxtpConfig, logger, chainData);
  }

  async addLiquidityForRouter(params: {
    domain: string;
    amount: string;
    assetId: string;
    router: string;
  }): Promise<providers.TransactionRequest> {
    const { requestContext, methodContext } = createLoggingContext(this.addLiquidityForRouter.name);
    this.logger.info("Method start", requestContext, methodContext, { params });
    const signerAddress = this.config.signerAddress;
    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const { domain, amount, assetId, router } = params;

    const chainId = await getChainIdFromDomain(domain, this.chainData);
    const ConnextContractAddress = this.config.chains[domain].deployments!.connext;

    const value = assetId === constants.AddressZero ? BigNumber.from(amount) : constants.Zero;
    const data = this.contracts.connext.encodeFunctionData("addLiquidityFor", [amount, assetId, router]);

    const txRequest = {
      to: ConnextContractAddress,
      value,
      data,
      from: signerAddress,
      chainId,
    };

    this.logger.info(
      `${this.addLiquidityForRouter.name} transaction created`,
      requestContext,
      methodContext,
      txRequest,
    );

    return txRequest;
  }

  async changeSignerAddress(signerAddress: string) {
    this.config.signerAddress = signerAddress;
  }
}
