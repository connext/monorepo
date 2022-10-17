import { utils } from "ethers";

import { ConnextAbi, TokenFacetAbi, BridgeFacetAbi, InboxFacetAbi } from "./abi";
import { ConnextInterface as TConnextInterface } from "./typechain-types/hardhat-diamond-abi/HardhatDiamondABI.sol/Connext";

const connextAbi = ConnextAbi.concat(
  TokenFacetAbi.filter((k) => k.includes("event"))
    .concat(BridgeFacetAbi.filter((k) => k.includes("event")))
    .concat(InboxFacetAbi.filter((k) => k.includes("event"))),
);
export const ConnextInterface = new utils.Interface(connextAbi) as TConnextInterface;
