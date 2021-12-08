import { gql } from "graphql-request";

export const getExpressiveAssetBalancesQuery = gql`
  query GetExpressiveAssetBalances($routerId: String!) {
    assetBalances(where: { router: $routerId }) {
      amount
      assetId
      locked
      supplied
      removed
    }
  }
`;

// export const getExpressiveAssetBalancesQuery = gql`
//   query GetExpressiveAssetBalances($routerId: String!) {
//     assetBalances(where: { router: $routerId }) {
//       amount
//       assetId
//       locked
//       supplied
//       removed
//       volume
//       volumeIn
//     }
//   }
// `;

export const getBlockNumber = gql`
  query GetBlockNumber {
    _meta {
      block {
        number
      }
    }
  }
`;
