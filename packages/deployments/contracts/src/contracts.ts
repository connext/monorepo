import { utils } from "ethers";

import { ConnextAbi, TokenFacetAbi, BridgeFacetAbi, InboxFacetAbi, SpokeConnectorAbi, HubConnectorAbi } from "./abi";
import { ConnextInterface as TConnextInterface } from "./typechain-types/hardhat-diamond-abi/HardhatDiamondABI.sol/Connext";
import { SpokeConnectorInterface as TSpokeConnectorInterface } from "./typechain-types/contracts/messaging/connectors/SpokeConnector";
import { HubConnectorInterface as THubConnectorInterface } from "./typechain-types/contracts/messaging/connectors/HubConnector";

const connextAbi = ConnextAbi.concat(
  TokenFacetAbi.filter((k) => k.includes("event"))
    .concat(BridgeFacetAbi.filter((k) => k.includes("event")))
    .concat(InboxFacetAbi.filter((k) => k.includes("event"))),
);
export const ConnextInterface = new utils.Interface(connextAbi) as TConnextInterface;
export const SpokeConnectorInterface = new utils.Interface(SpokeConnectorAbi) as TSpokeConnectorInterface;
export const HubConnectorInterface = new utils.Interface(HubConnectorAbi) as THubConnectorInterface;
