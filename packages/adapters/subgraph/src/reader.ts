import { BigNumber } from "ethers";
import {
  XTransfer,
  SubgraphQueryMetaParams,
  ChainData,
  Asset,
  OriginTransfer,
  DestinationTransfer,
  RouterBalance,
  AssetBalance,
  SubgraphQueryByTransferIDsMetaParams,
  SubgraphQueryByNoncesMetaParams,
  SubgraphQueryByTimestampMetaParams,
  OriginMessage,
  RootMessage,
  AggregatedRoot,
  PropagatedRoot,
  ConnectorMeta,
  RootManagerMeta,
  RootManagerMode,
  SpokeConnectorMode,
  ReceivedAggregateRoot,
  StableSwapPool,
  StableSwapExchange,
  StableSwapPoolEvent,
  RelayerFeesIncrease,
  SlippageUpdate,
  RouterDailyTVL,
  StableSwapTransfer,
  SnapshotRoot,
  OptimisticRootFinalized,
  OptimisticRootPropagated,
  Snapshot,
  SpokeOptimisticRoot,
} from "@connext/nxtp-utils";

import { getHelpers } from "./lib/helpers";
import {
  getAssetBalanceQuery,
  getAssetBalancesQuery,
  getAssetByCanonicalIdQuery,
  getAssetByLocalQuery,
  getDestinationTransfersByDomainAndIdsQuery,
  getRouterQuery,
  getOriginTransfersByIdsQuery,
  getOriginTransfersByNoncesCombinedQuery,
  getOriginTransfersByIdsFallbackQuery,
  getOriginTransfersQuery,
  getOriginTransfersFallbackQuery,
  getOriginTransfersByTransactionHashesQuery,
  getDestinationTransfersByIdsQuery,
  getAssetBalancesRoutersQuery,
  getLastestBlockNumberQuery,
  getMaxRoutersPerTransferQuery,
  getOriginTransfersByIDsCombinedQuery,
  getDestinationTransfersByIDsCombinedQuery,
  getOriginTransfersByNonceQuery,
  getDestinationTransfersByExecutedNonceQuery,
  getDestinationTransfersByDomainAndReconcileNonceQuery,
  getOriginMessagesByDomainAndIndexQuery,
  getSentRootMessagesByDomainAndBlockQuery,
  getConnectorMetaQuery,
  getProcessedRootMessagesByDomainAndBlockQuery,
  getReceivedAggregatedRootsByDomainQuery,
  getSwapExchangesQuery,
  getProposedSnapshotsByDomainQuery,
  getFinalizedRootsByDomainQuery,
  getPropagatedOptimisticRootsByDomainQuery,
  getSavedSnapshotRootsByDomainQuery,
  getProposedSpokeOptimisticRootsByDomainQuery,
  getSpokeConnectorModeQuery,
} from "./lib/operations";
import {
  getAggregatedRootsByDomainQuery,
  getAssetsByLocalsQuery,
  getAssetsQuery,
  getLpTransfersQuery,
  getPoolEventsQuery,
  getPropagatedRootsQuery,
  getRelayerFeesIncreasesQuery,
  getRootManagerMetaQuery,
  getRootManagerModeQuery,
  getRouterDailyTVLQuery,
  getSlippageUpdatesQuery,
  getStableSwapPoolsQuery,
} from "./lib/operations/queries";
import { SubgraphMap } from "./lib/entities";

let context: { config: SubgraphMap };
export const getContext = () => context;

export class SubgraphReader {
  private static instance: SubgraphReader | undefined;

  // Getter for reading supported domains.
  public get supported(): Record<string, boolean> {
    return { ...context.config.supported };
  }

  private constructor(config: SubgraphMap) {
    context = { config };
  }

  public static async create(
    chainData: Map<string, ChainData>,
    env: "staging" | "production" = "production",
    prefixOverride?: string, // optional override for the prefix
  ): Promise<SubgraphReader> {
    if (SubgraphReader.instance) {
      return SubgraphReader.instance;
    }
    const { create } = getHelpers();
    const config = await create(chainData, env, prefixOverride);
    return new SubgraphReader(config);
  }

  /**
   * Make a direct GraphQL query to the subgraph of the given domain.
   *
   * @param query - The GraphQL query string you want to send.
   * @returns Query result (any).
   */
  public async query(query: string): Promise<any> {
    const { execute } = getHelpers();
    return await execute(query);
  }

  /**
   * Gets the latest blockNumber for domains.
   * @param domains The domain list you're getting the lastest blockNumber for
   */
  public async getLatestBlockNumber(domains: string[]): Promise<Map<string, number>> {
    const { execute, getPrefixForDomain } = getHelpers();
    const prefixes = domains.map((domain) => getPrefixForDomain(domain));
    const query = getLastestBlockNumberQuery(prefixes);
    const response = await execute(query);
    const blockNumberRes: Map<string, number> = new Map();
    for (const domain of response.keys()) {
      if (response.has(domain) && response.get(domain)!.length > 0) {
        const blockInfo = response.get(domain)![0];
        if (blockInfo.block?.number) {
          blockNumberRes.set(domain, Number(blockInfo.block.number));
        } else {
          console.error(`No block number found for domain ${domain}!`);
        }
      }
    }
    return blockNumberRes;
  }

  /**
   * Gets the maxRoutersPerTransfer for domains
   * @param domains The domain list you're getting the maxRoutersPerTransfer for
   */
  public async getMaxRoutersPerTransfer(domains: string[]): Promise<Map<string, number>> {
    const { execute, getPrefixForDomain } = getHelpers();
    const prefixes = domains.map((domain) => getPrefixForDomain(domain));
    const maxRoutersRes: Map<string, number> = new Map();
    const query = getMaxRoutersPerTransferQuery(prefixes);
    try {
      const response = await execute(query);
      for (const domain of response.keys()) {
        if (response.has(domain) && response.get(domain)!.length > 0) {
          const settingInfo = response.get(domain)![0];
          maxRoutersRes.set(domain, Number(settingInfo.maxRoutersPerTransfer));
        }
      }
    } catch (e: unknown) {
      domains.forEach((domain) => maxRoutersRes.set(domain, 5));
    }
    return maxRoutersRes;
  }

  /**
   * Returns available liquidity for the given asset on the Connext on the provided chain.
   *
   * @param domain - The domain you want to determine liquidity on
   * @param router - Router address
   * @param local - The local asset you want to determine router liquidity of
   * @returns The available balance
   */
  public async getAssetBalance(domain: string, router: string, local: string): Promise<BigNumber> {
    const { execute, getPrefixForDomain } = getHelpers();
    const prefix = getPrefixForDomain(domain);

    const query = getAssetBalanceQuery(prefix, router.toLowerCase(), local.toLowerCase());
    const response = await execute(query);
    const values = [...response.values()];
    if (!values[0] || values[0].length == 0 || values[0][0] == null) {
      return BigNumber.from("0");
    }
    return BigNumber.from(values[0][0].amount);
  }

  /**
   * Returns available liquidity for all of the routers' assets on target chain.
   *
   * @param domain - The domain you want to determine liquidity on
   * @param router - Router address
   * @returns An array of asset ids and amounts of liquidity
   */
  public async getAssetBalances(domain: string, router: string): Promise<Record<string, BigNumber>> {
    const { execute, getPrefixForDomain } = getHelpers();
    const prefix = getPrefixForDomain(domain);

    const query = getAssetBalancesQuery(prefix, router.toLowerCase());
    const response = await execute(query);
    const values = [...response.values()];

    const assetBalances = values[0] ? values[0][0] : [];
    const balances: Record<string, BigNumber> = {};
    assetBalances.forEach((bal: any) => (balances[bal.asset.id as string] = BigNumber.from(bal.amount)));
    return balances;
  }

  /**
   * Returns available liquidity for of the routers assets on target chain.
   *
   * @param domain - The domain you want to determine liquidity on
   * @returns An array of asset ids and amounts of liquidity
   */
  public async getAssetBalancesRouters(
    domain: string,
    offset: number,
    limit: number,
    orderDirection: "asc" | "desc" = "desc",
  ): Promise<RouterBalance[]> {
    const { execute, getPrefixForDomain } = getHelpers();
    const prefix = getPrefixForDomain(domain);

    const query = getAssetBalancesRoutersQuery(prefix, offset, limit, orderDirection);
    const response = await execute(query);
    const routers = [...response.values()][0][0];
    return routers.map((router: any) => {
      return {
        assets: router.assetBalances.map((a: any) => {
          return {
            adoptedAsset: a.asset.adoptedAsset,
            balance: a.amount,
            locked: a.locked,
            supplied: a.supplied,
            removed: a.removed,
            feesEarned: a.feesEarned ?? 0,
            blockNumber: a.asset.blockNumber,
            canonicalDomain: a.asset.canonicalDomain,
            canonicalId: a.asset.canonicalId,
            domain,
            localAsset: a.asset.id,
            id: a.asset.id,
            decimal: a.asset.decimal,
            key: a.asset.key,
          } as AssetBalance;
        }),
        router: router.id,
      } as RouterBalance;
    });
  }

  /**
   * Returns the router's approval status
   *
   * @param domain - The domain to get the router status of
   * @param _router - The router address
   * @returns A boolean indicating the router is approved
   */
  public async isRouterApproved(domain: string, _router: string): Promise<boolean> {
    const { execute, getPrefixForDomain } = getHelpers();
    const prefix = getPrefixForDomain(domain);

    const query = getRouterQuery(prefix, _router.toLowerCase());
    const response = await execute(query);
    const router = [...response.values()][0] ? [...response.values()][0][0] : undefined;
    return !!router?.id;
  }

  public async getAssets(domain: string): Promise<Asset[]> {
    const { execute, getPrefixForDomain } = getHelpers();
    const prefix = getPrefixForDomain(domain);

    const query = getAssetsQuery(prefix);
    const response = await execute(query);
    const assets: Asset[] = [...response.values()]
      .map((v) => v.flat())
      .flat()
      .filter((v) => !!v.status);
    return assets.map((asset) => ({ ...asset, domain }));
  }

  /**
   * Gets the asset by the local address on the specific domain
   * @param domain - The domain you're going to get the asset on
   * @param local - The local asset address
   */
  public async getAssetByLocal(domain: string, local: string): Promise<Asset | undefined> {
    const { execute, getPrefixForDomain } = getHelpers();
    const prefix = getPrefixForDomain(domain);

    const query = getAssetByLocalQuery(prefix, local.toLowerCase());
    const response = await execute(query);
    const assets = [...response.values()][0] ? [...response.values()][0][0] : [];
    if (assets.length === 0) {
      return undefined;
    }
    return assets[0] as Asset;
  }

  public async getAssetsByLocals(domain: string, locals: string[]): Promise<Asset[]> {
    const { execute, getPrefixForDomain } = getHelpers();
    const prefix = getPrefixForDomain(domain);

    const query = getAssetsByLocalsQuery(
      prefix,
      locals.map((l) => l.toLowerCase()),
    );
    const response = await execute(query);

    const assets: Asset[] = [...response.values()].map((v) => v.flat()).flat();
    return assets;
  }

  /**
   * Gets the asset by the canonicalId on the specific domain
   * @param domain - The domain you're going to get the asset on
   * @param canonicalId - The canonicalId represents canoncial assetId
   */
  public async getAssetByCanonicalId(domain: string, canonicalId: string): Promise<Asset | undefined> {
    const { execute, getPrefixForDomain } = getHelpers();
    const prefix = getPrefixForDomain(domain);

    const query = getAssetByCanonicalIdQuery(prefix, canonicalId.toLowerCase());
    const response = await execute(query);
    const assets = [...response.values()][0] ? [...response.values()][0][0] : [];
    if (assets.length === 0) {
      return undefined;
    }
    return assets[0] as Asset;
  }

  // public async getTransaction(domain: string, transactionId: string): Promise<XTransfer> {}
  /**
   * Retrieve a target OriginTransfer belonging to a given domain by transfer ID.
   *
   * @param domain - The domain you want to get the transfer from.
   * @param transferId - The ID of the transfer you want to retrieve.
   * @returns Parsed OriginTransfer object if transfer exists, otherwise undefined.
   */
  public async getOriginTransferById(domain: string, transferId: string): Promise<OriginTransfer | undefined> {
    const { parser, execute, getPrefixForDomain } = getHelpers();
    const { config } = getContext();
    const prefix: string = getPrefixForDomain(domain);

    let query = undefined;
    try {
      query = getOriginTransfersByIdsQuery(prefix, [`"${transferId}"`]);
    } catch (err: any) {
      console.info(`Primary query failed attempting fallback!`);
      query = getOriginTransfersByIdsFallbackQuery(prefix, [`"${transferId}"`]);
    }
    const response = await execute(query);
    const transfers = [...response.values()][0] ? [...response.values()][0][0] : [];
    return transfers.length === 1 ? parser.originTransfer(transfers[0], config.assetId[domain]) : undefined;
  }

  /**
   * Retrieve a target OriginTransfer belonging to a given domain by its transaction hash (the hash of the xcall
   * method call on-chain).
   *
   * @param domain - The domain you want to get the transfer from.
   * @param hash - The xcall transactionHash belonging to the transfer you want to retrieve.
   * @returns Parsed OriginTransfer object if transfer exists, otherwise undefined.
   */
  public async getOriginTransferByHash(domain: string, hash: string): Promise<OriginTransfer | undefined> {
    const { parser, execute, getPrefixForDomain } = getHelpers();
    const { config } = getContext();
    const prefix: string = getPrefixForDomain(domain);

    const query = getOriginTransfersByTransactionHashesQuery(prefix, [`"${hash}"`]);
    const response = await execute(query);
    const transfers = [...response.values()][0][0];
    return transfers.length === 1 ? parser.originTransfer(transfers[0], config.assetId[domain]) : undefined;
  }

  /**
   * Retrieve a target DestinationTransfer belonging to a given domain by transfer ID.
   *
   * @param domain - The domain you want to get the transfer from.
   * @param transferId - The ID of the transfer you want to retrieve.
   * @returns Parsed DestinationTransfer object if transfer exists, otherwise undefined.
   */
  public async getDestinationTransferById(
    domain: string,
    transferId: string,
  ): Promise<DestinationTransfer | undefined> {
    const { parser, execute, getPrefixForDomain } = getHelpers();
    const prefix: string = getPrefixForDomain(domain);

    const query = getDestinationTransfersByIdsQuery(prefix, [`"${transferId}"`]);
    const response = await execute(query);
    const transfers = [...response.values()][0][0];
    return transfers.length === 1
      ? parser.destinationTransfer({ ...transfers[0], destinationDomain: domain })
      : undefined;
  }

  /**
   * Get the transfers across the multiple domains
   * @param agents - The reference parameters
   */
  public async getOriginTransfers(agents: Map<string, SubgraphQueryMetaParams>): Promise<XTransfer[]> {
    const { execute, parser } = getHelpers();
    const { config } = getContext();
    let xcalledXQuery = undefined;
    try {
      xcalledXQuery = getOriginTransfersQuery(agents);
    } catch (err: any) {
      console.info(`Primary query failed attempting fallback!`);
      xcalledXQuery = getOriginTransfersFallbackQuery(agents);
    }
    const response = await execute(xcalledXQuery);
    const transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      transfers.push(value?.flat());
    }

    const originTransfers: XTransfer[] = transfers
      .flat()
      .filter((x: any) => !!x)
      .map((e) => parser.originTransfer(e, config.assetId[e.originDomain]));

    return originTransfers;
  }

  public async getOriginTransfersByNonce(params: Map<string, SubgraphQueryMetaParams>): Promise<XTransfer[]> {
    const { execute, parser } = getHelpers();
    const { config } = getContext();
    const xcalledXQuery = getOriginTransfersByNonceQuery(params);
    const response = await execute(xcalledXQuery);

    const transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      transfers.push(value?.flat());
    }

    const originTransfers: XTransfer[] = transfers
      .flat()
      .filter((x: any) => !!x)
      .map((e) => parser.originTransfer(e, config.assetId[e.originDomain]));

    return originTransfers;
  }

  public async getDestinationTransfersByExecutedNonce(
    params: Map<string, SubgraphQueryMetaParams>,
  ): Promise<DestinationTransfer[]> {
    const { execute, parser } = getHelpers();
    const xcalledXQuery = getDestinationTransfersByExecutedNonceQuery(params);
    const response = await execute(xcalledXQuery);

    const transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const domainTransfers = value?.flat();

      transfers.push(
        domainTransfers?.map((x) => {
          return { ...x, destinationDomain: key };
        }),
      );
    }

    const destinationTransfers: DestinationTransfer[] = transfers
      .flat()
      .filter((x: any) => !!x)
      .map(parser.destinationTransfer);

    return destinationTransfers;
  }

  public async getOriginTransfersById(params: Map<string, SubgraphQueryByTransferIDsMetaParams>): Promise<XTransfer[]> {
    const { execute, parser } = getHelpers();
    const { config } = getContext();
    const xcalledXQuery = getOriginTransfersByIDsCombinedQuery(params);
    const response = await execute(xcalledXQuery);

    const transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      transfers.push(value?.flat());
    }

    const originTransfers: XTransfer[] = transfers
      .flat()
      .filter((x: any) => !!x)
      .map((e) => parser.originTransfer(e, config.assetId[e.originDomain]));

    return originTransfers;
  }

  public async getDestinationTransfersById(
    params: Map<string, SubgraphQueryByTransferIDsMetaParams>,
  ): Promise<DestinationTransfer[]> {
    const { execute, parser } = getHelpers();
    const xcalledXQuery = getDestinationTransfersByIDsCombinedQuery(params);
    const response = await execute(xcalledXQuery);

    const transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const domainTransfers = value?.flat();
      transfers.push(
        domainTransfers?.map((x) => {
          return { ...x, destinationDomain: key };
        }),
      );
    }

    const destinationTransfers: DestinationTransfer[] = transfers
      .flat()
      .filter((x: any) => !!x)
      .map(parser.destinationTransfer);

    return destinationTransfers;
  }

  public async getOriginTransfersByNonces(params: Map<string, SubgraphQueryByNoncesMetaParams>): Promise<XTransfer[]> {
    const { execute, parser } = getHelpers();
    const { config } = getContext();
    const xcalledXQuery = getOriginTransfersByNoncesCombinedQuery(params);
    const response = await execute(xcalledXQuery);

    const transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      transfers.push(value?.flat());
    }

    const originTransfers: XTransfer[] = transfers
      .flat()
      .filter((x: any) => !!x)
      .map((e) => parser.originTransfer(e, config.assetId[e.originDomain]));

    return originTransfers;
  }

  public async getDestinationTransfersByDomainAndReconcileNonce(
    param: SubgraphQueryMetaParams,
    domain: string,
  ): Promise<DestinationTransfer[]> {
    const { execute, parser } = getHelpers();
    const xcalledXQuery = getDestinationTransfersByDomainAndReconcileNonceQuery(param, domain);
    const response = await execute(xcalledXQuery);

    const transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const domainTransfers = value?.flat();
      transfers.push(
        domainTransfers?.map((x) => {
          return { ...x, destinationDomain: key };
        }),
      );
    }

    const destinationTransfers: DestinationTransfer[] = transfers
      .flat()
      .filter((x: any) => !!x)
      .map(parser.destinationTransfer);

    return destinationTransfers;
  }

  public async getOriginXCalls(agents: Map<string, SubgraphQueryMetaParams>): Promise<{
    txIdsByDestinationDomain: Map<string, string[]>;
    allTxById: Map<string, XTransfer>;
    latestNonces: Map<string, number>;
    txByOriginDomain: Map<string, XTransfer[]>;
  }> {
    const { execute, parser } = getHelpers();
    const { config } = getContext();
    let xcalledXQuery = undefined;
    try {
      xcalledXQuery = getOriginTransfersQuery(agents);
    } catch (err: any) {
      console.info(`Primary query failed attempting fallback!`);
      xcalledXQuery = getOriginTransfersFallbackQuery(agents);
    }
    const response = await execute(xcalledXQuery);
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();
    const txByOriginDomain: Map<string, XTransfer[]> = new Map();
    const allTxById: Map<string, XTransfer> = new Map();
    const latestNonces: Map<string, number> = new Map();

    for (const domain of response.keys()) {
      const value = response.get(domain);
      const xtransfersByDomain = (value ?? [])[0];
      const originTransfers: XTransfer[] = [];
      for (const xtransfer of xtransfersByDomain) {
        if (txIdsByDestinationDomain.has(xtransfer.destinationDomain as string)) {
          const txIds = txIdsByDestinationDomain.get(xtransfer.destinationDomain as string)!;

          txIds.push(`"${xtransfer.transferId as string}"`);
        } else {
          txIdsByDestinationDomain.set(xtransfer.destinationDomain as string, [`"${xtransfer.transferId as string}"`]);
        }
        const originTransfer = parser.originTransfer(xtransfer, config.assetId[xtransfer.originDomain]);
        allTxById.set(xtransfer.transferId as string, originTransfer);
        latestNonces.set(domain, xtransfer.nonce as number);
        originTransfers.push(originTransfer);
      }
      txByOriginDomain.set(domain, originTransfers);
    }

    return { txIdsByDestinationDomain, allTxById, latestNonces, txByOriginDomain };
  }

  public async getDestinationXCalls(
    txIdsByDestinationDomain: Map<string, string[]>,
    allTxById: Map<string, XTransfer>,
  ): Promise<DestinationTransfer[]> {
    const { execute, parser } = getHelpers();
    const destinationTransfersQuery = getDestinationTransfersByDomainAndIdsQuery(txIdsByDestinationDomain);
    const response = await execute(destinationTransfersQuery);

    const transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const domainTransfers = value?.flat();
      transfers.push(
        domainTransfers?.map((x) => {
          return { ...x, destinationDomain: key };
        }),
      );
    }

    const destinationTransfers: DestinationTransfer[] = transfers
      .flat()
      .filter((x: any) => !!x)
      .map(parser.destinationTransfer);

    destinationTransfers.forEach((tx) => {
      allTxById.delete(tx.transferId);
    });

    // create array of all transactions by status
    return [...allTxById.values()] as DestinationTransfer[];
  }

  /**
   * Gets all the destination transfers across all the chains
   * @param transfers - The xtransfers you're going to get the status for
   * @returns Executed/Reconciled xtransfers
   */
  public async getDestinationTransfers(transfers: OriginTransfer[]): Promise<DestinationTransfer[]> {
    const { parser, execute } = getHelpers();
    if (transfers.length == 0) return [];
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();
    const allOrigin: [string, XTransfer][] = transfers.map((transfer) => {
      const destinationDomainRecord = txIdsByDestinationDomain.get(transfer.xparams.destinationDomain);
      const txIds = destinationDomainRecord
        ? destinationDomainRecord.includes(transfer.transferId)
          ? destinationDomainRecord
          : destinationDomainRecord.concat(`"${transfer.transferId}"`)
        : [`"${transfer.transferId}"`];
      txIdsByDestinationDomain.set(transfer.xparams.destinationDomain, txIds);
      return [transfer.transferId, transfer];
    });

    const allTxById = new Map<string, XTransfer>(allOrigin);

    const destinationTransfersQuery = getDestinationTransfersByDomainAndIdsQuery(txIdsByDestinationDomain);
    const response = await execute(destinationTransfersQuery);
    const _transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const domainTransfers = value?.flat();
      _transfers.push(
        domainTransfers?.map((x) => {
          return { ...x, destinationDomain: key };
        }),
      );
    }

    const destinationTransfers: DestinationTransfer[] = _transfers
      .flat()
      .filter((x: any) => !!x)
      .map(parser.destinationTransfer);

    destinationTransfers.forEach((tx) => {
      const inMap = allTxById.get(tx.transferId)!;
      inMap.destination = tx.destination;
      allTxById.set(tx.transferId, inMap);
    });

    return [...allTxById.values()].filter((xTransfer) => !!xTransfer.destination) as DestinationTransfer[];
  }

  /**
   * Gets all the origin transfers across for the given domain
   * @param domain - The domain of the transfer IDs to be queried
   * @param transferIds - The transfer IDs to be queried
   * @returns OriginTransfers as XTransfers[]
   */
  public async getOriginTransfersByDomain(domain: string, transferIds: string[]): Promise<XTransfer[]> {
    const { parser, execute, getPrefixForDomain } = getHelpers();
    const { config } = getContext();
    const prefix: string = getPrefixForDomain(domain);

    if (transferIds.length == 0) return [];
    const quotedTransferIds = transferIds.map((id) => `"${id}"`);

    let originTransfersQuery = undefined;
    try {
      originTransfersQuery = getOriginTransfersByIdsQuery(prefix, quotedTransferIds);
    } catch (err: any) {
      console.info(`Primary query failed attempting fallback!`);
      originTransfersQuery = getOriginTransfersByIdsFallbackQuery(prefix, quotedTransferIds);
    }
    const response = await execute(originTransfersQuery);
    const _transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const domainTransfers = value?.flat();
      _transfers.push(
        domainTransfers?.map((x) => {
          return { ...x, originDomain: key };
        }),
      );
    }

    const originTransfers: OriginTransfer[] = _transfers
      .flat()
      .filter((x: any) => !!x)
      .map((transfer) => parser.originTransfer(transfer, config.assetId[transfer.originDomain]));

    return [...originTransfers.values()].filter((xTransfer) => !!xTransfer.origin);
  }

  /**
   * Gets all the origin message starting with index for a given domain
   */
  public async getOriginMessagesByDomain(
    params: { domain: string; offset: number; limit: number; maxBlockNumber: number }[],
  ): Promise<OriginMessage[]> {
    const { parser, execute } = getHelpers();
    const originMessageQuery = getOriginMessagesByDomainAndIndexQuery(params);
    const response = await execute(originMessageQuery);
    const _messages: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _message = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _messages.push(_message);
    }

    const originMessages: OriginMessage[] = _messages
      .flat()
      .filter((x: any) => !!x)
      .map(parser.originMessage);

    return originMessages;
  }

  /**
   * Gets all the sent root messages starting with blocknumber for a given domain
   */
  public async getSentRootMessagesByDomain(
    params: { domain: string; offset: number; limit: number }[],
  ): Promise<RootMessage[]> {
    const { parser, execute } = getHelpers();
    const sentRootMessageQuery = getSentRootMessagesByDomainAndBlockQuery(params);
    const response = await execute(sentRootMessageQuery);
    const _messages: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _message = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _messages.push(_message);
    }

    const sentRootMessages: RootMessage[] = _messages
      .flat()
      .filter((x: any) => !!x)
      .map(parser.rootMessage);

    return sentRootMessages;
  }

  /**
   * Gets all the processed root messages starting with blocknumber for a given domain
   * @param params - The fetch params
   * @returns - The array of `RootMessage`
   */
  public async getProcessedRootMessagesByDomain(
    params: { domain: string; offset: number; limit: number }[],
  ): Promise<RootMessage[]> {
    const { parser, execute } = getHelpers();

    const processedRootMessageQuery = getProcessedRootMessagesByDomainAndBlockQuery(params);
    const response = await execute(processedRootMessageQuery);
    const _messages: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _message = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _messages.push(_message);
    }

    const processedRootMessages: RootMessage[] = _messages
      .flat()
      .filter((x: any) => !!x)
      .map(parser.rootMessage);

    return processedRootMessages;
  }

  /**
   * Gets all the aggregated rootsstarting with index for a given domain
   */
  public async getGetAggregatedRootsByDomain(
    params: { hub: string; index: number; limit: number }[],
  ): Promise<AggregatedRoot[]> {
    const { parser, execute } = getHelpers();
    const aggregatedRootsByDomainQuery = getAggregatedRootsByDomainQuery(params);
    const response = await execute(aggregatedRootsByDomainQuery);

    const _roots: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _root = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _roots.push(_root);
    }

    const aggregatedRoots: AggregatedRoot[] = _roots
      .flat()
      .filter((x: any) => !!x)
      .map(parser.aggregatedRoot);

    return aggregatedRoots;
  }

  /**
   * Gets all the proposed snapshots
   */
  public async getProposedSnapshotsByDomain(
    params: { hub: string; snapshotId: number; limit: number }[],
  ): Promise<Snapshot[]> {
    const { parser, execute } = getHelpers();
    const proposedSnapshotsByDomainQuery = getProposedSnapshotsByDomainQuery(params);
    const response = await execute(proposedSnapshotsByDomainQuery);

    const _roots: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _root = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _roots.push(_root);
    }

    const proposedRoots: Snapshot[] = _roots
      .flat()
      .filter((x: any) => !!x)
      .map(parser.proposedRoot);

    return proposedRoots;
  }

  /**
   * Gets proposed spoke optimistic roots
   */
  public async getProposedSpokeOptimisticRootsByDomain(
    params: { domain: string; rootTimestamp: number; limit: number }[],
  ): Promise<SpokeOptimisticRoot[]> {
    const { parser, execute } = getHelpers();
    const proposedSpokeOptimisticRootsByDomainQuery = getProposedSpokeOptimisticRootsByDomainQuery(params);
    const response = await execute(proposedSpokeOptimisticRootsByDomainQuery);

    const _roots: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _root = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _roots.push(_root);
    }

    const proposedRoots: SpokeOptimisticRoot[] = _roots
      .flat()
      .filter((x: any) => !!x)
      .map(parser.proposedSpokeOptimisticRoot);

    return proposedRoots;
  }

  /**
   * Gets saved snapshots
   */
  public async getSavedSnapshotRootsByDomain(
    params: { hub: string; snapshotId: number; limit: number }[],
  ): Promise<SnapshotRoot[]> {
    const { parser, execute } = getHelpers();
    const proposedSnapshotsByDomainQuery = getSavedSnapshotRootsByDomainQuery(params);
    const response = await execute(proposedSnapshotsByDomainQuery);

    const _roots: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _root = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _roots.push(_root);
    }

    const snapshotRoots: SnapshotRoot[] = _roots
      .flat()
      .filter((x: any) => !!x)
      .map(parser.snapshotRoot);

    return snapshotRoots;
  }

  /**
   * Gets all the finalized roots
   */
  public async getFinalizedRootsByDomain(
    params: { hub: string; timestamp: number; limit: number }[],
  ): Promise<OptimisticRootFinalized[]> {
    const { parser, execute } = getHelpers();
    const finalizedRootsByDomainQuery = getFinalizedRootsByDomainQuery(params);
    const response = await execute(finalizedRootsByDomainQuery);

    const _roots: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _root = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _roots.push(_root);
    }

    const finalizedRoots: OptimisticRootFinalized[] = _roots
      .flat()
      .filter((x: any) => !!x)
      .map(parser.finalizedRoot);

    return finalizedRoots;
  }

  /**
   * Gets all the propagated optimistic aggregate roots
   */
  public async getPropagatedOptimisticRootsByDomain(
    params: { hub: string; timestamp: number; limit: number }[],
  ): Promise<OptimisticRootPropagated[]> {
    const { parser, execute } = getHelpers();
    const propagatedRootsByDomainQuery = getPropagatedOptimisticRootsByDomainQuery(params);
    const response = await execute(propagatedRootsByDomainQuery);

    const _roots: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _root = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _roots.push(_root);
    }

    const propagatedRoots: OptimisticRootPropagated[] = _roots
      .flat()
      .filter((x: any) => !!x)
      .map(parser.propagatedOptimisticRoot);

    return propagatedRoots;
  }

  /**
   * Gets all the propagated rootsstarting with index for a given domain
   */
  public async getGetPropagatedRoots(domain: string, count: number, limit: number): Promise<PropagatedRoot[]> {
    const { parser, execute } = getHelpers();

    const propagatedRootsQuery = getPropagatedRootsQuery(domain, count, limit);
    const response = await execute(propagatedRootsQuery);
    const _roots: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _root = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _roots.push(_root);
    }

    const propagatedRoots: PropagatedRoot[] = _roots
      .flat()
      .filter((x: any) => !!x)
      .map(parser.propagatedRoot);

    return propagatedRoots;
  }

  public async getConnectorMeta(domains: string[]): Promise<ConnectorMeta[]> {
    const { parser, execute } = getHelpers();
    const connectorMetaQuery = getConnectorMetaQuery(domains);
    const response = await execute(connectorMetaQuery);
    const _metas: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _message = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _metas.push(_message);
    }

    const connectorMetas: ConnectorMeta[] = _metas
      .flat()
      .filter((x: any) => !!x)
      .map(parser.connectorMeta);

    return connectorMetas;
  }

  public async getRootManagerMeta(hub: string): Promise<RootManagerMeta> {
    const { parser, execute } = getHelpers();
    const rootManagerMetaQuery = getRootManagerMetaQuery(hub);

    const response = await execute(rootManagerMetaQuery);
    const values = [...response.values()];
    return parser.rootManagerMeta(values[0][0]);
  }

  public async getRootManagerMode(hub: string): Promise<RootManagerMode> {
    const { parser, execute } = getHelpers();
    const rootManagerModeQuery = getRootManagerModeQuery(hub);

    const response = await execute(rootManagerModeQuery);
    const values = [...response.values()];
    // Initial state of the root manager is slow mode
    return values[0][0]
      ? parser.rootManagerMode(values[0][0])
      : { id: "ROOT_MANAGER_MODE_ID", mode: "OPTIMISTIC_MODE" };
  }

  public async getSpokeConnectorMode(domain: string): Promise<SpokeConnectorMode> {
    const { parser, execute } = getHelpers();
    const spokeConnectorModeQuery = getSpokeConnectorModeQuery(domain);

    const response = await execute(spokeConnectorModeQuery);
    const values = [...response.values()];
    // Initial state of the root manager is slow mode
    return values[0][0]
      ? parser.spokeConnectorMode(values[0][0])
      : { id: "CONNECTOR_MODE_ID", mode: "OPTIMISTIC_MODE" };
  }

  /**
   * Gets all the received roots starting with blocknumber for a given domain
   * @param params - The fetch params
   * @returns - The array of `ReceivedAggregateRoot`
   */
  public async getReceivedAggregatedRootsByDomain(
    params: { domain: string; offset: number; limit: number }[],
  ): Promise<ReceivedAggregateRoot[]> {
    const { parser, execute } = getHelpers();

    const receivedRootQuery = getReceivedAggregatedRootsByDomainQuery(params);
    const response = await execute(receivedRootQuery);
    const _messages: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const flatten = value?.flat();
      const _message = flatten?.map((x) => {
        return { ...x, domain: key };
      });
      _messages.push(_message);
    }

    const receivedRoots: ReceivedAggregateRoot[] = _messages
      .flat()
      .filter((x: any) => !!x)
      .map(parser.receivedAggregateRoot);

    return receivedRoots;
  }

  /**
   * Gets all stable swap pools for a given domain
   * @param domain - The domain
   * @returns - The array of `StableSwapPool`
   */
  public async getStableSwapPools(domain: string): Promise<StableSwapPool[]> {
    const { execute, parser } = getHelpers();
    const poolXQuery = getStableSwapPoolsQuery(domain);
    const response = await execute(poolXQuery);

    const _pools: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);

      const flatten = value?.flat();
      _pools.push(
        flatten?.map((x) => {
          return { ...x, domain: key };
        }),
      );
    }
    const pools: StableSwapPool[] = _pools
      .flat()
      .filter((x: any) => !!x)
      .map(parser.stableSwapPool);
    return pools;
  }

  public async getStableSwapExchangeByDomainAndNonce(
    agents: Map<string, SubgraphQueryMetaParams>,
  ): Promise<StableSwapExchange[]> {
    const { execute, parser } = getHelpers();
    const exchangeQuery = getSwapExchangesQuery(agents);
    const response = await execute(exchangeQuery);

    const exchanges: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const _exchanges = value?.flat();
      exchanges.push(
        _exchanges?.map((x) => {
          return { ...x, domain: key };
        }),
      );
    }

    const domainExchanges: StableSwapExchange[] = exchanges
      .flat()
      .filter((x: any) => !!x)
      .map(parser.stableSwapExchange);

    return domainExchanges;
  }

  public async getStableSwapPoolEventsByDomainAndNonce(
    agents: Map<string, SubgraphQueryMetaParams>,
    addOrRemove: "add" | "remove" = "add",
  ): Promise<StableSwapPoolEvent[]> {
    const { execute, parser } = getHelpers();
    const exchangeQuery = getPoolEventsQuery(agents, addOrRemove);
    const response = await execute(exchangeQuery);

    const events: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const _events = value?.flat();
      events.push(
        _events?.map((x) => {
          return { ...x, domain: key };
        }),
      );
    }

    const domainEvents: StableSwapPoolEvent[] = events
      .flat()
      .filter((x: any) => !!x)
      .map(parser.stableSwapPoolEvent);

    return domainEvents;
  }

  public async getStableSwapLpTransferEventsByDomainAndNonce(
    agents: Map<string, SubgraphQueryMetaParams>,
  ): Promise<StableSwapTransfer[]> {
    const { execute, parser } = getHelpers();
    const transfersQuery = getLpTransfersQuery(agents);
    const response = await execute(transfersQuery);

    const events: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const _events = value?.flat();
      events.push(
        _events?.map((x) => {
          return { ...x, domain: key };
        }),
      );
    }

    const domainEvents: StableSwapTransfer[] = events
      .flat()
      .filter((x: any) => !!x)
      .map(parser.stableSwapLpTransfer);

    return domainEvents;
  }

  public async getRelayerFeesIncreasesByDomainAndTimestamp(
    agents: Map<string, SubgraphQueryByTimestampMetaParams>,
  ): Promise<RelayerFeesIncrease[]> {
    const { execute, parser } = getHelpers();
    const increasesQuery = getRelayerFeesIncreasesQuery(agents);
    const response = await execute(increasesQuery);

    const increases: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const _increases = value?.flat();
      increases.push(
        _increases?.map((x) => {
          return { ...x, domain: key };
        }),
      );
    }

    const relayerFeeIncreases: RelayerFeesIncrease[] = increases
      .flat()
      .filter((x: any) => !!x)
      .map(parser.relayerFeesIncrease);

    return relayerFeeIncreases;
  }

  public async getSlippageUpdatesByDomainAndTimestamp(
    agents: Map<string, SubgraphQueryByTimestampMetaParams>,
  ): Promise<SlippageUpdate[]> {
    const { execute, parser } = getHelpers();
    const updatesQuery = getSlippageUpdatesQuery(agents);
    const response = await execute(updatesQuery);

    const updates: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const _updates = value?.flat();
      updates.push(
        _updates?.map((x) => {
          return { ...x, domain: key };
        }),
      );
    }

    const slippageUpdates: SlippageUpdate[] = updates
      .flat()
      .filter((x: any) => !!x)
      .map(parser.slippageUpdate);

    return slippageUpdates;
  }

  public async getRouterDailyTVLByDomainAndTimestamp(
    agents: Map<string, SubgraphQueryByTimestampMetaParams>,
  ): Promise<RouterDailyTVL[]> {
    const { execute, parser } = getHelpers();
    const tvlsQuery = getRouterDailyTVLQuery(agents);
    const response = await execute(tvlsQuery);

    const tvls: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      const _tvls = value?.flat();
      tvls.push(
        _tvls?.map((x) => {
          return { ...x, domain: key };
        }),
      );
    }

    const routerTVLs: RouterDailyTVL[] = tvls
      .flat()
      .filter((x: any) => !!x)
      .map(parser.routerDailyTvl);

    return routerTVLs;
  }
}
