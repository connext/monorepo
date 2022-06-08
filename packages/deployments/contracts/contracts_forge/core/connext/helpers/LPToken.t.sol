// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../../../utils/ForgeHelper.sol";
import "../../../../contracts/core/connext/helpers/LPToken.sol";

contract LPTokenTest is ForgeHelper {
  // ============ Storage ============
  address lpToken1;

  // ============ Setup ============
  function setUp() public {
    utils_deployAndSetup();
  }

  // ============ utils ============
  function utils_deployAndSetup() public {
    lpToken1 = address(new LPToken());
    lpToken1.initialize("TestLP", "TestLP");
  }

  // ============ initialize ============
  function test_LPToken_initialize_works() public {}

  function test_LPToken_initialize_failsIfAlreadyInitialized() public {}

  // ============ mint ============
  function test_LPToken_mint_works() public {}

  function test_LPToken_mint_revertIfNoOwner() public {}

  function test_LPToken_mint_revertIfInvalidMintAmoun() public {}

  // ============ _beforeTokenTransfer ============
  function test_LPToken__beforeTokenTransfer_works() public {}

  function test_LPToken__beforeTokenTransfer_revertIfSelfTargeting() public {}
}
