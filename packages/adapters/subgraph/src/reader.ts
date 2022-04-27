import { BigNumber } from "ethers";
import { XTransfer, SubgraphQueryMetaParams, XTransferStatus, ChainData, Asset } from "@connext/nxtp-utils";

import { getHelpers } from "./lib/helpers";
import {
  getAssetBalanceQuery,
  getAssetBalancesQuery,
  getAssetByCanonicalIdQuery,
  getAssetByLocalQuery,
  getExecutedTransfersByIdsQuery,
  getReconciledTransfersByIdsQuery,
  getRouterQuery,
  getTransferQuery,
  getTransfersStatusQuery,
  getXCalledTransfersQuery,
} from "./lib/operations";
import { SubgraphReaderConfig } from "./lib/entities";
import { DomainInvalid } from "./lib/errors";

let context: { config: SubgraphReaderConfig };
export const getContext = () => context;

export class SubgraphReader {
  private static instance: SubgraphReader | undefined;

  private constructor(config: SubgraphReaderConfig) {
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

    const query = getAssetBalanceQuery(prefix, router, local);
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

    const query = getAssetBalancesQuery(prefix, router);
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

    const query = getRouterQuery(prefix, _router);
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

    const query = getAssetByLocalQuery(prefix, local);
    const response = await execute(query);
    const assets = [...response.values()][0][0];
    if (assets.length === 0) {
      return undefined;
    }
    return assets[0] as Asset;
  }

  /**
   * Gets the asset by the canoncialId on the specific domain
   * @param domain - The domain you're going to get the asset on
   * @param canonicalId - The canoncialId defined by Nomad
   */
  public async getAssetByCanonicalId(domain: string, canonicalId: string): Promise<Asset | undefined> {
    const { execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain) as string;
    if (!prefix) throw new DomainInvalid({ domain });

    const query = getAssetByCanonicalIdQuery(prefix, canonicalId);
    const response = await execute(query);
    console.log({ response });
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
  public async getTransfer(domain: string, transferId: string): Promise<XTransfer | undefined> {
    const { parser, execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain);
    if (!prefix) throw new DomainInvalid({ domain });

    const query = getTransferQuery(prefix, transferId);
    const response = await execute(query);
    const transfers = [...response.values()][0][0];
    return transfers.length === 1 ? parser.xtransfer(transfers[0]) : undefined;
  }

  public async getXCalls(agents: Map<string, SubgraphQueryMetaParams>): Promise<XTransfer[]> {
    const { execute, parser } = getHelpers();
    const query = getXCalledTransfersQuery(agents);

    const xcalledTransfers = await execute(query);

    // first get prepared transactions on all chains
    const allPrepared: XTransfer[] = xcalledTransfers
      .flat()
      .filter((x: any) => !!x)
      .map(parser.xtransfer);
    return allPrepared;
  }

  public async getTransactionsWithStatuses(
    agents: Map<string, SubgraphQueryMetaParams>,
    status: XTransferStatus,
  ): Promise<XTransfer[]> {
    const { execute, parser } = getHelpers();
    const xcalledXQuery = getXCalledTransfersQuery(agents);
    const xcalledTransfers = await execute(xcalledXQuery);
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();

    // first get prepared transactions on all chains
    const allOrigin: [string, XTransfer][] = xcalledTransfers
      .flat()
      .filter((x: any) => !!x)
      .map((s: any) => {
        const tx = parser.xtransfer(s);

        // set into a map by destination domain
        const destinationDomainRecord = txIdsByDestinationDomain.get(tx.destinationDomain);
        const txIds = destinationDomainRecord
          ? destinationDomainRecord.includes(tx.transferId)
            ? destinationDomainRecord
            : destinationDomainRecord.concat(tx.transferId)
          : [tx.transferId];
        txIdsByDestinationDomain.set(tx.destinationDomain, txIds);
        return [tx.transferId, tx];
      });

    const allTxById = new Map<string, XTransfer>(allOrigin);

    const executedXQuery = getExecutedTransfersByIdsQuery(txIdsByDestinationDomain, agents);
    const executedTransfers = await execute(executedXQuery);

    executedTransfers.forEach((_tx: any) => {
      const tx = parser.xtransfer(_tx);
      const inMap = allTxById.get(tx.transferId)!;
      inMap.status = tx.status;
      allTxById.set(tx.transferId, inMap);
    });

    const reconciledXQuery = getReconciledTransfersByIdsQuery(txIdsByDestinationDomain, agents);
    const reconciledTransfers = await execute(reconciledXQuery);

    reconciledTransfers.forEach((_tx: any) => {
      const tx = parser.xtransfer(_tx);
      const inMap = allTxById.get(tx.transferId)!;
      inMap.status = tx.status;
      allTxById.set(tx.transferId, inMap);
    });

    // create array of all transactions by status
    return [...allTxById.values()].filter((xTransfer) => xTransfer.status === status);
  }

  public async getExecutedAndReconciledTransfers(transfers: XTransfer[]): Promise<XTransfer[]> {
    const { parser, execute } = getHelpers();
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();
    const allOrigin: [string, XTransfer][] = transfers.map((transfer) => {
      const destinationDomainRecord = txIdsByDestinationDomain.get(transfer.destinationDomain);
      const txIds = destinationDomainRecord
        ? destinationDomainRecord.includes(transfer.transferId)
          ? destinationDomainRecord
          : destinationDomainRecord.concat(transfer.transferId)
        : [transfer.transferId];
      txIdsByDestinationDomain.set(transfer.destinationDomain, txIds);
      return [transfer.transferId, transfer];
    });

    const allTxById = new Map<string, XTransfer>(allOrigin);
    const transfersStatusXQuery = getTransfersStatusQuery(txIdsByDestinationDomain);
    const executedAndReconciledTransfers = await execute(transfersStatusXQuery);
    executedAndReconciledTransfers.forEach((_tx: any) => {
      const tx = parser.xtransfer(_tx);
      const inMap = allTxById.get(tx.transferId)!;
      inMap.status = tx.status;
      inMap.execute = tx.execute;
      inMap.reconcile = tx.reconcile;
      allTxById.set(tx.transferId, inMap);
    });

    return [...allTxById.values()].filter((xTransfer) => xTransfer.status !== XTransferStatus.XCalled);
  }
}
