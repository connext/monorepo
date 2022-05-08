import { getChainData, Logger, ChainData } from "@connext/nxtp-utils";
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
export class NxtpSdkUtils {
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
  ): Promise<NxtpSdkUtils> {
    const chainData = _chainData ?? (await getChainData());
    if (!chainData) {
      throw new Error("Could not get chain data");
    }

    const nxtpConfig = await getConfig(_config, chainData, contractDeployments);
    const logger = _logger
      ? _logger.child({ name: "NxtpSdkUtils" })
      : new Logger({ name: "NxtpSdkUtils", level: nxtpConfig.logLevel });

    return new NxtpSdkUtils(nxtpConfig, logger, chainData);
  }

  async getRouters(domain: string): Promise<string[]> {
    /* using backend api */

    console.log(domain);
    return ["0x0000000000000000000000000000000000000000"];
  }

  async getWhitelistedAsset(domain: string): Promise<string[]> {
    /*  using backend api */
    console.log(domain);
    return ["0x0000000000000000000000000000000000000000"];
  }

  async getTotalLiquidity(domain: string): Promise<{ asset: string; availableLiquidity: string }[]> {
    /* fetch using covalent api and back it up using backend api */
    console.log(domain);
    return [{ asset: "0x0000000000000000000000000000000000000000", availableLiquidity: "0" }];
  }

  async getRouterLiquidity(domain: string, router: string): Promise<{ [asset: string]: string }[]> {
    /*  using backend api */
    console.log(domain, router);
    return [{ assetId: "0x0000000000000000000000000000000000000000" }];
  }

  // async getTransfersByUser(user: string): Promise<Transfers[]> {
  //   /*  using backend api */

  //   return [{ assetId: "0x0000000000000000000000000000000000000000" }];
  // }

  // Metrics
  async getTotalVolume(domain: string): Promise<{ [asset: string]: string }[]> {
    /*  using backend api */
    console.log(domain);
    return [{ "0x": "0" }];
  }

  async getTotalTransfers(domain: string): Promise<string> {
    console.log(domain);
    return "0";
  }
}
