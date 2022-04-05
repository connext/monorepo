import { gql } from "graphql-request";

// Contains all subgraph queries used by router

export const getXCalledTransfers = gql`
  query GetXCalledTransfers($destinationDomains: [BigInt!], $maxXCallBlockNumber: BigInt!, $nonce: BigInt!) {
    transfers(
      where: {
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

export const getExecutedAndReconciledTransfersByIds = gql`
  query GetExecutedAndReconciledTransfersByIds($transferIds: [Bytes!], $maxXCalledBlockNumber: BigInt!) {
    transfers(
      where: {
        transferId_in: $transferIds
        xcalledBlockNumber_lte: $maxXCalledBlockNumber
        status_in: [Executed, Reconciled]
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
      assetId
      domain
      local
      canonicalId
    }
  }
`;
