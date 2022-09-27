import { utils } from "ethers";

import { ConnextHandlerAbi, TokenRegistryAbi, TokenFacetAbi, BridgeFacetAbi, InboxFacetAbi } from "./abi";
import { ITokenRegistryInterface as TTokenRegistryInterface } from "./typechain-types/contracts/core/connext/interfaces/ITokenRegistry";
import { ConnextHandlerInterface as TConnextHandlerInterface } from "./typechain-types/hardhat-diamond-abi/HardhatDiamondABI.sol/ConnextHandler";

const connextAbi = ConnextHandlerAbi.concat(
  TokenFacetAbi.filter((k) => k.includes("event"))
    .concat(BridgeFacetAbi.filter((k) => k.includes("event")))
    .concat(InboxFacetAbi.filter((k) => k.includes("event"))),
);
export const ConnextHandlerInterface = new utils.Interface(connextAbi) as TConnextHandlerInterface;
export const TokenRegistryInterface = new utils.Interface(TokenRegistryAbi) as TTokenRegistryInterface;
