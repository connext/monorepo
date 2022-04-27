import { getChainData } from "@connext/nxtp-utils";
import { gql } from "graphql-request";

import { SubgraphReader } from "./reader";

export const test = async () => {
  // TODO. Creates live tests for SubgraphReader functions.
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
  let res = await subgraphReader.query(query);
  console.log(res);

  // getAssetBalance(domain, router, local)
  // console.log(
  //   (
  //     await subgraphReader.getAssetBalance(
  //       "2221",
  //       "0x71dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7",
  //       "0xb5aabb55385bfbe31d627e2a717a7b189dda4f8f",
  //     )
  //   ).toString(),
  // );

  // getAssetBalances(domain, router)
  // console.log(await subgraphReader.getAssetBalances("2221", "0x71dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7"));

  // isRouterApproved
  // console.log(await subgraphReader.isRouterApproved("2221", "0x71dd9fc6fe5427f0c7cd7d42bc89effe11c6d4b7"));

  // getAssetByLocal(domain, local)
  // console.log(await subgraphReader.getAssetByLocal("2221", "0xb5aabb55385bfbe31d627e2a717a7b189dda4f8f"));

  // getAssetByCanoncialId(domain, canoncialId)
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
};

test();
