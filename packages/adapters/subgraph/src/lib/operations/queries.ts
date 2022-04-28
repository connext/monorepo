import { gql } from "graphql-request";
import { SubgraphQueryMetaParams } from "@connext/nxtp-utils";
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
export const TRANSFER_ENTITY = `
    id
    # Meta
    originDomain
    destinationDomain
    chainId
    status
    # Transfer Data
    to
    transferId
    callData
    idx
    nonce
    routers {
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
    reconciledBlockNumber`;

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
              destinationDomain_in: [${destinationDomains}]
              xcalledBlockNumber_lte: ${maxBlockNumber}
              nonce_gte: "${nonce}"
            }
            orderBy: xcalledBlockNumber
            orderDirection: desc
        ) {${TRANSFER_ENTITY}}
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

const executedAndReconciledTransfersByIdsQueryString = (
  prefix: string,
  transferIds: string[],
  maxBlockNumber: number,
): string => {
  return `
    ${prefix}_executedTransfers : ${prefix}_transfers (
      where: { transferId_in: [${transferIds}], executedBlockNumber_lte: ${maxBlockNumber}, status: Executed }
    ) {${TRANSFER_ENTITY}}
    ${prefix}_reconciledTransfers : ${prefix}_transfers (
      where: { transferId_in: [${transferIds}], reconciledBlockNumber_lte: ${maxBlockNumber}, status: Reconciled }
    ) {${TRANSFER_ENTITY}}
  `;
};
export const getExecutedAndReconciledTransfersByIdsQuery = (
  txIdsByDestinationDomain: Map<string, string[]>,
  agents: Map<string, SubgraphQueryMetaParams>,
): string => {
  const { config } = getContext();
  let combinedQuery = "";
  for (const destinationDomain of txIdsByDestinationDomain.keys()) {
    if (agents.has(destinationDomain)) {
      const prefix = config.sources[destinationDomain].prefix;
      combinedQuery += executedAndReconciledTransfersByIdsQueryString(
        prefix,
        txIdsByDestinationDomain.get(destinationDomain)!,
        agents.get(destinationDomain)!.maxBlockNumber,
      );
    } else {
      console.log(`No agents for domain: ${destinationDomain}`);
    }
  }
  return gql`
    query GetExecutedAndReconciledTransfersByIds { 
        ${combinedQuery}
      }
  `;
};

const transfersStatusQueryByDomain = (prefix: string, transferIds: string[]) => {
  return `${prefix}_transfers(where: { transferId_in: [${transferIds}], status_in: [Executed, Reconciled] }) {${TRANSFER_ENTITY}}`;
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
    ${prefix}_transfers(where: { transferId: "${transferId}" }) {${TRANSFER_ENTITY}}`;
  return gql`
    query GetTransfer {
      ${queryStr}
    }
  `;
};
