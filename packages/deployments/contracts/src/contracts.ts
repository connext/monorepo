import { utils } from "ethers";

import { ConnextHandlerAbi, TokenFacetAbi, BridgeFacetAbi, InboxFacetAbi } from "./abi";
import { ConnextHandlerInterface as TConnextHandlerInterface } from "./typechain-types/hardhat-diamond-abi/HardhatDiamondABI.sol/ConnextHandler";

const connextAbi = ConnextHandlerAbi.concat(
  TokenFacetAbi.filter((k) => k.includes("event"))
    .concat(BridgeFacetAbi.filter((k) => k.includes("event")))
    .concat(InboxFacetAbi.filter((k) => k.includes("event"))),
);
export const ConnextHandlerInterface = new utils.Interface(connextAbi) as TConnextHandlerInterface;
