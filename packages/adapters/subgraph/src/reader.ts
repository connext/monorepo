import { BigNumber, constants } from "ethers";
import { XTransfer, SubgraphQueryMetaParams } from "@connext/nxtp-utils";

import { SubgraphReaderConfig, SubgraphMap } from "./lib/entities";
import { getHelpers } from "./lib/helpers";
import {
  GetAssetByLocalQuery,
  GetOriginTransfersQuery,
  GetOriginTransfersByIdsQuery,
  GetOriginTransfersQueryVariables,
  GetDestinationTransfersByIdsQuery,
  Asset,
  GetAssetBalanceQuery,
  GetAssetBalancesQuery,
  GetRouterQuery,
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

  /**
   * Make a direct GraphQL query to the subgraph of the given domain.
   *
   * @param domain - The domain you want to determine liquidity on.
   * @param query - The GraphQL query string you want to send.
   * @returns Query result (any).
   */
  public async query(domain: string, query: string): Promise<any> {
    const subgraph = this.subgraphs.get(domain);
    return await subgraph!.runtime.query(query);
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

  /**
   * Retrieve a target transfer belonging to a given domain by ID.
   *
   * @param domain - The domain you want to get transfers from.
   * @param transferId - The ID of the transfer you want to retrieve.
   * @returns Parsed XTransfer object if transfer exists, otherwise undefined.
   */
  public async getOriginTransfer(domain: string, transferId: string): Promise<XTransfer | undefined> {
    const { parser } = getHelpers();
    const { originTransfers } = await this.subgraphs
      .get(domain)!
      .runtime.request<GetOriginTransfersByIdsQuery>((client) => {
        return client.GetOriginTransfersByIds({ transferIds: [transferId] });
      });
    return originTransfers.length === 1 ? parser.originTransfer(originTransfers[0]) : undefined;
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
    destinationDomains: string[] = [...this.subgraphs.keys()],
  ): Promise<XTransfer[]> {
    const { parser } = getHelpers();
    const { originTransfers } = await this.subgraphs.get(domain)!.runtime.request<GetOriginTransfersQuery>((client) => {
      return client.GetOriginTransfers({ destinationDomains, nonce: fromNonce, originDomain: domain });
    });
    return originTransfers.map(parser.originTransfer);
  }

  public async getXCalls(agents: Map<string, SubgraphQueryMetaParams>): Promise<XTransfer[]> {
    const destinationDomains = [...this.subgraphs.keys()];
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();
    const { parser } = getHelpers();

    // First, get Origin Transfers on all chains.
    const allOrigin: [string, XTransfer][] = (
      await Promise.all(
        [...this.subgraphs].map(async ([domain, subgraph]) => {
          const { originTransfers } = await subgraph.runtime.request<GetOriginTransfersQuery>(
            (client: { GetOriginTransfers: (arg0: GetOriginTransfersQueryVariables) => any }) => {
              const {
                latestNonce: nonce,
                maxBlockNumber,
                destinationDomains: _destinationDomains,
              } = agents.get(domain)!;

              return client.GetOriginTransfers({
                destinationDomains: _destinationDomains ?? destinationDomains,
                nonce,
                originDomain: domain,
                maxBlockNumber: maxBlockNumber.toString(),
              });
            },
          );
          return originTransfers;
        }),
      )
    )
      .flat()
      .filter((x) => !!x)
      .map((s) => {
        const tx: XTransfer = parser.originTransfer(s);

        // set into a map by destination domain
        const destinationDomainRecord = txIdsByDestinationDomain.get(tx.destination.domain);
        const txIds = destinationDomainRecord
          ? destinationDomainRecord.includes(tx.transferId)
            ? destinationDomainRecord
            : destinationDomainRecord.concat(tx.transferId)
          : [tx.transferId];
        txIdsByDestinationDomain.set(tx.destination.domain, txIds);
        return [tx.transferId, tx];
      });

    const allTxById = new Map<string, XTransfer>(allOrigin);

    // use prepared IDs to get all receiving txs
    await Promise.all(
      [...txIdsByDestinationDomain.entries()].map(async ([destinationDomain, transferIds]) => {
        const subgraph = this.subgraphs.get(destinationDomain)!; // should exist bc of initial filter

        const { destinationTransfers } = await subgraph.runtime.request<GetDestinationTransfersByIdsQuery>(
          (client: { GetDestinationTransfersByIds: (arg0: { transferIds: string[] }) => any }) =>
            client.GetDestinationTransfersByIds({
              transferIds,
              // TODO:
              // maxExecutedBlockNumber: ,
              // maxReconciledBlockNumber:,
              // status: ,
            }),
        );
        destinationTransfers.forEach((_tx: any) => {
          const tx = parser.destinationTransfer(_tx);
          allTxById.delete(tx.transferId);
        });
      }),
    );

    // create array of all transactions by status
    return [...allTxById.values()];
  }

  public async getDestinationTransfers(transfers: XTransfer[]): Promise<XTransfer[]> {
    const { parser } = getHelpers();
    const txIdsByDestinationDomain: Map<string, string[]> = new Map();
    const allOrigin: [string, XTransfer][] = transfers.map((transfer) => {
      const destinationDomainRecord = txIdsByDestinationDomain.get(transfer.destination.domain);
      const txIds = destinationDomainRecord
        ? destinationDomainRecord.includes(transfer.transferId)
          ? destinationDomainRecord
          : destinationDomainRecord.concat(transfer.transferId)
        : [transfer.transferId];
      txIdsByDestinationDomain.set(transfer.destination.domain, txIds);
      return [transfer.transferId, transfer];
    });

    const allTxById = new Map<string, XTransfer>(allOrigin);

    await Promise.all(
      [...txIdsByDestinationDomain.entries()].map(async ([destinationDomain, transferIds]) => {
        const subgraph = this.subgraphs.get(destinationDomain)!; // should exist bc of initial filter

        const { destinationTransfers } = await subgraph.runtime.request<GetDestinationTransfersByIdsQuery>((client) =>
          client.GetDestinationTransfersByIds({
            transferIds,
          }),
        );
        destinationTransfers.forEach((_tx: any) => {
          const tx = parser.destinationTransfer(_tx);
          const inMap = allTxById.get(tx.transferId)!;
          inMap.destination.status = tx.destination.status;
          inMap.destination.execute = tx.destination.execute;
          inMap.destination.reconcile = tx.destination.reconcile;
          allTxById.set(tx.transferId, inMap);
        });
      }),
    );

    // Return all transfers with no destination status.
    return [...allTxById.values()].filter((xTransfer) => !xTransfer.destination.status);
  }
}
