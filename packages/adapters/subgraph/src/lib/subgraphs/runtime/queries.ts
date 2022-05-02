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

      # MetaData
      originDomain
      destinationDomain
      chainId

      # event Data
      transferId
      to
      nonce
      callData
      transactingAsset
      bridgedAsset
      amount
      bridgedAmount
      relayerFee
      caller
      message

      # XCalled Transaction
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

      # MetaData
      originDomain
      destinationDomain
      chainId

      # event Data
      transferId
      to
      nonce
      callData
      transactingAsset
      bridgedAsset
      amount
      bridgedAmount
      relayerFee
      caller
      message

      # XCalled Transaction
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

      # MetaData
      originDomain
      destinationDomain
      chainId
      status

      # Executed event Data
      transferId
      to
      nonce
      callData
      localAsset
      routers {
        id
      }
      transactingAsset
      transactingAmount
      originSender

      executedCaller
      executedAmount

      # Executed Transaction
      executedTransactionHash
      executedTimestamp
      executedGasPrice
      executedGasLimit
      executedBlockNumber

      # Reconciled event Data
      reconciledAsset
      reconciledAmount
      reconciledCaller

      # Reconciled Transaction
      reconciledTransactionHash
      reconciledTimestamp
      reconciledGasPrice
      reconciledGasLimit
      reconciledBlockNumber
    }
  }
`;

export const getDestinationTransfersByIds = gql`
  query GetDestinationTransfersByIds(
    $transferIds: [Bytes!]
    $maxExecutedBlockNumber: BigInt
    $maxReconciledBlockNumber: BigInt
    $status: TransferStatus
  ) {
    destinationTransfers(
      where: {
        transferId_in: $transferIds
        executedBlockNumber_lte: $maxExecutedBlockNumber
        reconciledBlockNumber_lte: $maxReconciledBlockNumber
        status: $status
      }
    ) {
      id

      # MetaData
      originDomain
      destinationDomain
      chainId
      status

      # Executed event Data
      transferId
      to
      nonce
      callData
      localAsset
      routers {
        id
      }
      transactingAsset
      transactingAmount
      originSender

      executedCaller
      executedAmount

      # Executed Transaction
      executedTransactionHash
      executedTimestamp
      executedGasPrice
      executedGasLimit
      executedBlockNumber

      # Reconciled event Data
      reconciledAsset
      reconciledAmount
      reconciledCaller

      # Reconciled Transaction
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
