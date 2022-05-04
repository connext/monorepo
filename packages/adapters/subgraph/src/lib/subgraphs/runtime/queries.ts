import { gql } from "graphql-request";

// Contains all subgraph queries used by router

export const getOriginTransfers = gql`
  query GetOriginTransfers(
    $originDomain: BigInt!
    $destinationDomains: [BigInt!]
    $nonce: BigInt!
    $maxBlockNumber: BigInt
  ) {
    originTransfers(
      where: {
        destinationDomain_in: $destinationDomains
        nonce_gte: $nonce
        originDomain: $originDomain
        blockNumber_lte: $maxBlockNumber
      }
      orderBy: blockNumber
      orderDirection: desc
    ) {
      id

      # Meta Data
      chainId
      transferId
      nonce
      to
      callData
      originDomain
      destinationDomain

      # Asset Data
      transactingAsset
      transactingAmount
      bridgedAsset
      bridgedAmount

      # Event Data
      relayerFee
      message

      # XCalled Transaction
      caller
      transactionHash
      timestamp
      gasPrice
      gasLimit
      blockNumber
    }
  }
`;

export const getOriginTransfersByIds = gql`
  query GetOriginTransfersByIds($transferIds: [Bytes!]) {
    originTransfers(where: { transferId_in: $transferIds }) {
      id

      # Meta Data
      chainId
      transferId
      nonce
      to
      callData
      originDomain
      destinationDomain

      # Asset Data
      transactingAsset
      transactingAmount
      bridgedAsset
      bridgedAmount

      # Event Data
      relayerFee
      message

      # XCalled Transaction
      caller
      transactionHash
      timestamp
      gasPrice
      gasLimit
      blockNumber
    }
  }
`;

export const getDestinationTransfers = gql`
  query GetDestinationTransfers(
    $originDomain: BigInt!
    $destinationDomains: [BigInt!]
    $nonce: BigInt!
    $status: TransferStatus
  ) {
    destinationTransfers(
      where: {
        destinationDomain_in: $destinationDomains
        nonce_gte: $nonce
        originDomain: $originDomain
        status: $status
      }
      orderBy: nonce
      orderDirection: desc
    ) {
      id

      # Meta Data
      chainId
      transferId
      nonce
      to
      callData
      originDomain
      destinationDomain

      # Asset Data
      localAsset
      localAmount
      transactingAsset
      transactingAmount

      # Executed event Data
      status
      routers {
        id
      }
      originSender

      # Executed Transaction
      executedCaller
      executedTransactionHash
      executedTimestamp
      executedGasPrice
      executedGasLimit
      executedBlockNumber

      # Reconciled Transaction
      reconciledCaller
      reconciledTransactionHash
      reconciledTimestamp
      reconciledGasPrice
      reconciledGasLimit
      reconciledBlockNumber
    }
  }
`;

export const getDestinationTransfersByIds = gql`
  query GetDestinationTransfersByIds($transferIds: [Bytes!]) {
    destinationTransfers(where: { transferId_in: $transferIds }) {
      id

      # Meta Data
      chainId
      transferId
      nonce
      to
      callData
      originDomain
      destinationDomain

      # Asset Data
      localAsset
      localAmount
      transactingAsset
      transactingAmount

      # Executed event Data
      status
      routers {
        id
      }
      originSender

      # Executed Transaction
      executedCaller
      executedTransactionHash
      executedTimestamp
      executedGasPrice
      executedGasLimit
      executedBlockNumber

      # Reconciled Transaction
      reconciledCaller
      reconciledTransactionHash
      reconciledTimestamp
      reconciledGasPrice
      reconciledGasLimit
      reconciledBlockNumber
    }
  }
`;

export const getAssetByLocal = gql`
  query GetAssetByLocal($local: Bytes!) {
    assets(where: { local: $local }) {
      id
      local
      adoptedAsset
      canonicalId
      canonicalDomain
      blockNumber
    }
  }
`;

export const getAssetByCanonicalId = gql`
  query GetAssetByCanonicalId($canonicalId: Bytes!) {
    assets(where: { canonicalId: $canonicalId }, orderBy: blockNumber, orderDirection: desc) {
      id
      local
      adoptedAsset
      canonicalId
      canonicalDomain
      blockNumber
    }
  }
`;

export const getAssetBalance = gql`
  query GetAssetBalance($assetBalanceId: ID!) {
    assetBalance(id: $assetBalanceId) {
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

export const getAssetBalances = gql`
  query GetAssetBalances($router: String!) {
    assetBalances(where: { router: $router }) {
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

export const getRouter = gql`
  query GetRouter($router: ID!) {
    router(id: $router) {
      id
    }
  }
`;
