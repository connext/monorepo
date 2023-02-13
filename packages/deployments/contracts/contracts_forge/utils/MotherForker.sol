// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import {ForgeHelper} from "../utils/ForgeHelper.sol";

/**
 * @notice A 'ForkHelper' used to initialize all the applicable forks (found in foundry.toml).
 * @dev Should be inherited and used in the `upgrade` suite of tests to basically test upgradability
 * of live contracts.
 */
abstract contract MotherForker is ForgeHelper {
  // Hardcode the networks to participate in (should match foundry.toml)
  string[2][] public NETWORKS; // [[name, rpc], [name, rpc], ...]
  uint256[] public FORK_IDS;

  // ============ Test set up ============
  function setUp() public {
    utils_createForks();
  }

  // ============ Utils ==================
  // Create a fork for each network.
  function utils_createForks() internal {
    NETWORKS = vm.rpcUrls();
    for (uint256 i; i < NETWORKS.length; i++) {
      FORK_IDS[i] = vm.createFork(NETWORKS[i][1]);
    }
  }

  function utils_upgradeDiamond(address diamond) internal {
    // TODO: Need a pre-generated diamond cut proposal - one that will be different than on-chain - that we're
    // testing here. Should come from config?
    // TODO: Should submit a pre-generated diamond cut proposal to the Connext Diamond, zoom forward 7 days,
    // and then accept the proposal.
  }
}
