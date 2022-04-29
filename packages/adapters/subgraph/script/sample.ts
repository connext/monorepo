import { getChainData, SubgraphQueryMetaParams, XTransfer, XTransferStatus } from "@connext/nxtp-utils";
import { gql } from "graphql-request";

import { SubgraphReader } from "../src/reader";

export const test = async () => {
  // TODO. Creates live tests for SubgraphReader functions.
  // This needs to be removed after getting integrated into other packages.
  // rinkeby => (domain: 1111, network: rinkeby)
  // kovan => (domain: 2221, network: kovan)

  const chainData = await getChainData();
  const subgraphReader = await SubgraphReader.create(chainData!);

  // test -> query()
  const query = gql`
    query GetRouter {
      kovan_routers(first: 5) {
        id
      }
      rinkeby_routers(first: 5) {
        id
      }
    }
  `;
  console.log(await subgraphReader.query(query));

  // getAssetBalance(domain, router, local)
  console.log(
    (
      await subgraphReader.getAssetBalance(
        "2221",
        "0x71dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7",
        "0xb5aabb55385bfbe31d627e2a717a7b189dda4f8f",
      )
    ).toString(),
  );

  // getAssetBalances(domain, router)
  console.log(await subgraphReader.getAssetBalances("2221", "0x71dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7"));

  // isRouterApproved
  console.log(await subgraphReader.isRouterApproved("2221", "0x71dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7"));

  // getAssetByLocal(domain, local)
  console.log(await subgraphReader.getAssetByLocal("2221", "0xb5aabb55385bfbe31d627e2a717a7b189dda4f8f"));

  // getAssetByCanoncialId(domain, canonicalId)
  console.log(
    await subgraphReader.getAssetByCanonicalId(
      "1111",
      "0x000000000000000000000000b5aabb55385bfbe31d627e2a717a7b189dda4f8f",
    ),
  );

  // getTransfer(domain, transferId)
  console.log(
    await subgraphReader.getTransfer("2221", "0x75730b13a1ef662696aa50def454adfea8eb6a1d89e8bf90f2001885c7d7476e"),
  );

  // getXCalls(agents)
  const agents: Map<string, SubgraphQueryMetaParams> = new Map();
  agents.set("1111", { maxBlockNumber: 10580300, latestNonce: 0 });
  agents.set("2221", { maxBlockNumber: 31289880, latestNonce: 13 });
  console.log(await subgraphReader.getXCalls(agents));

  // getTransactionsWithStatuses(agents, status)
  console.log(await subgraphReader.getTransactionsWithStatuses(agents, XTransferStatus.Reconciled));

  // getExecutedAndReconciledTransfers(transfers)
  const transfers: XTransfer[] = [
    {
      originDomain: "2221",
      destinationDomain: "1111",
      status: XTransferStatus.XCalled,
      to: "0x28a36878c0be1343283e4ad6a2bf178a5737e864",
      transferId: "0xd81190d9d8692f56607b88acc31e21ce25fb3b5378d11d2b1596965766639457",
      callData: "0x",
      idx: undefined,
      nonce: 13,
      routers: [],
    },
    {
      originDomain: "2221",
      destinationDomain: "1111",
      status: XTransferStatus.XCalled,
      to: "0x28a36878c0be1343283e4ad6a2bf178a5737e864",
      transferId: "0x41d57cb2528103379f476ff8797f468610a046935b38c9b15b2647d639985473",
      callData: "0x",
      idx: undefined,
      nonce: 13,
      routers: [],
    },
    {
      originDomain: "1111",
      destinationDomain: "2221",
      status: XTransferStatus.XCalled,
      to: "0x28a36878c0be1343283e4ad6a2bf178a5737e864",
      transferId: "0xb438cae3d126e1d2a5e02b34829130b49279230e14c03ab69795275f625bb0fd",
      callData: "0x",
      idx: undefined,
      nonce: 13,
      routers: [],
    },
  ];
  console.log(await subgraphReader.getExecutedAndReconciledTransfers(transfers));
};

test();
