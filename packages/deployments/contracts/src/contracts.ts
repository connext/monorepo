import { utils } from "ethers";

import {
  ConnextAbi,
  TokenFacetAbi,
  BridgeFacetAbi,
  InboxFacetAbi,
  AdminSpokeConnectorAbi,
  AdminHubConnectorAbi,
  RootManagerAbi,
} from "./abi";
import { ConnextInterface as TConnextInterface } from "./typechain-types/hardhat-diamond-abi/HardhatDiamondABI.sol/Connext";
import { AdminSpokeConnectorInterface as TAdminSpokeConnectorInterface } from "./typechain-types/contracts/messaging/connectors/admin/AdminSpokeConnector";
import { AdminHubConnectorInterface as TAdminHubConnectorInterface } from "./typechain-types/contracts/messaging/connectors/admin/AdminHubConnector";
import { RootManagerInterface as TRootManagerInterface } from "./typechain-types/contracts/messaging/RootManager";

const connextAbi = ConnextAbi.concat(
  TokenFacetAbi.filter((k) => k.includes("event"))
    .concat(BridgeFacetAbi.filter((k) => k.includes("event")))
    .concat(InboxFacetAbi.filter((k) => k.includes("event"))),
);
export const ConnextInterface = new utils.Interface(connextAbi) as TConnextInterface;
export const AdminSpokeConnectorInterface = new utils.Interface(
  AdminSpokeConnectorAbi,
) as TAdminSpokeConnectorInterface;
export const AdminHubConnectorInterface = new utils.Interface(AdminHubConnectorAbi) as TAdminHubConnectorInterface;
export const RootManagerInterface = new utils.Interface(RootManagerAbi) as TRootManagerInterface;
