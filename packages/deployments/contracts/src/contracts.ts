import { utils } from "ethers";

import {
  ConnextHandlerAbi,
  TokenRegistryAbi,
  AssetFacetAbi,
  BridgeFacetAbi,
  NomadFacetAbi,
  ConnectorAbi,
  RootManagerAbi,
} from "./abi";
import { ITokenRegistryInterface as TTokenRegistryInterface } from "./typechain-types/contracts/core/connext/interfaces/ITokenRegistry";
import { ConnextHandlerInterface as TConnextHandlerInterface } from "./typechain-types/hardhat-diamond-abi/HardhatDiamondABI.sol/ConnextHandler";
import { ConnectorInterface as TConnectorInterface } from "./typechain-types/contracts/core/messaging/connectors/Connector";
import { RootManagerInterface as TRootManagerInterface } from "./typechain-types/contracts/core/messaging/RootManager";

const connextAbi = ConnextHandlerAbi.concat(
  AssetFacetAbi.filter((k) => k.includes("event"))
    .concat(BridgeFacetAbi.filter((k) => k.includes("event")))
    .concat(NomadFacetAbi.filter((k) => k.includes("event"))),
);
export const ConnextHandlerInterface = new utils.Interface(connextAbi) as TConnextHandlerInterface;
export const TokenRegistryInterface = new utils.Interface(TokenRegistryAbi) as TTokenRegistryInterface;
export const ConnectorInterface = new utils.Interface(ConnectorAbi) as TConnectorInterface;
export const RootManagerInterface = new utils.Interface(RootManagerAbi) as TRootManagerInterface;
