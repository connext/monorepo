import { BigNumber } from "ethers";
import { XTransfer, SubgraphQueryMetaParams, XTransferStatus, ChainData } from "@connext/nxtp-utils";

import { getHelpers } from "./lib/helpers";
import {
  getAssetBalanceQuery,
  getAssetBalancesQuery,
  getAssetByCanonicalIdQuery,
  getAssetByLocalQuery,
  getRouterQuery,
} from "./lib/operations";
import { getMeshOptions } from "../.graphclient";

export class SubgraphReader {
  private static instance: SubgraphReader | undefined;
  private readonly chainData: Map<string, ChainData>;

  private constructor(chainData: Map<string, ChainData>) {
    this.chainData = chainData;
  }

  public static async create(chainData: Map<string, ChainData>): Promise<SubgraphReader> {
    if (SubgraphReader.instance) {
      return SubgraphReader.instance;
    }
    return new SubgraphReader(chainData);
  }

  /**
   *
   * Returns available liquidity for the given asset on the Connext on the provided chain.
   *
   * @param domain - The domain you want to determine liquidity on
   * @param router - Router address
   * @param local - The local asset you want to determine router liquidity of
   * @returns The available balance
   */
  public async getAssetBalance(domain: string, router: string, local: string): Promise<BigNumber> {
    const { execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain, this.chainData);
    const query = getAssetBalanceQuery(prefix, router, local);
    const response = await execute(query);
    return BigNumber.from(response.amount);
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
    const prefix = getPrefixByDomain(domain, this.chainData);
    const query = getAssetBalancesQuery(prefix, router);
    const { assetBalances } = await execute(query);
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
    const prefix = getPrefixByDomain(domain, this.chainData);
    const query = getRouterQuery(prefix, _router);
    const { router } = await execute(query);
    return !!router?.id;
  }

  public async getAssetByLocal(domain: string, local: string): Promise<any | undefined> {
    const { execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain, this.chainData);
    const query = getAssetByLocalQuery(prefix, local);
    const { assets } = await execute(query);
    if (assets.length === 0) {
      return undefined;
    }
    // convert to nice typescript type
    return assets[0];
  }

  public async getAssetByCanonicalId(domain: string, canonicalId: string): Promise<any | undefined> {
    const { execute, getPrefixByDomain } = getHelpers();
    const prefix = getPrefixByDomain(domain, this.chainData);
    const query = getAssetByCanonicalIdQuery(prefix, canonicalId);
    const { assets } = await execute(query);

    if (assets.length === 0) {
      return undefined;
    }
    // convert to nice typescript type
    return assets[0];
  }

  public async getXCalls(agents: Map<string, SubgraphQueryMetaParams>): Promise<XTransfer[]> {
    const destinationDomains = [...this.subgraphs.keys()];
    const { parser } = getHelpers();

    // first get prepared transactions on all chains
    const allPrepared: XTransfer[] = (
      await Promise.all(
        [...this.subgraphs].map(async ([domain, subgraph]) => {
          const { transfers } = await subgraph.runtime.request<GetXCalledTransfersQuery>((client) => {
            const nonce = agents.get(domain)!.latestNonce;

            return client.GetXCalledTransfers({
              destinationDomains,
              maxXCallBlockNumber: agents.get(domain)!.maxBlockNumber.toString(),
              nonce,
            });
          });
          return transfers;
        }),
      )
    )
      .flat()
      .filter((x) => !!x)
      .map(parser.xtransfer);
    return allPrepared;
  }

  public async getTransactionsWithStatuses(
    agents: Map<string, SubgraphQueryMetaParams>,
    status: XTransferStatus,
  ): Promise<XTransfer[]> {
    const destinationDomains = [...this.subgraphs.keys()];
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();
    const { parser } = getHelpers();

    // first get prepared transactions on all chains
    const allOrigin: [string, XTransfer][] = (
      await Promise.all(
        [...this.subgraphs].map(async ([domain, subgraph]) => {
          const { transfers } = await subgraph.runtime.request<GetXCalledTransfersQuery>(
            (client: {
              GetXCalledTransfers: (arg0: {
                destinationDomains: string[];
                maxXCallBlockNumber: any;
                nonce: any;
              }) => any;
            }) => {
              const nonce = agents.get(domain)!.latestNonce;

              return client.GetXCalledTransfers({
                destinationDomains,
                maxXCallBlockNumber: agents.get(domain)!.maxBlockNumber.toString(),
                nonce,
              }); // TODO: nonce + maxPrepareBlockNumber
            },
          );
          return transfers;
        }),
      )
    )
      .flat()
      .filter((x) => !!x)
      .map((s) => {
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

    // use prepared IDs to get all receiving txs
    await Promise.all(
      [...txIdsByDestinationDomain.entries()].map(async ([destinationDomain, transferIds]) => {
        const subgraph = this.subgraphs.get(destinationDomain)!; // should exist bc of initial filter

        const executed = await subgraph.runtime.request<GetExecutedTransfersByIdsQuery>(
          (client: {
            GetExecutedTransfersByIds: (arg0: { transferIds: string[]; maxExecutedBlockNumber: any }) => any;
          }) =>
            client.GetExecutedTransfersByIds({
              transferIds,
              maxExecutedBlockNumber: agents.get(destinationDomain)!.maxBlockNumber.toString(),
            }),
        );
        executed.transfers.forEach((_tx: any) => {
          const tx = parser.xtransfer(_tx);
          const inMap = allTxById.get(tx.transferId)!;
          inMap.status = tx.status;
          allTxById.set(tx.transferId, inMap);
        });

        const reconciled = await subgraph.runtime.request<GetReconciledTransfersByIdsQuery>(
          (client: {
            GetReconciledTransfersByIds: (arg0: { transferIds: string[]; maxReconciledBlockNumber: any }) => any;
          }) =>
            client.GetReconciledTransfersByIds({
              transferIds,
              maxReconciledBlockNumber: agents.get(destinationDomain)!.maxBlockNumber.toString(),
            }),
        );

        reconciled.transfers.forEach((_tx: any) => {
          const tx = parser.xtransfer(_tx);
          const inMap = allTxById.get(tx.transferId)!;
          inMap.status = tx.status;
          allTxById.set(tx.transferId, inMap);
        });
      }),
    );

    // create array of all transactions by status
    return [...allTxById.values()].filter((xTransfer) => xTransfer.status === status);
  }

  public async getExecutedAndReconciledTransfers(transfers: XTransfer[]): Promise<XTransfer[]> {
    const { parser } = getHelpers();
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

    await Promise.all(
      [...txIdsByDestinationDomain.entries()].map(async ([destinationDomain, transferIds]) => {
        const subgraph = this.subgraphs.get(destinationDomain)!; // should exist bc of initial filter

        const { transfers } = await subgraph.runtime.request<GetTransfersStatusQuery>((client) =>
          client.GetTransfersStatus({
            transferIds,
          }),
        );
        transfers.forEach((_tx: any) => {
          const tx = parser.xtransfer(_tx);
          const inMap = allTxById.get(tx.transferId)!;
          inMap.status = tx.status;
          inMap.execute = tx.execute;
          inMap.reconcile = tx.reconcile;
          allTxById.set(tx.transferId, inMap);
        });
      }),
    );

    return [...allTxById.values()].filter((xTransfer) => xTransfer.status !== XTransferStatus.XCalled);
  }
}
