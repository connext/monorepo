import { gql } from "graphql-request";

export const getExpressiveAssetBalancesQuery = gql`
  query GetExpressiveAssetBalances($routerId: String!) {
    assetBalances(where: { router: $routerId }) {
      amount
      assetId
      locked
      supplied
    }
  }
`;

export const getBlockNumber = gql`
  query GetBlockNumber {
    _meta {
      block {
        number
      }
    }
  }
`;
