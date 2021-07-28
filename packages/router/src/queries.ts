import { gql } from "graphql-request";

export const getSenderPrepareQuery = gql`
  query GetSenderPrepareTransactions($routerId: ID!, $sendingChainId: BigInt!) {
    router(id: $routerId) {
      transactions(
        where: { status: Prepared, sendingChainId: $sendingChainId, chainId: $sendingChainId }
        orderBy: preparedBlockNumber
        orderDirection: desc
      ) {
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
        callTo
        sendingChainId
        receivingChainId
        callDataHash
        transactionId
        transactionHash
        amount
        expiry
        preparedBlockNumber
        encryptedCallData
        encodedBid
        bidSignature
        prepareCaller
      }
    }
  }
`;

export const getReceiverPrepareQuery = gql`
  query GetReceiverPrepareTransactions($routerId: ID!, $receivingChainId: BigInt!) {
    router(id: $routerId) {
      transactions(
        where: { status: Prepared, receivingChainId: $receivingChainId, chainId: $receivingChainId }
        orderBy: preparedBlockNumber
        orderDirection: desc
      ) {
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
        callTo
        sendingChainId
        receivingChainId
        callDataHash
        transactionId
        transactionHash
        amount
        expiry
        preparedBlockNumber
        encryptedCallData
        encodedBid
        bidSignature
        prepareCaller
      }
    }
  }
`;

export const getReceiverFulfillQuery = gql`
  query GetReceiverFulfillTransactions($routerId: ID!, $receivingChainId: BigInt!) {
    router(id: $routerId) {
      transactions(
        where: { status: Fulfilled, receivingChainId: $receivingChainId, chainId: $receivingChainId }
        orderBy: preparedBlockNumber
        orderDirection: desc
      ) {
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
        callTo
        sendingChainId
        receivingChainId
        callDataHash
        transactionId
        amount
        expiry
        preparedBlockNumber
        relayerFee
        signature
        callData
        fulfillCaller
      }
    }
  }
`;

export const getSenderFulfillQuery = gql`
  query GetSenderFulfillTransactions($routerId: ID!, $sendingChainId: BigInt!) {
    router(id: $routerId) {
      transactions(
        where: { status: Fulfilled, sendingChainId: $sendingChainId, chainId: $sendingChainId }
        orderBy: preparedBlockNumber
        orderDirection: desc
      ) {
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
        callTo
        sendingChainId
        receivingChainId
        callDataHash
        transactionId
        amount
        expiry
        preparedBlockNumber
        relayerFee
        signature
        callData
        fulfillCaller
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
      callTo
      sendingChainId
      receivingChainId
      callDataHash
      transactionId
      transactionHash
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

export const getFulfilledTransactionsByIdsQuery = gql`
  query GetFulfilledTransactions($transactionIds: [Bytes!]) {
    transactions(where: { transactionId_in: $transactionIds, status: Fulfilled }) {
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
      callTo
      sendingChainId
      receivingChainId
      callDataHash
      transactionId
      transactionHash
      amount
      expiry
      preparedBlockNumber
      relayerFee
      signature
      callData
      fulfillCaller
    }
  }
`;

export const getAssetBalanceById = gql`
  query GetAssetBalance($assetBalanceId: ID!) {
    assetBalance(id: $assetBalanceId) {
      amount
    }
  }
`;
