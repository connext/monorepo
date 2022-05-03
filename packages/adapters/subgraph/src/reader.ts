import { BigNumber } from "ethers";
import { XTransfer, SubgraphQueryMetaParams, ChainData, Asset } from "@connext/nxtp-utils";

import { getHelpers } from "./lib/helpers";
import {
  getAssetBalanceQuery,
  getAssetBalancesQuery,
  getAssetByCanonicalIdQuery,
  getAssetByLocalQuery,
  getDestinationTransfersByIdsQuery,
  getRouterQuery,
  getOriginTransfersByIdQuery,
  getOriginTransfersQueryByDomain,
  getOriginTransfersQuery,
} from "./lib/operations";
import { SubgraphMap } from "./lib/entities";
import { DomainInvalid } from "./lib/errors";

let context: { config: SubgraphMap };
export const getContext = () => context;

export class SubgraphReader {
  private static instance: SubgraphReader | undefined;

  private constructor(config: SubgraphMap) {
    context = { config };
  }

  public static async create(chainData: Map<string, ChainData>): Promise<SubgraphReader> {
    if (SubgraphReader.instance) {
      return SubgraphReader.instance;
    }
    const { create } = getHelpers();
    const config = await create(chainData);
    return new SubgraphReader(config);
  }

  /**
   * Make a direct GraphQL query to the subgraph of the given domain.
   *
   * @param domain - The domain you want to determine liquidity on.
   * @param query - The GraphQL query string you want to send.
   * @returns Query result (any).
   */
  public async query(query: string): Promise<any> {
    const { execute } = getHelpers();
    return await execute(query);
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
    const { execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain) as string;
    if (!prefix) throw new DomainInvalid({ domain });

    const query = getAssetBalanceQuery(prefix, router.toLowerCase(), local.toLowerCase());
    const response = await execute(query);
    return BigNumber.from([...response.values()][0][0].amount);
  }

  /**
   * Returns available liquidity for all of the routers' assets on target chain.
   *
   * @param domain - The domain you want to determine liquidity on
   * @param router - Router address
   * @returns An array of asset ids and amounts of liquidity
   */
  public async getAssetBalances(domain: string, router: string): Promise<Record<string, BigNumber>> {
    const { execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain) as string;
    if (!prefix) throw new DomainInvalid({ domain });

    const query = getAssetBalancesQuery(prefix, router.toLowerCase());
    const response = await execute(query);
    const assetBalances = [...response.values()][0][0];
    const balances: Record<string, BigNumber> = {};
    assetBalances.forEach((bal: any) => (balances[bal.asset.local as string] = BigNumber.from(bal.amount)));
    return balances;
  }

  /**
   * Returns the router's approval status
   *
   * @param domain - The domain to get the router status of
   * @param _router - The router address
   * @returns A boolean indicating the router is approved
   */
  public async isRouterApproved(domain: string, _router: string): Promise<boolean> {
    const { execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain) as string;
    if (!prefix) throw new DomainInvalid({ domain });

    const query = getRouterQuery(prefix, _router.toLowerCase());
    const response = await execute(query);
    const router = [...response.values()][0][0];
    return !!router?.id;
  }

  /**
   * Gets the asset by the local address on the specific domain
   * @param domain - The domain you're going to get the asset on
   * @param local - The local asset address
   */
  public async getAssetByLocal(domain: string, local: string): Promise<Asset | undefined> {
    const { execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain) as string;
    if (!prefix) throw new DomainInvalid({ domain });

    const query = getAssetByLocalQuery(prefix, local.toLowerCase());
    const response = await execute(query);
    const assets = [...response.values()][0][0];
    if (assets.length === 0) {
      return undefined;
    }
    return assets[0] as Asset;
  }

  /**
   * Gets the asset by the canonicalId on the specific domain
   * @param domain - The domain you're going to get the asset on
   * @param canonicalId - The canonicalId defined by Nomad
   */
  public async getAssetByCanonicalId(domain: string, canonicalId: string): Promise<Asset | undefined> {
    const { execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain) as string;
    if (!prefix) throw new DomainInvalid({ domain });

    const query = getAssetByCanonicalIdQuery(prefix, canonicalId.toLowerCase());
    const response = await execute(query);
    const assets = [...response.values()][0][0];
    if (assets.length === 0) {
      return undefined;
    }
    return assets[0] as Asset;
  }

  /**
   * Retrieve a target transfer belonging to a given domain by ID.
   *
   * @param domain - The domain you want to get transfers from.
   * @param transferId - The ID of the transfer you want to retrieve.
   * @returns Parsed XTransfer object if transfer exists, otherwise undefined.
   */
  public async getOriginTransfer(domain: string, transferId: string): Promise<XTransfer | undefined> {
    const { parser, execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain);
    if (!prefix) throw new DomainInvalid({ domain });

    const query = getOriginTransfersByIdQuery(prefix, [`"${transferId}"`]);
    const response = await execute(query);
    const transfers = [...response.values()][0][0];
    return transfers.length === 1 ? parser.originTransfer(transfers[0]) : undefined;
  }

  /**
   * Get all transfers on a domain from a specified nonce that are routing to one of the given destination domains.
   *
   * @param domain - The domain you want to get transfers from.
   * @param fromNonce - The nonce to start from (inclusive).
   * @param destinationDomains - The domains which the retrieved transfers must be going to.
   * @returns an array of XTransfers.
   */
  public async getOriginTransfers(
    domain: string,
    fromNonce: number,
    destinationDomains: string[] = [...Object.keys(context.config.sources)],
  ): Promise<XTransfer[]> {
    const { parser, execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain);
    if (!prefix) throw new DomainInvalid({ domain });
    const query = getOriginTransfersQueryByDomain(prefix, domain, fromNonce, destinationDomains);
    const response = await execute(query);
    const transfers = [...response.values()][0][0];
    return transfers.map(parser.originTransfer);
  }

  /**
   * Gets the xcalled transactions across all the chains.
   * @param agents - The reference parameters.
   * @returns an array of XTransfers.
   */
  public async getXCalls(agents: Map<string, SubgraphQueryMetaParams>): Promise<XTransfer[]> {
    const { execute, parser } = getHelpers();
    const xcalledXQuery = getOriginTransfersQuery(agents);
    let response = await execute(xcalledXQuery);
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();
    const allTxById: Map<string, XTransfer> = new Map();
    for (const domain of response.keys()) {
      const value = response.get(domain);
      const xtransfersByDomain = value![0];
      for (const xtransfer of xtransfersByDomain) {
        allTxById.set(xtransfer.transferId as string, parser.originTransfer(xtransfer));
        if (txIdsByDestinationDomain.has(xtransfer.destinationDomain as string)) {
          txIdsByDestinationDomain
            .get(xtransfer.destinationDomain as string)!
            .push(`"${xtransfer.transferId as string}"`);
        } else {
          txIdsByDestinationDomain.set(xtransfer.destinationDomain as string, [`"${xtransfer.transferId as string}"`]);
        }
      }
    }

    const destinationTransfersQuery = getDestinationTransfersByIdsQuery(txIdsByDestinationDomain);
    response = await execute(destinationTransfersQuery);
    const transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      transfers.push(value!.flat());
    }

    const destinationTransfers: XTransfer[] = transfers
      .flat()
      .filter((x: any) => !!x)
      .map(parser.destinationTransfer);

    destinationTransfers.forEach((tx) => {
      allTxById.delete(tx.transferId);
    });

    // create array of all transactions by status
    return [...allTxById.values()];
  }

  /**
   * Gets all the destination transfers across all the chains
   * @param transfers - The xtransfers you're going to get the status for
   * @returns Executed/Reconciled xtransfers
   */
  public async getDestinationTransfers(transfers: XTransfer[]): Promise<XTransfer[]> {
    const { parser, execute } = getHelpers();
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();
    const allOrigin: [string, XTransfer][] = transfers.map((transfer) => {
      const destinationDomainRecord = txIdsByDestinationDomain.get(transfer.destination.domain);
      const txIds = destinationDomainRecord
        ? destinationDomainRecord.includes(transfer.transferId)
          ? destinationDomainRecord
          : destinationDomainRecord.concat(`"${transfer.transferId}"`)
        : [`"${transfer.transferId}"`];
      txIdsByDestinationDomain.set(transfer.destination.domain, txIds);
      return [transfer.transferId, transfer];
    });

    const allTxById = new Map<string, XTransfer>(allOrigin);

    const destinationTransfersQuery = getDestinationTransfersByIdsQuery(txIdsByDestinationDomain);
    const response = await execute(destinationTransfersQuery);
    const _transfers: any[] = [];
    for (const key of response.keys()) {
      const value = response.get(key);
      _transfers.push(value!.flat());
    }

    const destinationTransfers: XTransfer[] = _transfers
      .flat()
      .filter((x: any) => !!x)
      .map(parser.destinationTransfer);

    destinationTransfers.forEach((tx) => {
      const inMap = allTxById.get(tx.transferId)!;
      inMap.destination.status = tx.destination.status;
      inMap.destination.execute = tx.destination.execute;
      inMap.destination.reconcile = tx.destination.reconcile;
      allTxById.set(tx.transferId, inMap);
    });

    return [...allTxById.values()].filter((xTransfer) => xTransfer.destination.status);
  }
}
