import { BigNumber, constants } from "ethers";
import { XTransfer, SubgraphQueryMetaParams, XTransferStatus } from "@connext/nxtp-utils";

import { SubgraphReaderConfig, SubgraphMap } from "./lib/entities";
import { getHelpers } from "./lib/helpers";
import {
  GetAssetByLocalQuery,
  GetXCalledTransfersQuery,
  GetTransfersQuery,
  GetTransfersStatusQuery,
  Asset,
  GetExecutedTransfersByIdsQuery,
  GetReconciledTransfersByIdsQuery,
  GetAssetBalanceQuery,
  GetAssetBalancesQuery,
  GetRouterQuery,
  GetXCalledTransfersQueryVariables,
} from "./lib/subgraphs/runtime/graphqlsdk";

export class SubgraphReader {
  private static instance: SubgraphReader | undefined;
  private readonly subgraphs: SubgraphMap;

  private constructor(subgraphs: SubgraphMap) {
    this.subgraphs = subgraphs;
  }

  public static async create(config: SubgraphReaderConfig): Promise<SubgraphReader> {
    if (SubgraphReader.instance) {
      return SubgraphReader.instance;
    }
    const { create } = getHelpers();
    const subgraphs = await create(config);
    return new SubgraphReader(subgraphs);
  }

  // TODO: query
  public async query() {}

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
    const subgraph = this.subgraphs.get(domain);
    const { assetBalance } = await subgraph!.runtime.request<GetAssetBalanceQuery>((client) => {
      return client.GetAssetBalance({ assetBalanceId: `${local.toLowerCase()}-${router.toLowerCase()}` });
    });
    if (!assetBalance) {
      return constants.Zero;
    }
    return BigNumber.from(assetBalance.amount);
  }

  /**
   * Returns available liquidity for all of the routers' assets on target chain.
   *
   * @param domain - The domain you want to determine liquidity on
   * @param router - Router address
   * @returns An array of asset ids and amounts of liquidity
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getAssetBalances(domain: string, router: string): Promise<Record<string, BigNumber>> {
    const subgraph = this.subgraphs.get(domain);
    const { assetBalances } = await subgraph!.runtime.request<GetAssetBalancesQuery>((client) => {
      return client.GetAssetBalances({ router: router.toLowerCase() });
    });
    const balances: Record<string, BigNumber> = {};
    assetBalances.forEach((bal) => (balances[bal.asset.local as string] = BigNumber.from(bal.amount)));
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
    const subgraph = this.subgraphs.get(domain);
    const { router } = await subgraph!.runtime.request<GetRouterQuery>((client) => {
      return client.GetRouter({ router: _router });
    });
    return !!router?.id;
  }

  public async getAssetByLocal(domain: string, local: string): Promise<Asset | undefined> {
    const subgraph = this.subgraphs.get(domain);
    // handle doesnt exist
    const { assets } = await subgraph!.runtime.request<GetAssetByLocalQuery>((client) => {
      return client.GetAssetByLocal({ local });
    });
    if (assets.length === 0) {
      return undefined;
    }
    // convert to nice typescript type
    return assets[0];
  }

  public async getAssetByCanonicalId(chain: number, canonicalId: string): Promise<Asset | undefined> {
    const subgraph = this.subgraphs.get(chain.toString());
    // handle doesnt exist
    const { assets } = await subgraph!.runtime.request<GetAssetByLocalQuery>((client) => {
      return client.GetAssetByCanonicalId({ canonicalId });
    });
    if (assets.length === 0) {
      return undefined;
    }
    // convert to nice typescript type
    return assets[0];
  }

  // public async getTransaction(domain: string, transactionId: string): Promise<XTransfer> {}
  /**
   * Get all transfers on a domain from a specified nonce that are routing to one of the given destination domains.
   *
   * @param domain - The domain you want to get transfers from.
   * @param fromNonce - The nonce to start from (inclusive).
   * @param destinationDomains - The domains which the retrieved transfers must be going to.
   * @returns an array of XTransfers.
   */
  public async getTransfers(
    domain: string,
    fromNonce: number,
    destinationDomains: string[] = [...this.subgraphs.keys()],
  ): Promise<XTransfer[]> {
    const { parser } = getHelpers();
    const { transfers } = await this.subgraphs.get(domain)!.runtime.request<GetTransfersQuery>((client) => {
      return client.GetTransfers({ destinationDomains, nonce: fromNonce, originDomain: domain });
    });
    return transfers.map(parser.xtransfer);
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
              originDomain: domain,
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
            (client: { GetXCalledTransfers: (arg0: GetXCalledTransfersQueryVariables) => any }) => {
              const nonce = agents.get(domain)!.latestNonce;

              return client.GetXCalledTransfers({
                destinationDomains,
                maxXCallBlockNumber: agents.get(domain)!.maxBlockNumber.toString(),
                nonce,
                originDomain: domain,
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
