// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;
import {MotherForker} from "../utils/MotherForker.sol";

import "forge-std/console.sol";

contract ExecutionUpgradeTest is MotherForker {
  // TODO: Test upgraded forked deployment of Connext here to make sure fast and slow paths are working!

  function setUp() public {
    // setup the fork networks
    utils_setupForkingEnv();
    // apply proposed upgrade to all diamonds
    utils_upgradeDiamonds();
  }

  function test_fastPath() public {
    utils_setupForkingEnv();
    utils_upgradeDiamonds();
    assertTrue(false);
  }
}
