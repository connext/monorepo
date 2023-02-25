// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import {MotherForker} from "../utils/MotherForker.sol";

import {console} from "forge-std/console.sol";

// import "forge-std/console.sol";

contract BridgeFacetUpgradeTest is MotherForker {
  // TODO: Test upgraded forked deployment of Connext here to make sure fast and slow paths are working!

  function setUp() public {
    // setup the fork networks
    // utils_createForks();
    // utils_generateProposalFile();
  }

  function test_fastPath() public {
    utils_setupForkingEnv();
    assertTrue(false);
    // // Loop through all forks as sending chains.
    // for (uint256 i; i < FORK_IDS.length; i++) {
    //   uint256 forkId = FORK_IDS[i];
    //   vm.selectFork(forkId);
    // }
  }
}
