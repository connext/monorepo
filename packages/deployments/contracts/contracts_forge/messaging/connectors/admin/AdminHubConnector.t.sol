// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {MockSpokeConnector} from "../../../utils/Mock.sol";
import {SpokeConnector} from "../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {AdminHubConnector} from "../../../../contracts/messaging/connectors/admin/AdminHubConnector.sol";
import {RootManager} from "../../../../contracts/messaging/RootManager.sol";
import {WatcherManager} from "../../../../contracts/messaging/WatcherManager.sol";
import {MerkleTreeManager} from "../../../../contracts/messaging/MerkleTreeManager.sol";
import {Message} from "../../../../contracts/messaging/libraries/Message.sol";
import {RateLimited} from "../../../../contracts/messaging/libraries/RateLimited.sol";

import "../../../utils/ForgeHelper.sol";

contract AdminHubConnectorTest is ForgeHelper {
  event MessageSent(bytes data, bytes encodedData, address caller);

  error ProposedOwnable__onlyOwner_notOwner();

  using stdStorage for StdStorage;

  // ============ Storage ============
  uint32 BNB_DOMAIN = 6450786;
  uint32 ETH_DOMAIN = 6648936;
  address watcher = 0x43DB577bB3DD02989Dc3DC8e65E61a27d6914386;
  address owner = 0x4d50a469fc788a3c0CdC8Fd67868877dCb246625;
  SpokeConnector ETH_SPOKE_CONNECTOR = SpokeConnector(payable(0xF7c4d7dcEc2c09A15f2Db5831d6d25eAEf0a296c));
  RootManager ROOT_MANAGER = RootManager(0xd5d61E9dfb6680Cba8353988Ba0337802811C2e1);

  // ============ config
  AdminHubConnector adminHubConnector;

  // ============ Setup ============
  function setUp() public {
    vm.createSelectFork("https://eth.llamarpc.com", 17528353);
    vm.prank(owner);
    adminHubConnector = new AdminHubConnector(ETH_DOMAIN, BNB_DOMAIN, address(ROOT_MANAGER));
  }

  // ============ utils ============

  function test_AdminHubConnector__addSpokeRootToAggregate_doesNotWorkIfNotOwner() public {
    vm.prank(watcher);
    ROOT_MANAGER.removeConnector(BNB_DOMAIN);
    vm.prank(owner);
    ROOT_MANAGER.addConnector(BNB_DOMAIN, address(adminHubConnector));
    vm.prank(address(1));
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);
    adminHubConnector.addSpokeRootToAggregate(
      bytes32(0x0000000000000000000000000000000000000000000000000000000000000001)
    );
  }

  function test_AdminHubConnector__addSpokeRootToAggregate_works() public {
    address[] memory connectors = new address[](6);
    connectors[0] = ROOT_MANAGER.connectors(0);
    connectors[1] = ROOT_MANAGER.connectors(1);
    connectors[2] = ROOT_MANAGER.connectors(2);
    connectors[3] = ROOT_MANAGER.connectors(3);
    connectors[4] = ROOT_MANAGER.connectors(4);
    connectors[5] = ROOT_MANAGER.connectors(5);

    uint256[] memory fees = new uint256[](6);
    fees[0] = 0;
    fees[1] = 0;
    fees[2] = 0;
    fees[3] = 0;
    fees[4] = 0;
    fees[5] = 0;

    bytes[] memory encodedData = new bytes[](6);
    encodedData[0] = hex"";
    encodedData[1] = hex"";
    encodedData[2] = hex"";
    encodedData[3] = hex"";
    encodedData[4] = hex"";
    encodedData[5] = hex"";
    vm.expectRevert("redundant root");
    ROOT_MANAGER.propagate(connectors, fees, encodedData);

    vm.prank(watcher);
    ROOT_MANAGER.removeConnector(BNB_DOMAIN);
    vm.prank(owner);
    ROOT_MANAGER.addConnector(BNB_DOMAIN, address(adminHubConnector));
    vm.prank(owner);
    adminHubConnector.addSpokeRootToAggregate(
      bytes32(0x80E1EE5091DFA6F8B129E28436D323ED6DA70F0A6D39B722323272017001F7E7)
    );

    vm.roll(block.number + ROOT_MANAGER.delayBlocks() + 1); // roll enough blocks to pass delay

    connectors = new address[](6);
    connectors[0] = ROOT_MANAGER.connectors(0);
    connectors[1] = ROOT_MANAGER.connectors(1);
    connectors[2] = ROOT_MANAGER.connectors(2);
    connectors[3] = ROOT_MANAGER.connectors(3);
    connectors[4] = ROOT_MANAGER.connectors(4);
    connectors[5] = ROOT_MANAGER.connectors(5);

    fees = new uint256[](6);
    fees[0] = 0;
    fees[1] = 0;
    fees[2] = 0;
    fees[3] = 0;
    fees[4] = 0;
    fees[5] = 0;

    encodedData = new bytes[](6);
    encodedData[0] = hex"";
    encodedData[1] = hex"";
    encodedData[2] = hex"";
    encodedData[3] = hex"";
    encodedData[4] = hex"";
    encodedData[5] = hex"";

    ROOT_MANAGER.propagate(connectors, fees, encodedData);

    vm.roll(block.number + ETH_SPOKE_CONNECTOR.delayBlocks() + 1); // roll enough blocks to pass delay

    // generate proof for this tx: https://connextscan.io/tx/0x25b854f9c3c2177eacab398b0909aadfd5d0b380a33833bfc9903db74c6e0156?src=search
    // was sent before the latest root was added, so it should work
  }
}
