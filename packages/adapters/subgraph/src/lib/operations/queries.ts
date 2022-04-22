import { gql } from "graphql-request";
import { SubgraphQueryMetaParams } from "@connext/nxtp-utils";

export const getAssetBalanceQuery = (prefix: string, router: string, local: string): string => {
  return gql`
    query GetAssetBalance {
      ${prefix}_assetBalance(id: ${local}-${router}) {
        amount
        asset {
          canonicalId
          canonicalDomain
          local
          adoptedAsset
          blockNumber
        }
      }
    }
  `;
};

export const getAssetBalancesQuery = (prefix: string, router: string): string => {
  return gql`
      query GetAssetBalance {
        ${prefix}_assetBalances(where: { router: ${router} }) {
            amount
            asset {
                canonicalId
                canonicalDomain
                local
                adoptedAsset
                blockNumber
            }
        }
      }
    `;
};

export const getRouterQuery = (prefix: string, router: string): string => {
  return gql`
    query GetRouter {
      ${prefix}_router(id: ${router}) {
        id
      }
    }
  `;
};

export const getAssetByLocalQuery = (prefix: string, local: string): string => {
  return gql`
    query GetAssetByLocal {
      ${prefix}_assets(where: { local: ${local} }) {
        id
        local
        adoptedAsset
        canonicalId
        canonicalDomain
        blockNumber
      }
    }
  `;
};

export const getAssetByCanonicalIdQuery = (prefix: string, canonicalId: string): string => {
  const str = `
    ${prefix}_assets(where: { canonicalId: ${canonicalId} }, orderBy: blockNumber, orderDirection: desc) {
            id
            local
            adoptedAsset
            canonicalId
            canonicalDomain
            blockNumber
        }
    `;

  return gql`
    query GetAssetByCanonicalId {
        ${str}
    }
  `;
};

const getXCalledTransferQueryString = (
  prefix: string,
  destinationDomains: string[],
  maxBlockNumber: string,
  nonce: string,
): string => {
  return `
    ${prefix}_transfers(
            where: {
            status: XCalled
            destinationDomain_in: ${destinationDomains}
            xcalledBlockNumber_lte: ${maxBlockNumber}
            nonce_gte: ${nonce}
            }
            orderBy: xcalledBlockNumber
            orderDirection: desc
        ) {
            id
            # Meta
            originDomain
            destinationDomain
            chainId
            status
            # Transfer Data
            to
            transferId
            callTo
            callData
            idx
            nonce
            router {
            id
            }
            # XCalled
            xcalledCaller
            xcalledTransactingAmount
            xcalledLocalAmount
            xcalledTransactingAsset
            xcalledLocalAsset
            # XCalled Transaction
            xcalledTransactionHash
            xcalledTimestamp
            xcalledGasPrice
            xcalledGasLimit
            xcalledBlockNumber
            # Executed
            executedCaller
            executedTransactingAmount
            executedLocalAmount
            executedTransactingAsset
            executedLocalAsset
            # Executed Transaction
            executedTransactionHash
            executedTimestamp
            executedGasPrice
            executedGasLimit
            executedBlockNumber
            # Reconciled
            reconciledCaller
            reconciledLocalAsset
            reconciledLocalAmount
            # Reconciled Transaction
            reconciledTransactionHash
            reconciledTimestamp
            reconciledGasPrice
            reconciledGasLimit
            reconciledBlockNumber
        }
      `;
};
export const getXCalledTransfersQuery = async (agents: Map<string, SubgraphQueryMetaParams>): string => {};
