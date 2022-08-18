import { utils } from "ethers";

import { ConnextHandlerAbi, TokenRegistryAbi, AssetFacetAbi, BridgeFacetAbi, NomadFacetAbi } from "./abi";
import { ITokenRegistryInterface as TTokenRegistryInterface } from "./typechain-types/contracts/core/connext/interfaces/ITokenRegistry";
import { ConnextHandlerInterface as TConnextHandlerInterface } from "./typechain-types/hardhat-diamond-abi/HardhatDiamondABI.sol/ConnextHandler";

const connextAbi = ConnextHandlerAbi.concat(
  AssetFacetAbi.filter((k) => k.includes("event"))
    .concat(BridgeFacetAbi.filter((k) => k.includes("event")))
    .concat(NomadFacetAbi.filter((k) => k.includes("event"))),
);
export const ConnextHandlerInterface = new utils.Interface(connextAbi) as TConnextHandlerInterface;
export const TokenRegistryInterface = new utils.Interface(TokenRegistryAbi) as TTokenRegistryInterface;
