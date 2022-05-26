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

    const nxtpConfig = await getConfig(_config, contractDeployments, chainData);
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

  async getTransfersByUser(params: {
    userAddress: string;
    status?: XTransferStatus;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const { requestContext, methodContext } = createLoggingContext(this.getTransfersByUser.name);

    const { userAddress, status, range } = params;

    const userIdentifier = `xcall_caller=eq.${userAddress.toLowerCase()}&`;
    const statusIdentifier = status ? `status=eq.${status}` : "";

    const searchIdentifier = userIdentifier + statusIdentifier;

    const limit = range?.limit ? range.limit : 0;
    const offset = range?.offset ? range.offset : 10;

    const rangeIdentifier = `?limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(this.config.backendUrl!, "transfers?", searchIdentifier + rangeIdentifier + orderIdentifier);

    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error: any) {
      this.logger.error(`backend api request failed`, requestContext, methodContext, jsonifyError(error as Error));
      throw error;
    }
  }

  async getTransfers(params: { range?: { limit?: number; offset?: number } }): Promise<any> {
    const { requestContext, methodContext } = createLoggingContext(this.getTransfersByStatus.name);

    const { range } = params;

    const limit = range?.limit ? range.limit : 0;
    const offset = range?.offset ? range.offset : 10;

    const rangeIdentifier = `limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(this.config.backendUrl!, "transfers?", rangeIdentifier + orderIdentifier);

    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error: any) {
      this.logger.error(`backend api request failed`, requestContext, methodContext, jsonifyError(error as Error));
      throw error;
    }
  }

  async getTransfersByStatus(params: {
    status: XTransferStatus;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const { requestContext, methodContext } = createLoggingContext(this.getTransfersByStatus.name);

    const { status, range } = params;

    const statusIdentifier = `status=eq.${status}`;

    const limit = range?.limit ? range.limit : 0;
    const offset = range?.offset ? range.offset : 10;

    const rangeIdentifier = `?limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(this.config.backendUrl!, "transfers?", statusIdentifier + rangeIdentifier + orderIdentifier);

    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error: any) {
      this.logger.error(`backend api request failed`, requestContext, methodContext, jsonifyError(error as Error));
      throw error;
    }
  }

  async getTransfersByRouter(params: {
    routerAddress: string;
    status?: XTransferStatus;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const { requestContext, methodContext } = createLoggingContext(this.getTransfersByUser.name);

    const { routerAddress, status, range } = params;

    const routerIdentifier = `routers=cs.%${routerAddress.toLowerCase()}%7D&`;
    const statusIdentifier = status ? `status=eq.${status}` : "";

    const searchIdentifier = routerIdentifier + statusIdentifier;

    const limit = range?.limit ? range.limit : 0;
    const offset = range?.offset ? range.offset : 10;

    const rangeIdentifier = `?limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(this.config.backendUrl!, "transfers?", searchIdentifier + rangeIdentifier + orderIdentifier);

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

    const uri = formatUrl(this.config.backendUrl!, "transfers?", `transfer_id=eq.${transferId.toLowerCase()}`);

    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error: any) {
      this.logger.error(`backend api request failed`, requestContext, methodContext, jsonifyError(error as Error));
      throw error;
    }
  }

  async getTransferByTransactionHash(transactionHash: string): Promise<any> {
    const { requestContext, methodContext } = createLoggingContext(this.getTransferByTransactionHash.name);

    const uri = formatUrl(
      this.config.backendUrl!,
      "transfers?",
      `xcall_transaction_hash=eq.${transactionHash.toLowerCase()}`,
    );

    try {
      const response = await axios.get(uri);
      return response.data;
    } catch (error: any) {
      this.logger.error(`backend api request failed`, requestContext, methodContext, jsonifyError(error as Error));
      throw error;
    }
  }
}
