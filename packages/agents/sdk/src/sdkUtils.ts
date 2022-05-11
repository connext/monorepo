import {
  getChainData,
  Logger,
  ChainData,
  formatUrl,
  createLoggingContext,
  XTransferStatus,
  jsonifyError,
} from "@connext/nxtp-utils";
import {
  getContractInterfaces,
  ConnextContractInterfaces,
  contractDeployments,
  ChainReader,
} from "@connext/nxtp-txservice";
import axios from "axios";

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

  async getRoutersData(): Promise<any> {
    const { requestContext, methodContext } = createLoggingContext(this.getRoutersData.name);
    const uri = formatUrl(this.config.backendUrl!, "routers_with_balances");

    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error: any) {
      this.logger.error(`backend api request failed`, requestContext, methodContext, jsonifyError(error as Error));
      throw error;
    }
  }

  async getTransfersByUser(params: { user?: string; status?: XTransferStatus }): Promise<any> {
    const { requestContext, methodContext } = createLoggingContext(this.getTransfersByUser.name);

    const { user, status } = params;
    const userAddress = user ?? this.config.signerAddress;

    const userIdentifier = `xcall_caller=eq.${userAddress}&`;
    const statusIdentifier = status ? `status=eq.${status}` : "";
    const uri = formatUrl(this.config.backendUrl!, "transfers?", userIdentifier + statusIdentifier);

    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error: any) {
      this.logger.error(`backend api request failed`, requestContext, methodContext, jsonifyError(error as Error));
      throw error;
    }
  }

  async getTransfersByStatus(status: XTransferStatus): Promise<any> {
    const { requestContext, methodContext } = createLoggingContext(this.getTransfersByStatus.name);

    const statusIdentifier = `status=eq.${status}`;
    const uri = formatUrl(this.config.backendUrl!, "transfers?", statusIdentifier);

    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error: any) {
      this.logger.error(`backend api request failed`, requestContext, methodContext, jsonifyError(error as Error));
      throw error;
    }
  }

  async getTransferById(transferId: string): Promise<any> {
    const { requestContext, methodContext } = createLoggingContext(this.getTransferById.name);

    const uri = formatUrl(this.config.backendUrl!, "transfers?", `transfer_id=eq.${transferId}`);

    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error: any) {
      this.logger.error(`backend api request failed`, requestContext, methodContext, jsonifyError(error as Error));
      throw error;
    }
  }
  // async getWhitelistedAsset(domain: string): Promise<string[]> {
  //   /*  using backend api */
  //   console.log(domain);
  //   return ["0x0000000000000000000000000000000000000000"];
  // }

  // async getTotalLiquidity(domain: string): Promise<{ asset: string; availableLiquidity: string }[]> {
  //   /* fetch using covalent api and back it up using backend api */
  //   console.log(domain);
  //   return [{ asset: "0x0000000000000000000000000000000000000000", availableLiquidity: "0" }];
  // }

  // Metrics
  // async getTotalVolume(domain: string): Promise<{ [asset: string]: string }[]> {
  //   /*  using backend api */
  //   console.log(domain);
  //   return [{ "0x": "0" }];
  // }

  // async getTotalTransfers(domain: string): Promise<string> {
  //   console.log(domain);
  //   return "0";
  // }
}
