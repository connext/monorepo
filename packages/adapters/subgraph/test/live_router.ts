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

  const queryParams = [
    { domain: "1936027759", offset: 0, limit: 10 },
    { domain: "9991", offset: 0, limit: 10 },
    { domain: "1735356532", offset: 0, limit: 10 },
  ];
  console.log("> assetBalances: ");
  queryParams.map(async (s) => {
    const assetBalance = await reader.getAssetBalancesRouters(s.domain, s.offset, s.limit);

    console.log(JSON.stringify(assetBalance));
  });
};

livetest();
