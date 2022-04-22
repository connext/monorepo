import { gql } from "graphql-request";

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
  return gql`
    query GetAssetByCanonicalId {
      ${prefix}_assets(where: { canonicalId: ${canonicalId} }, orderBy: blockNumber, orderDirection: desc) {
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
