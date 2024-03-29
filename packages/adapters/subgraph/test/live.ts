import { getChainData } from "@connext/nxtp-utils";
import { SubgraphReader } from "../src/reader";

export const livetest = async () => {
  console.log("> starting live test....");
  const chainData = await getChainData();

  const reader = await SubgraphReader.create(chainData, "production");
  const hubDomain = "1936027759"; // 9991 => mumbai, 1735356532 => optimism-goerli

  const res = await reader.getLatestBlockNumber(["9991", "1936027759", "1735356532"]);
  console.log("> latest blocknumber: ");
  console.log(res);

  const rootMessageSents = await reader.getSentRootMessagesByDomain([
    { domain: "1936027759", offset: 0, limit: 10 },
    { domain: "9991", offset: 0, limit: 10 },
    { domain: "1735356532", offset: 0, limit: 10 },
  ]);
  console.log("> rootMessageSents: ");
  console.log(rootMessageSents);

  const rootMessages = await reader.getProcessedRootMessagesByDomain([
    { domain: "1936027759", offset: 0, limit: 10 },
    { domain: "9991", offset: 0, limit: 10 },
    { domain: "1735356532", offset: 0, limit: 10 },
  ]);
  console.log("> rootMessages: ");
  console.log(rootMessages);

  const aggregatedRoots = await reader.getGetAggregatedRootsByDomain([
    { hub: hubDomain, index: 0, limit: 10 },
    { hub: hubDomain, index: 0, limit: 10 },
    { hub: hubDomain, index: 0, limit: 10 },
  ]);
  console.log("> aggregatedRoots: ");
  console.log(aggregatedRoots);

  const propagatedRoots = await reader.getGetPropagatedRoots(hubDomain, 0, 100);
  console.log("> propagatedRoots: ");
  console.log(propagatedRoots);
};

livetest();
