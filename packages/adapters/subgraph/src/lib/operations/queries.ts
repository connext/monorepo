import { gql } from "graphql-request";
import { SubgraphQueryMetaParams } from "@connext/nxtp-utils";
import { SubgraphReaderConfig } from "../entities";
import { getContext } from "../../reader";

export const getAssetBalanceQuery = (prefix: string, router: string, local: string): string => {
  const queryString = `
    ${prefix}_assetBalance(id: "${local}-${router}") {
      amount
      asset {
        canonicalId
        canonicalDomain
        local
        adoptedAsset
        blockNumber
      }
    }`;
  return gql`
    query GetAssetBalance {
      ${queryString}
    }
  `;
};

export const getAssetBalancesQuery = (prefix: string, router: string): string => {
  const queryString = `
    ${prefix}_assetBalances(where: { router: "${router}" }) {
      amount
      asset {
          canonicalId
          canonicalDomain
          local
          adoptedAsset
          blockNumber
      }
    }`;

  return gql`
      query GetAssetBalance {
        ${queryString}
      }
    `;
};

export const getRouterQuery = (prefix: string, router: string): string => {
  const queryString = `
    ${prefix}_router(id: "${router}") {
      id
    }`;

  return gql`
    query GetRouter {
      ${queryString}
    }
  `;
};

export const getAssetByLocalQuery = (prefix: string, local: string): string => {
  const queryString = `
    ${prefix}_assets(where: { local: "${local}" }) {
      id
      local
      adoptedAsset
      canonicalId
      canonicalDomain
      blockNumber
    }`;
  return gql`
    query GetAssetByLocal {
      ${queryString}
    }
  `;
};

export const getAssetByCanonicalIdQuery = (prefix: string, canonicalId: string): string => {
  const str = `
    ${prefix}_assets(where: { canonicalId: "${canonicalId}" }, orderBy: blockNumber, orderDirection: desc) {
            id
            local
            adoptedAsset
            canonicalId
            canonicalDomain
            blockNumber
        }
    `;

  return gql`
    query GetAssetByCanonicalId {
        ${str}
    }
  `;
};

const xCalledTransferQueryString = (
  prefix: string,
  destinationDomains: string[],
  maxBlockNumber: number,
  nonce: number,
): string => {
  return `
    ${prefix}_transfers(
            where: {
            status: XCalled
            destinationDomain_in: ${destinationDomains}
            xcalledBlockNumber_lte: ${maxBlockNumber}
            nonce_gte: ${nonce}
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
      `;
};
export const getXCalledTransfersQuery = (agents: Map<string, SubgraphQueryMetaParams>): string => {
  const { config } = getContext();
  let combinedQuery = "";
  const domains = Object.keys(config.sources);
  for (const domain of domains) {
    const prefix = config.sources[domain].prefix;
    if (agents.has(domain)) {
      combinedQuery += xCalledTransferQueryString(
        prefix,
        domains,
        agents.get(domain)!.maxBlockNumber,
        agents.get(domain)!.latestNonce,
      );
    } else {
      console.log(`No agents for domain: ${domain}`);
    }
  }

  return gql`
    query GetXCalledTransfers { 
        ${combinedQuery}
      }
  `;
};

const executedTransfersByIdsQueryString = (
  prefix: string,
  transferIds: string[],
  maxExecutedBlockNumber: number,
): string => {
  return `
    ${prefix}_transfers(
      where: { transferId_in: ${transferIds}, executedBlockNumber_lte: ${maxExecutedBlockNumber}, status_in: [Executed] }
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
  `;
};
export const getExecutedTransfersByIdsQuery = (
  txIdsByDestinationDomain: Map<string, string[]>,
  agents: Map<string, SubgraphQueryMetaParams>,
): string => {
  const { config } = getContext();
  let combinedQuery = "";
  for (const destinationDomain of txIdsByDestinationDomain.keys()) {
    if (agents.has(destinationDomain)) {
      const prefix = config.sources[destinationDomain].prefix;
      combinedQuery += executedTransfersByIdsQueryString(
        prefix,
        txIdsByDestinationDomain.get(destinationDomain)!,
        agents.get(destinationDomain)!.maxBlockNumber,
      );
    } else {
      console.log(`No agents for domain: ${destinationDomain}`);
    }
  }
  return gql`
    query GetExecutedTransfersByIds { 
        ${combinedQuery}
      }
  `;
};

const reconciledTransfersByIdsQueryString = (
  prefix: string,
  transferIds: string[],
  maxExecutedBlockNumber: number,
): string => {
  return `
    ${prefix}_transfers(
      where: { transferId_in: ${transferIds}, executedBlockNumber_lte: ${maxExecutedBlockNumber}, status_in: [Reconciled] }
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
  `;
};
export const getReconciledTransfersByIdsQuery = (
  txIdsByDestinationDomain: Map<string, string[]>,
  agents: Map<string, SubgraphQueryMetaParams>,
): string => {
  const { config } = getContext();
  let combinedQuery = "";
  for (const destinationDomain of txIdsByDestinationDomain.keys()) {
    if (agents.has(destinationDomain)) {
      const prefix = config.sources[destinationDomain].prefix;
      combinedQuery += reconciledTransfersByIdsQueryString(
        prefix,
        txIdsByDestinationDomain.get(destinationDomain)!,
        agents.get(destinationDomain)!.maxBlockNumber,
      );
    } else {
      console.log(`No agents for domain: ${destinationDomain}`);
    }
  }
  return gql`
    query GetReconciledTransfersByIds { 
        ${combinedQuery}
      }
  `;
};

const transfersStatusQueryByDomain = (prefix: string, transferIds: string[]) => {
  return `${prefix}_transfers(where: { transferId_in: ${transferIds}, status_in: [Executed, Reconciled] }) {
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
  }`;
};
export const getTransfersStatusQuery = (txIdsByDestinationDomain: Map<string, string[]>): string => {
  const { config } = getContext();
  let combinedQuery = "";
  for (const destinationDomain of txIdsByDestinationDomain.keys()) {
    const prefix = config.sources[destinationDomain].prefix;
    combinedQuery += transfersStatusQueryByDomain(prefix, txIdsByDestinationDomain.get(destinationDomain)!);
  }
  return gql`
    query GetTransfersStatus { 
        ${combinedQuery}
      }
  `;
};

export const getTransferQuery = (prefix: string, transferId: string): string => {
  const queryStr = `
    ${prefix}_transfers(where: { transferId: "${transferId}" }) {
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
    }`;
  return gql`
    query GetTransfer {
      ${queryStr}
    }
  `;
};
