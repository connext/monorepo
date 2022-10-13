import { getChainData } from "@connext/nxtp-utils";
import { SubgraphReader } from "../src/reader";

export const livetest = async () => {
  console.log("> starting live test....");
  const chainData = await getChainData();

  const reader = await SubgraphReader.create(chainData, "staging");
  const hubDomain = "1735353714"; // 9991 => mumbai, 1735356532 => optimism-goerli

  const res = await reader.getLatestBlockNumber(["9991", "1735353714"]);
  console.log("> latest blocknumber: ");
  console.log(res);

  const rootMessages = await reader.getProcessedRootMessagesByDomain([{ domain: "1735353714", offset: 0, limit: 10 }]);
  console.log("> rootMessages: ");
  console.log(rootMessages);

  const aggregatedRoots = await reader.getGetAggregatedRootsByDomain([{ domain: "1735353714", index: 0, limit: 10 }]);
  console.log("> aggregatedRoots: ");
  console.log(aggregatedRoots);

  const propagatedRoots = await reader.getGetPropagatedRoots(hubDomain, 0, 10);
  console.log("> propagatedRoots: ");
  console.log(propagatedRoots);
};

livetest();
