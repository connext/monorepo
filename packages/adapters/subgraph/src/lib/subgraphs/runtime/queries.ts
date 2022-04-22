import { gql } from "graphql-request";

// Contains all subgraph queries used by router

export const getTransfers = gql`
  query GetTransfers($originDomain: BigInt!, $destinationDomains: [BigInt!], $nonce: BigInt!) {
    transfers(
      where: { destinationDomain_in: $destinationDomains, nonce_gte: $nonce, originDomain: $originDomain }
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
  }
`;

export const getXCalledTransfers = gql`
  query GetXCalledTransfers(
    $originDomain: BigInt!
    $destinationDomains: [BigInt!]
    $maxXCallBlockNumber: BigInt!
    $nonce: BigInt!
  ) {
    transfers(
      where: {
        originDomain: $originDomain
        status: XCalled
        destinationDomain_in: $destinationDomains
        xcalledBlockNumber_lte: $maxXCallBlockNumber
        nonce_gte: $nonce
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
  }
`;

export const getTransfer = gql`
  query GetTransfer($transferId: Bytes!) {
    transfers(where: { transferId: $transferId }) {
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
  }
`;

export const getExecutedTransfersByIds = gql`
  query GetExecutedTransfersByIds($transferIds: [Bytes!], $maxExecutedBlockNumber: BigInt!) {
    transfers(
      where: { transferId_in: $transferIds, executedBlockNumber_lte: $maxExecutedBlockNumber, status_in: [Executed] }
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
      xcalledTransactingAsset
      xcalledLocalAsset
      xcalledTransactingAmount
      xcalledLocalAmount
      xcalledCaller
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
  }
`;

export const getReconciledTransfersByIds = gql`
  query GetReconciledTransfersByIds($transferIds: [Bytes!], $maxReconciledBlockNumber: BigInt!) {
    transfers(
      where: {
        transferId_in: $transferIds
        reconciledBlockNumber_lte: $maxReconciledBlockNumber
        status_in: [Reconciled]
      }
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
      xcalledTransactingAsset
      xcalledLocalAsset
      xcalledTransactingAmount
      xcalledLocalAmount
      xcalledCaller
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
  }
`;

export const getTransfersStatus = gql`
  query GetTransfersStatus($transferIds: [Bytes!]) {
    transfers(where: { transferId_in: $transferIds, status_in: [Executed, Reconciled] }) {
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
      xcalledTransactingAsset
      xcalledLocalAsset
      xcalledTransactingAmount
      xcalledLocalAmount
      xcalledCaller
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
