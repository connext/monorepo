// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import {ForgeHelper} from "../utils/ForgeHelper.sol";

contract Upgrade is ForgeHelper {

  // Hardcode the networks to participate in (should match foundry.toml)
  string[2][] public NETWORKS; // [[name, rpc], [name, rpc], ...]
  uint256[] public FORK_IDS;

  // ============ Test set up ============
  function setUp() public {
    createForks();
  }

  // ============ Utils ==================
  function createForks() {
    NETWORKS = vm.rpcUrls();
    for (uint256 i; i < NETWORKS.length; i++) {
        FORK_IDS[i] = vm.createFork(NETWORKS[i][1]);
    }
  }


  function test_testing() public {
    // Create fork for each network
    
  }
}
