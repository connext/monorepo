import { getChainData } from "@connext/nxtp-utils";
import { SubgraphReader } from "../src/reader";

export const livetest = async () => {
  console.log("> starting live test....");
  const chainData = await getChainData();

  const reader = await SubgraphReader.create(chainData, "production");
  const hubDomain = "6648936"; // 6648936 => main, 1869640809 => optimism, 1886350457 => polygon

  const res = await reader.getLatestBlockNumber(["6648936", "1869640809", "1886350457"]);
  console.log("> latest blocknumber: ");
  console.log(res);

  const leafMap: Map<string, string[]> = new Map();
  leafMap.set("1869640809", [
    "0x20094c8179987eac3ea9c476df0f3fdfd4fc6e7f54ab477a1a69cd08a5a671bf",
    "0x7e15f9f19a6315591038d8395acc1e179763da9230e50242a141d872c813b694",
    "0x8e49fd1c6debae513e3ee83f91ce383e13a0d4efb4066e8ed30ec1728c6b7cd5",
  ]);
  const destinationMessage = await reader.getDestinationMessagesByDomainAndLeaf(leafMap);
  console.log("> destinationMessage: ");
  console.log(destinationMessage);
};

livetest();
