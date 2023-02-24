// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import {MotherForker} from "../utils/MotherForker.sol";

contract BridgeFacetUpgradeTest is MotherForker {
  // TODO: Test upgraded forked deployment of Connext here to make sure fast and slow paths are working!

  function setUp() public {}

  function test_fastPath() public {
    // // Loop through all forks as sending chains.
    // for (uint256 i; i < FORK_IDS.length; i++) {
    //   uint256 forkId = FORK_IDS[i];
    //   vm.selectFork(forkId);
    // }

    utils_generateProposalFile();
  }
}
