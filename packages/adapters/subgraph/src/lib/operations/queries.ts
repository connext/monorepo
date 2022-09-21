import { gql } from "graphql-request";
import {
  SubgraphQueryMetaParams,
  XTransferStatus,
  SubgraphQueryByTransferIDsMetaParams,
  SubgraphQueryByTimestampMetaParams,
} from "@connext/nxtp-utils";

import { getContext } from "../../reader";

export const ORIGIN_TRANSFER_ENTITY = `
      id
      # Meta Data
      chainId
      transferId
      nonce

      # call params
      to
      callData
      originDomain
      destinationDomain
      forceSlow
      receiveLocal
      recovery
      agent
      callback
      callbackFee
      relayerFee
      slippageTol
      destinationMinOut
      
      # Asset Data
      transactingAsset
      transactingAmount
      originMinOut
      bridgedAsset
      bridgedAmount

      # Event Data
      message

      # XCalled Transaction
      caller
      transactionHash
      timestamp
      gasPrice
      gasLimit
      blockNumber
`;

export const DESTINATION_TRANSFER_ENTITY = `
      id

      # Meta Data
      chainId
      transferId
      nonce

      # call params
      to
      callData
      originDomain
      destinationDomain
      forceSlow
      receiveLocal
      recovery
      agent
      callback
      callbackFee
      relayerFee
      slippageTol
      destinationMinOut

      # Asset Data
      localAsset
      localAmount
      originMinOut
      transactingAsset
      transactingAmount
      sponsorVaultRelayerFee

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
`;

export const BLOCK_NUMBER_ENTITY = `
      block {
        number
      }
`;

export const ORIGIN_MESSAGE_ENTITY = `
      id
      leaf
      index
      root
      message
      transferId
      destinationDomain
`;
export const DESTINATION_MESSAGE_ENTITY = `
      id
      leaf
      processed
      returnData
`;
export const ROOT_MESSAGE_SENT_ENTITY = `
      id
      spokeDomain
      hubDomain
      root
      caller
      transactionHash
      timestamp
      gasPrice
      gasLimit
      blockNumber
`;
export const ROOT_MESSAGE_PROCESSED_ENTITY = `
      id
      spokeDomain
      hubDomain
      root
      caller
      transactionHash
      timestamp
      gasPrice
      gasLimit
      blockNumber
`;

const lastedBlockNumberQuery = (prefix: string): string => {
  return `${prefix}__meta { ${BLOCK_NUMBER_ENTITY}}`;
};
export const getLastestBlockNumberQuery = (prefixes: string[]): string => {
  let combinedQuery = "";
  for (const prefix of prefixes) {
    combinedQuery += lastedBlockNumberQuery(prefix);
  }

  return gql`    
    query GetBlockNumber { 
      ${combinedQuery}
  }`;
};

const maxRoutersPerTransferQuery = (prefix: string): string => {
  return `${prefix}_setting (id: "1") {maxRoutersPerTransfer}`;
};
export const getMaxRoutersPerTransferQuery = (prefixes: string[]): string => {
  let combinedQuery = "";
  for (const prefix of prefixes) {
    combinedQuery += maxRoutersPerTransferQuery(prefix);
  }

  return gql`
    query GetMaxRoutersPerTransfer {
      ${combinedQuery}
    }
  `;
};

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

export const getAssetBalancesRoutersQuery = (
  prefix: string,
  offset: number,
  limit: number,
  orderDirection: "asc" | "desc" = "desc",
): string => {
  const queryString = `
    ${prefix}_routers(
    skip: ${offset},
    first: ${limit},
    orderBy: id,
    orderDirection: ${orderDirection}) {
      id
      assetBalances {
        amount
        asset {
          local
          adoptedAsset
          canonicalId
          canonicalDomain
          blockNumber
        }
      }
    }`;

  return gql`
      query GetAssetBalancesRouters {
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

export const getOriginTransfersByIdsQuery = (prefix: string, transferIds: string[]): string => {
  const queryStr = `
    ${prefix}_originTransfers(where: { transferId_in: [${transferIds}] }) {${ORIGIN_TRANSFER_ENTITY}}`;
  return gql`
    query GetOriginTransfers {
      ${queryStr}
    }
  `;
};

export const getOriginTransfersByTransactionHashesQuery = (prefix: string, hashes: string[]): string => {
  const queryStr = `
    ${prefix}_originTransfers(where: { transactionHash_in: [${hashes}] }) {${ORIGIN_TRANSFER_ENTITY}}`;
  return gql`
    query GetOriginTransfers {
      ${queryStr}
    }
  `;
};

const originTransferQueryString = (
  prefix: string,
  originDomain: string,
  fromNonce: number,
  destinationDomains: string[],
  forceSlow: boolean,
  maxBlockNumber?: number,
  orderDirection: "asc" | "desc" = "desc",
) => {
  return `${prefix}_originTransfers(
    where: {
      forceSlow: ${forceSlow},
      originDomain: ${originDomain},
      nonce_gte: ${fromNonce},
      destinationDomain_in: [${destinationDomains}]
      ${maxBlockNumber ? `, blockNumber_lte: ${maxBlockNumber}` : ""}
    },
    orderBy: blockNumber,
    orderDirection: ${orderDirection}
  ) {${ORIGIN_TRANSFER_ENTITY}}`;
};

export const getOriginTransfersQuery = (agents: Map<string, SubgraphQueryMetaParams>): string => {
  const { config } = getContext();

  let combinedQuery = "";
  const domains = Object.keys(config.sources);
  for (const domain of domains) {
    const prefix = config.sources[domain].prefix;
    if (agents.has(domain)) {
      combinedQuery += originTransferQueryString(
        prefix,
        domain,
        agents.get(domain)!.latestNonce,
        domains,
        agents.get(domain)?.forceSlow ?? false,
        agents.get(domain)!.maxBlockNumber,
        agents.get(domain)!.orderDirection,
      );
    } else {
      console.log(`No agents for domain: ${domain}`);
    }
  }

  return gql`
    query GetOriginTransfers { 
        ${combinedQuery}
      }
  `;
};

const originTransferByNonceQueryString = (
  prefix: string,
  fromNonce: number,
  maxBlockNumber?: number,
  orderDirection: "asc" | "desc" = "desc",
) => {
  return `${prefix}_originTransfers(
    where: {
      nonce_gte: ${fromNonce},
      ${maxBlockNumber ? `, blockNumber_lte: ${maxBlockNumber}` : ""}
    },
    orderBy: nonce,
    orderDirection: ${orderDirection}
  ) {${ORIGIN_TRANSFER_ENTITY}}`;
};

export const getOriginTransfersByNonceQuery = (agents: Map<string, SubgraphQueryMetaParams>): string => {
  const { config } = getContext();

  let combinedQuery = "";
  const domains = Object.keys(config.sources);
  for (const domain of domains) {
    const prefix = config.sources[domain].prefix;
    if (agents.has(domain)) {
      combinedQuery += originTransferByNonceQueryString(
        prefix,
        agents.get(domain)!.latestNonce,
        agents.get(domain)!.maxBlockNumber,
        agents.get(domain)!.orderDirection,
      );
    }
  }

  return gql`
    query GetOriginTransfers {
        ${combinedQuery}
      }
  `;
};

const destinationTransferByNonceQueryString = (
  prefix: string,
  fromNonce: number,
  orderDirection: "asc" | "desc" = "desc",
) => {
  return `${prefix}_destinationTransfers(
    where: {
      nonce_gte: ${fromNonce},
    },
    orderBy: nonce,
    orderDirection: ${orderDirection}
  ) {${DESTINATION_TRANSFER_ENTITY}}`;
};

export const getDestinationTransfersByNonceQuery = (agents: Map<string, SubgraphQueryMetaParams>): string => {
  const { config } = getContext();

  let combinedQuery = "";
  const domains = Object.keys(config.sources);
  for (const domain of domains) {
    const prefix = config.sources[domain].prefix;
    if (agents.has(domain)) {
      combinedQuery += destinationTransferByNonceQueryString(
        prefix,
        agents.get(domain)!.latestNonce,
        agents.get(domain)!.orderDirection,
      );
    }
  }

  return gql`
    query GetDestinationTransfers {
        ${combinedQuery}
      }
  `;
};

const originTransfersByIDsQueryString = (prefix: string, transferIDs: string[], maxBlockNumber?: number) => {
  return `${prefix}_originTransfers(
    where: {
      transferId_in: [${transferIDs}],
      ${maxBlockNumber ? `, blockNumber_lte: ${maxBlockNumber}` : ""}
    },
  ) {${ORIGIN_TRANSFER_ENTITY}}`;
};

export const getOriginTransfersByIDsCombinedQuery = (
  params: Map<string, SubgraphQueryByTransferIDsMetaParams>,
): string => {
  const { config } = getContext();

  let combinedQuery = "";
  const domains = Object.keys(config.sources);
  for (const domain of domains) {
    const prefix = config.sources[domain].prefix;
    if (params.has(domain)) {
      combinedQuery += originTransfersByIDsQueryString(
        prefix,
        params.get(domain)!.transferIDs.map((id) => `"${id}"`),
        params.get(domain)!.maxBlockNumber,
      );
    }
  }

  return gql`
    query GetOriginTransfers {
        ${combinedQuery}
      }
  `;
};

const destinationTransfersByIDsQueryString = (prefix: string, transferIDs: string[]) => {
  return `${prefix}_destinationTransfers(
    where: {
      transferId_in: [${transferIDs}],
    },
  ) {${DESTINATION_TRANSFER_ENTITY}}`;
};

export const getDestinationTransfersByIDsCombinedQuery = (
  params: Map<string, SubgraphQueryByTransferIDsMetaParams>,
): string => {
  const { config } = getContext();

  let combinedQuery = "";
  const domains = Object.keys(config.sources);
  for (const domain of domains) {
    const prefix = config.sources[domain].prefix;
    if (params.has(domain)) {
      combinedQuery += destinationTransfersByIDsQueryString(
        prefix,
        params.get(domain)!.transferIDs.map((id) => `"${id}"`),
      );
    }
  }

  return gql`
    query GetDestinationTransfers {
        ${combinedQuery}
      }
  `;
};

const destinationTransfersByReconcileTimestampQueryString = (
  prefix: string,
  fromTimestamp: number,
  maxBlockNumber?: number,
  orderDirection: "asc" | "desc" = "desc",
) => {
  return `
  ${prefix}_destinationTransfers(
    where: {
      reconciledTimestamp_gte: ${fromTimestamp},
      ${maxBlockNumber ? `, reconciledBlockNumber_lte: ${maxBlockNumber}` : ""}
    },
    orderBy: reconciledTimestamp,
    orderDirection: ${orderDirection}
  ) {${DESTINATION_TRANSFER_ENTITY}}`;
};

export const getDestinationTransfersByDomainAndReconcileTimestampQuery = (
  param: SubgraphQueryByTimestampMetaParams,
  domain: string,
): string => {
  const { config } = getContext();

  let query = "";
  const domains = Object.keys(config.sources);
  if (domains.includes(domain)) {
    const prefix = config.sources[domain].prefix;
    query = destinationTransfersByReconcileTimestampQueryString(
      prefix,
      param.fromTimestamp,
      param.maxBlockNumber,
      param.orderDirection,
    );
  }

  return gql`
    query GetDestinationTransfersByReconcileTimestamp {
        ${query}
      }
  `;
};

const destinationTransfersByIdsQueryString = (
  prefix: string,
  transferIds: string[],
  maxBlockNumber?: number,
  status?: XTransferStatus,
) => {
  return `${prefix}_destinationTransfers ( where: { transferId_in: [${transferIds}] ${
    maxBlockNumber ? `, executedBlockNumber_lte: ${maxBlockNumber}, reconciledBlockNumber_lte: ${maxBlockNumber}` : ""
  } ${status ? `, status: ${status}` : ""}}, orderBy: nonce, orderDirection: desc) {${DESTINATION_TRANSFER_ENTITY}}`;
};

export const getDestinationTransfersByIdsQuery = (prefix: string, transferIds: string[]): string => {
  const queryStr = `
    ${prefix}_destinationTransfers(where: { transferId_in: [${transferIds}] }) {${DESTINATION_TRANSFER_ENTITY}}`;
  return gql`
    query GetDestinationTransfers {
      ${queryStr}
    }
  `;
};

export const getDestinationTransfersByDomainAndIdsQuery = (txIdsByDestinationDomain: Map<string, string[]>): string => {
  const { config } = getContext();
  let combinedQuery = "";
  for (const destinationDomain of txIdsByDestinationDomain.keys()) {
    const prefix = config.sources[destinationDomain].prefix;
    combinedQuery += destinationTransfersByIdsQueryString(prefix, txIdsByDestinationDomain.get(destinationDomain)!);
  }
  return gql`
    query GetDestinationTransfers { 
        ${combinedQuery}
      }
  `;
};

export const getOriginMessagesByDomainAndIndexQuery = (
  params: { domain: string; offset: number; limit: number }[],
): string => {
  const { config } = getContext();
  let combinedQuery = "";
  for (const param of params) {
    const prefix = config.sources[param.domain].prefix;
    combinedQuery += `${prefix}_originMessages ( first: ${param.limit}, where: { index_gte: ${param.offset}, transferId_not: null, destinationDomain_not: null}) {${ORIGIN_MESSAGE_ENTITY}} orderBy: index, orderDirection: asc`;
  }

  return gql`
    query GetOriginMessages {
      ${combinedQuery}
    }
  `;
};

export const getDestinationMessagesByDomainAndLeafQuery = (params: Map<string, string[]>) => {
  const { config } = getContext();
  let combinedQuery = "";
  for (const domain of params.keys()) {
    const prefix = config.sources[domain].prefix;
    const leafs = [...params.get(domain)!.map((leaf) => `"${leaf}"`)];
    combinedQuery += `${prefix}_destinationMessages ( where: { leaf_in: [${leafs}] }) {${DESTINATION_MESSAGE_ENTITY}}`;
  }

  return gql`
    query GetOriginMessages {
      ${combinedQuery}
    }
  `;
};

export const getSentRootMessagesByDomainAndBlockQuery = (
  params: { domain: string; offset: number; limit: number }[],
) => {
  const { config } = getContext();
  let combinedQuery = "";
  for (const param of params) {
    const prefix = config.sources[param.domain].prefix;
    combinedQuery += `${prefix}_rootMessageSent ( first: ${param.limit}, where: { blockNumber_gt: ${param.offset} }) {${ROOT_MESSAGE_SENT_ENTITY}}`;
  }

  return gql`
    query GetSentRootMessages {
      ${combinedQuery}
    }
  `;
};

export const getProcessedRootMessagesByDomainAndBlockQuery = (
  params: { domain: string; offset: number; limit: number }[],
) => {
  const { config } = getContext();
  let combinedQuery = "";
  for (const param of params) {
    const prefix = config.sources[param.domain].prefix;
    combinedQuery += `${prefix}_rootMessageProcessed ( first: ${param.limit}, where: { blockNumber_gt: ${param.offset} }) {${ROOT_MESSAGE_PROCESSED_ENTITY}}`;
  }

  return gql`
    query GetProcessedRootMessages {
      ${combinedQuery}
    }
  `;
};
