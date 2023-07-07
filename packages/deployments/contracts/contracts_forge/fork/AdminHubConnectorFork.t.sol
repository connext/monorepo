// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {MockSpokeConnector} from "../utils/Mock.sol";
import {SpokeConnector} from "../../contracts/messaging/connectors/SpokeConnector.sol";
import {AdminHubConnector} from "../../contracts/messaging/connectors/admin/AdminHubConnector.sol";
import {RootManager, ProposedOwnable} from "../../contracts/messaging/RootManager.sol";
import {WatcherManager} from "../../contracts/messaging/WatcherManager.sol";
import {MerkleTreeManager} from "../../contracts/messaging/MerkleTreeManager.sol";
import {Message} from "../../contracts/messaging/libraries/Message.sol";
import {RateLimited} from "../../contracts/messaging/libraries/RateLimited.sol";

import "../utils/ForgeHelper.sol";

contract AdminHubConnectorForkTest is ForgeHelper {
  event MessageProcessed(bytes data, address caller);
  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);
  event RootsAggregated(bytes32 aggregateRoot, uint256 count, bytes32[] aggregatedMessageRoots);

  using stdStorage for StdStorage;

  // ============ Storage ============
  uint32 BNB_DOMAIN = 6450786;
  uint32 ETH_DOMAIN = 6648936;
  address watcher = 0x43DB577bB3DD02989Dc3DC8e65E61a27d6914386;
  SpokeConnector ETH_SPOKE_CONNECTOR = SpokeConnector(payable(0xF7c4d7dcEc2c09A15f2Db5831d6d25eAEf0a296c));
  RootManager ROOT_MANAGER = RootManager(0xd5d61E9dfb6680Cba8353988Ba0337802811C2e1);
  address owner;

  // ============ config
  AdminHubConnector adminHubConnector;

  // ============ Setup ============
  function setUp() public {
    vm.createSelectFork("https://eth.llamarpc.com", 17528353);
    owner = ROOT_MANAGER.owner();
    vm.prank(owner);
    adminHubConnector = new AdminHubConnector(ETH_DOMAIN, BNB_DOMAIN, address(ROOT_MANAGER));
  }

  // ============ Utils ============
  function utils_insertAdminConnector(uint32 _domain) internal {
    vm.prank(watcher);
    ROOT_MANAGER.removeConnector(_domain);
    vm.prank(owner);
    ROOT_MANAGER.addConnector(_domain, address(adminHubConnector));
  }

  function utils_getConnectors() internal view returns (address[] memory) {
    address[] memory connectors = new address[](6);
    connectors[0] = ROOT_MANAGER.connectors(0);
    connectors[1] = ROOT_MANAGER.connectors(1);
    connectors[2] = ROOT_MANAGER.connectors(2);
    connectors[3] = ROOT_MANAGER.connectors(3);
    connectors[4] = ROOT_MANAGER.connectors(4);
    connectors[5] = ROOT_MANAGER.connectors(5);
    return connectors;
  }

  function utils_getFeesAndEncodedData(
    uint256 _numConnectors
  ) internal pure returns (uint256[] memory, bytes[] memory) {
    uint256[] memory fees = new uint256[](_numConnectors);
    bytes[] memory encodedData = new bytes[](_numConnectors);
    for (uint256 i = 0; i < _numConnectors; i++) {
      encodedData[i] = hex"";
      fees[i] = 0;
    }
    return (fees, encodedData);
  }

  // ============ addSpokeRootToAggregate ============
  function test_MultichainReplacementForBnb__works(bytes32 _rootToInsert) public {
    vm.assume(_rootToInsert != bytes32(0));

    // get all inputs to root manager
    address[] memory connectors = utils_getConnectors();
    (uint256[] memory fees, bytes[] memory encodedData) = utils_getFeesAndEncodedData(connectors.length);

    // ensure the rm will not propagate without a new spoke root added
    vm.expectRevert("redundant root");
    ROOT_MANAGER.propagate(connectors, fees, encodedData);

    // add the admin connector
    utils_insertAdminConnector(BNB_DOMAIN);
    // Refresh the connectors
    connectors = utils_getConnectors();

    // use admin connector to insert on spoke root (and assert events)
    (, uint128 last) = ROOT_MANAGER.pendingInboundRoots();
    vm.expectEmit(true, true, true, true, address(ROOT_MANAGER));
    emit RootReceived(BNB_DOMAIN, _rootToInsert, last + 1);

    vm.expectEmit(true, true, true, true, address(adminHubConnector));
    emit MessageProcessed(abi.encode(_rootToInsert), owner);

    vm.prank(owner);
    adminHubConnector.addSpokeRootToAggregate(_rootToInsert);

    // Ensure added root is propagated
    vm.roll(block.number + ROOT_MANAGER.delayBlocks() + 1); // roll enough blocks to pass delay
    // NOTE: this event check ensures the root manager emitted the event, but not the data within
    // the event payload
    vm.expectEmit(true, false, false, false, address(ROOT_MANAGER));
    emit RootsAggregated(bytes32(0), 0, new bytes32[](1));
    ROOT_MANAGER.propagate(connectors, fees, encodedData);
  }
}
