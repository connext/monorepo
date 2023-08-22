// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {MockHubConnector} from "../../../utils/Mock.sol";
import {SpokeConnector} from "../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {AdminHubConnector} from "../../../../contracts/messaging/connectors/admin/AdminHubConnector.sol";
import {RootManager, ProposedOwnable} from "../../../../contracts/messaging/RootManager.sol";
import {WatcherManager} from "../../../../contracts/messaging/WatcherManager.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";
import {Message} from "../../../../contracts/messaging/libraries/Message.sol";
import {RateLimited} from "../../../../contracts/messaging/libraries/RateLimited.sol";

import "../../../utils/ForgeHelper.sol";

contract AdminHubConnectorTest is ForgeHelper {
  event MessageProcessed(bytes data, address caller);
  event RootReceived(uint32 domain, bytes32 receivedRoot, uint256 queueIndex);
  event RootsAggregated(bytes32 aggregateRoot, uint256 count, bytes32[] aggregatedMessageRoots);

  // ============ Storage ============
  uint32 BNB_DOMAIN = 6450786;
  uint32 ETH_DOMAIN = 6648936;
  // NOTE: if domains are changed, update the DOMAINS array
  uint32[] DOMAINS = [BNB_DOMAIN, ETH_DOMAIN];
  address watcher = address(123123123132);
  address owner = address(45454545454);

  MerkleTreeManager mirror;
  MerkleTreeManager merkleTreeManager;
  RootManager rootManager;
  AdminHubConnector adminHubConnector;

  MockHubConnector bnbHubConnector;
  MockHubConnector ethHubConnector;

  // ============ Setup ============
  function setUp() public {
    // deploy merkle trees
    mirror = new MerkleTreeManager();
    merkleTreeManager = new MerkleTreeManager();
    vm.prank(owner);
    mirror.initialize(owner);

    // deploy watcher manager
    vm.prank(owner);
    WatcherManager manager = new WatcherManager();
    // enroll watcher
    vm.prank(owner);
    manager.addWatcher(watcher);

    // deploy root manager
    vm.prank(owner);
    rootManager = new RootManager(0, address(merkleTreeManager), address(manager), 0, 0);
    vm.prank(address(rootManager));
    merkleTreeManager.initialize(address(rootManager));

    // deploy admin connector
    vm.prank(owner);
    adminHubConnector = new AdminHubConnector(ETH_DOMAIN, BNB_DOMAIN, address(rootManager));

    // deploy mock hub connectors (mirrors and ambs set to empty for both)
    vm.prank(owner);
    bnbHubConnector = new MockHubConnector(ETH_DOMAIN, BNB_DOMAIN, address(0), address(rootManager), address(0));
    vm.prank(owner);
    ethHubConnector = new MockHubConnector(ETH_DOMAIN, ETH_DOMAIN, address(0), address(rootManager), address(0));

    // enroll connectors
    utils_enrollConnector(BNB_DOMAIN, address(bnbHubConnector));
    utils_enrollConnector(ETH_DOMAIN, address(ethHubConnector));
  }

  // ============ Utils ============
  function utils_insertAdminConnector(uint32 _domain) internal {
    utils_unenrollConnector(_domain);
    utils_enrollConnector(_domain, address(adminHubConnector));
  }

  // NOTE: only connectors enrolled via this method will properly update the
  // mapping stored for the test
  function utils_enrollConnector(uint32 _domain, address _connector) internal {
    vm.prank(owner);
    rootManager.addConnector(_domain, _connector);
  }

  function utils_unenrollConnector(uint32 _domain) internal {
    vm.prank(watcher);
    rootManager.removeConnector(_domain);
  }

  function utils_getConnectors() internal view returns (address[] memory) {
    address[] memory ret = new address[](DOMAINS.length);
    for (uint256 i = 0; i < DOMAINS.length; i++) {
      // get the index for the domain in the connectors array
      uint256 idx = rootManager.getDomainIndex(DOMAINS[i]);
      ret[idx] = rootManager.connectors(idx);
    }
    return ret;
  }

  function utils_getFeesAndEncodedData() internal view returns (uint256[] memory, bytes[] memory) {
    uint256[] memory fees = new uint256[](DOMAINS.length);
    bytes[] memory encodedData = new bytes[](DOMAINS.length);
    for (uint256 i = 0; i < DOMAINS.length; i++) {
      encodedData[i] = hex"";
      fees[i] = 0;
    }
    return (fees, encodedData);
  }

  // ============ addSpokeRootToAggregate ============

  function test_AdminHubConnector__addSpokeRootToAggregate_doesNotWorkIfNotOwner(
    bytes32 _data,
    address _sender
  ) public {
    // fuzz testing assumptions
    vm.assume(_sender != owner);
    vm.assume(_data != bytes32(0));

    // run test
    utils_insertAdminConnector(BNB_DOMAIN);
    vm.prank(_sender);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    adminHubConnector.addSpokeRootToAggregate(_data);
  }

  function test_AdminHubConnector__addSpokeRootToAggregate_failsIfEmpty() public {
    utils_insertAdminConnector(BNB_DOMAIN);
    vm.prank(owner);
    vm.expectRevert("empty");
    adminHubConnector.addSpokeRootToAggregate(bytes32(0));
  }

  function test_AdminHubConnector__addSpokeRootToAggregate_works(bytes32 _rootToInsert) public {
    vm.assume(_rootToInsert != bytes32(0));

    // enlist the admin connector
    utils_insertAdminConnector(BNB_DOMAIN);

    // get all inputs to root manager
    address[] memory connectors = utils_getConnectors();
    (uint256[] memory fees, bytes[] memory encodedData) = utils_getFeesAndEncodedData();

    // use admin connector to insert on spoke root (and assert events)
    vm.expectEmit(true, true, true, true, address(rootManager));
    emit RootReceived(BNB_DOMAIN, _rootToInsert, 1);

    vm.expectEmit(true, true, true, true, address(adminHubConnector));
    emit MessageProcessed(abi.encode(_rootToInsert), owner);

    // activate slow mode to be able to call aggregate on RootManager
    vm.prank(watcher);
    rootManager.activateSlowMode();
    
    vm.prank(owner);
    adminHubConnector.addSpokeRootToAggregate(_rootToInsert);

    // Generate the proper event args
    bytes32[] memory leaves = new bytes32[](1);
    leaves[0] = _rootToInsert;
    vm.prank(owner);
    (bytes32 aggregateRoot, uint256 count) = mirror.insert(leaves);

    // NOTE: this event check ensures the root manager emitted the event, but not the data within
    // the event payload
    vm.expectEmit(true, true, true, true, address(rootManager));
    emit RootsAggregated(aggregateRoot, count, leaves);
    rootManager.propagate(connectors, fees, encodedData);
  }
}
