import { gql } from "graphql-request";

// Contains all subgraph queries used by router

export const getTransactions = gql`
  query GetPreparedTransactions(
    $status: TransactionStatus!
    $destinationDomains: [BigInt!]
    $prepareBlockNumber: BigInt!
    $nonce: BigInt!
  ) {
    transactions(
      where: {
        status: Prepared
        destinationDomain_in: $destinationDomains
        prepareBlockNumber_gte: $prepareBlockNumber
        nonce_gte: $nonce
      }
      orderBy: prepareBlockNumber
      orderDirection: desc
    ) {
      id
      # Meta
      originDomain
      destinationDomain
      chainId
      status

      # Transfer Data
      nonce
      transactionId
      recipient
      router {
        id
      }
      transactingAsset
      localAsset

      # Prepared
      prepareCaller
      prepareTransactingAmount
      prepareLocalAmount
      callTo
      callData

      # TransactionPrepared
      prepareTransactionHash
      prepareTimestamp
      prepareGasPrice
      prepareGasLimit
      prepareBlockNumber

      # Fulfill
      fulfillCaller
      fulfillTransactingAmount
      fulfillLocalAmount

      # TransactionFulfilled
      fulfillTransactionHash
      fulfillTimestamp
      fulfillGasPrice
      fulfillGasLimit
      fulfillBlockNumber

      # Reconciled
      externalCallHash
      reconciledTransactionHash
      reconciledTimestamp
      reconciledGasPrice
      reconciledGasLimit
      reconciledBlockNumber
    }
  }
`;
