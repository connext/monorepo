// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {MotherForker} from "../utils/MotherForker.sol";
import {BridgeFacet} from "../../contracts/core/connext/facets/BridgeFacet.sol";

contract BridgeFacetUpgradeTest is MotherForker {
  // TODO: Test upgraded forked deployment of Connext here to make sure fast and slow paths are working!

  address USER = address(123456789);

  function setUp() public {
    vm.deal(USER, 10000 ether);
  }

  function test_fastPath() public {
    // Loop through all forks as sending chains.
    for (uint256 i; i < FORK_IDS.length; i++) {
      uint256 forkId = FORK_IDS[i];
      vm.selectFork(forkId);

      // TODO: Do we need to make this fork persistent?

      ForkInfo memory info = forkInfo[forkId];
      address connext = info.connext;

      // We need to test bridging every single asset listed.
      for (uint256 j; j < info.assets.length; j++) {
        // TODO: deal the user the target ERC20 asset (by spoofing state?)
        // TODO: User needs to approve connext for target amount

        BridgeFacet(connext).xcall{value: relayerFee}(
          // TODO: How do we pick the destination? Just choose another random fork?
          // For now, just setting this to be the hub!
          6648936, // Destination is hub, mainnet.
          USER,
          info.assets[j],
          USER,
          10 ether, // TODO: Could be a 6-decimal asset, we may want to check and set this dependent to that.
          300,
          bytes32("")
        );
      }
    }
  }
}
