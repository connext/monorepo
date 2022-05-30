import { Logger, ChainData, formatUrl, XTransferStatus, transfersCastForUrl } from "@connext/nxtp-utils";
import {
  getContractInterfaces,
  ConnextContractInterfaces,
  contractDeployments,
  ChainReader,
} from "@connext/nxtp-txservice";
import { providers } from "ethers";

import { getChainData, validateUri, axiosGetRequest } from "./lib/helpers";
import { ChainDataUndefined } from "./lib/errors";
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
      throw new ChainDataUndefined();
    }

    const nxtpConfig = await getConfig(_config, contractDeployments, chainData);
    const logger = _logger
      ? _logger.child({ name: "NxtpSdkUtils" })
      : new Logger({ name: "NxtpSdkUtils", level: nxtpConfig.logLevel });

    return new NxtpSdkUtils(nxtpConfig, logger, chainData);
  }

  async parseConnextTransactionReceipt(transactionReceipt: providers.TransactionReceipt): Promise<any> {
    const parsedlogs: any = [];
    transactionReceipt.logs.forEach((log) => {
      try {
        const l = this.contracts.connext.parseLog(log);
        parsedlogs.push(l);
      } catch (e: unknown) {}
    });

    return parsedlogs;
  }

  async getRoutersData(): Promise<any> {
    const uri = formatUrl(this.config.backendUrl!, "routers_with_balances");
    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransfersByUser(params: {
    userAddress: string;
    status?: XTransferStatus;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const { userAddress, status, range } = params;

    const userIdentifier = `xcall_caller=eq.${userAddress.toLowerCase()}&`;
    const statusIdentifier = status ? `status=eq.${status}` : "";

    const searchIdentifier = userIdentifier + statusIdentifier;

    const limit = range?.limit ? range.limit : 10;
    const offset = range?.offset ? range.offset : 0;

    const rangeIdentifier = `&limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(
      this.config.backendUrl!,
      "transfers?",
      searchIdentifier + rangeIdentifier + orderIdentifier + `&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransfers(params: { range?: { limit?: number; offset?: number } }): Promise<any> {
    const { range } = params;

    const limit = range?.limit ? range.limit : 10;
    const offset = range?.offset ? range.offset : 0;

    const rangeIdentifier = `limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(
      this.config.backendUrl!,
      "transfers?",
      rangeIdentifier + orderIdentifier + `&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransfersByStatus(params: {
    status: XTransferStatus;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const { status, range } = params;

    const statusIdentifier = `status=eq.${status}`;

    const limit = range?.limit ? range.limit : 10;
    const offset = range?.offset ? range.offset : 0;

    const rangeIdentifier = `&limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(
      this.config.backendUrl!,
      "transfers?",
      statusIdentifier + rangeIdentifier + orderIdentifier + `&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransfersByRouter(params: {
    routerAddress: string;
    status?: XTransferStatus;
    range?: { limit?: number; offset?: number };
  }): Promise<any> {
    const { routerAddress, status, range } = params;

    const routerIdentifier = `routers=cs.%7B${routerAddress.toLowerCase()}%7D&`;
    const statusIdentifier = status ? `status=eq.${status}` : "";

    const searchIdentifier = routerIdentifier + statusIdentifier;

    const limit = range?.limit ? range.limit : 10;
    const offset = range?.offset ? range.offset : 0;

    const rangeIdentifier = `&limit=${limit}&offset=${offset}`;
    const orderIdentifier = `&order=xcall_timestamp.desc`;

    const uri = formatUrl(
      this.config.backendUrl!,
      "transfers?",
      searchIdentifier + rangeIdentifier + orderIdentifier + `&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransferById(transferId: string): Promise<any> {
    const uri = formatUrl(
      this.config.backendUrl!,
      "transfers?",
      `transfer_id=eq.${transferId.toLowerCase()}&${transfersCastForUrl}`,
    );
    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async getTransferByTransactionHash(transactionHash: string): Promise<any> {
    const uri = formatUrl(
      this.config.backendUrl!,
      "transfers?",
      `xcall_transaction_hash=eq.${transactionHash.toLowerCase()}&${transfersCastForUrl}`,
    );

    // Validate uri
    validateUri(uri);

    return await axiosGetRequest(uri);
  }

  async changeSignerAddress(signerAddress: string) {
    this.config.signerAddress = signerAddress;
  }
}
