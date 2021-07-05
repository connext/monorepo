import { gql } from "graphql-request";

export const getSenderPrepareQuery = gql`
  query GetSenderPrepareTransactions($routerId: ID!, $sendingChainId: BigInt!) {
    router(id: $routerId) {
      transactions(where: { status: Prepared, sendingChainId: $sendingChainId, chainId: $sendingChainId }) {
        id
        status
        user {
          id
        }
        router {
          id
        }
        sendingAssetId
        receivingAssetId
        sendingChainFallback
        receivingAddress
        callDataHash
        transactionId
        sendingChainId
        receivingChainId
        amount
        expiry
        preparedBlockNumber
        encryptedCallData
        encodedBid
        bidSignature
        prepareCaller
      }
      assetBalances {
        id
        amount
      }
    }
  }
`;

export const getReceiverPrepareQuery = gql`
  query GetReceiverPrepareTransactions($routerId: ID!, $receivingChainId: BigInt!) {
    router(id: $routerId) {
      transactions(where: { status: Prepared, receivingChainId: $receivingChainId, chainId: $receivingChainId }) {
        id
        status
        user {
          id
        }
        router {
          id
        }
        sendingAssetId
        receivingAssetId
        sendingChainFallback
        receivingAddress
        callDataHash
        transactionId
        sendingChainId
        receivingChainId
        amount
        expiry
        preparedBlockNumber
        encryptedCallData
        encodedBid
        bidSignature
        prepareCaller
      }
      assetBalances {
        id
        amount
      }
    }
  }
`;

export const getReceiverFulfillQuery = gql`
  query GetReceiverFulfillTransactions($routerId: ID!, $receivingChainId: BigInt!) {
    router(id: $routerId) {
      transactions(where: { status: Fulfilled, receivingChainId: $receivingChainId, chainId: $receivingChainId }) {
        id
        status
        chainId
        user {
          id
        }
        router {
          id
        }
        sendingAssetId
        receivingAssetId
        sendingChainFallback
        receivingAddress
        callDataHash
        transactionId
        sendingChainId
        receivingChainId
        amount
        expiry
        preparedBlockNumber
        relayerFee
        signature
        fulfillCaller
      }
      assetBalances {
        id
        amount
      }
    }
  }
`;

export const getSenderFulfillQuery = gql`
  query GetSenderFulfillTransactions($routerId: ID!, $sendingChainId: BigInt!) {
    router(id: $routerId) {
      transactions(where: { status: Fulfilled, sendingChainId: $sendingChainId, chainId: $sendingChainId }) {
        id
        status
        chainId
        user {
          id
        }
        router {
          id
        }
        sendingAssetId
        receivingAssetId
        sendingChainFallback
        receivingAddress
        callDataHash
        transactionId
        sendingChainId
        receivingChainId
        amount
        expiry
        preparedBlockNumber
        relayerFee
        signature
        fulfillCaller
      }
      assetBalances {
        id
        amount
      }
    }
  }
`;

export const getTransactionByIdQuery = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(id: $transactionId) {
      id
      status
      chainId
      user {
        id
      }
      router {
        id
      }
      sendingAssetId
      receivingAssetId
      sendingChainFallback
      receivingAddress
      callDataHash
      transactionId
      sendingChainId
      receivingChainId
      amount
      expiry
      preparedBlockNumber
      encryptedCallData
      #
      encodedBid
      bidSignature
      relayerFee
      signature
      prepareCaller
      fulfillCaller
      cancelCaller
    }
  }
`;
