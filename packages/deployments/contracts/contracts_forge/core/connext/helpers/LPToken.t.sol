// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../../utils/ForgeHelper.sol";
import "../../../../contracts/core/connext/helpers/LPToken.sol";

contract LPTokenTest is ForgeHelper {
  // ============ Storage ============
  LPToken lpToken;

  // ============ Setup ============
  function setUp() public {
    utils_deployAndSetup();
  }

  // ============ utils ============
  function utils_deployAndSetup() public {
    lpToken = new LPToken();
    lpToken.initialize("TestLP1", "TestLP");
  }

  // ============ initialize ============
  function test_LPToken__initialize_works() public {
    LPToken _lpToken1 = new LPToken();
    _lpToken1.initialize("Test LP1", "TestLP1");
    assertEq(_lpToken1.name(), "Test LP1");
    assertEq(_lpToken1.symbol(), "TestLP1");
  }

  function test_LPToken__initialize_failsIfAlreadyInitialized() public {
    LPToken _lpToken = new LPToken();
    _lpToken.initialize("TestName", "TestSymbol");
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    _lpToken.initialize("TestName2", "TestSymbol");
    assertEq(_lpToken.name(), "TestName");
    assertEq(_lpToken.symbol(), "TestSymbol");
  }

  // ============ mint ============
  function test_LPToken__mint_works() public {
    address _arbitrary = address(12345);
    uint256 mintAmount = 100;
    uint256 oldBalance = lpToken.balanceOf(_arbitrary);
    lpToken.mint(_arbitrary, mintAmount);
    uint256 newBalance = lpToken.balanceOf(_arbitrary);
    assertEq(newBalance - oldBalance, mintAmount);
  }

  function test_LPToken__mint_revertIfNoOwner() public {
    address _arbitrary = address(12345);
    uint256 mintAmount = 100;
    uint256 oldBalance = lpToken.balanceOf(_arbitrary);
    vm.expectRevert(bytes("Ownable: caller is not the owner"));
    vm.prank(address(12345));
    lpToken.mint(_arbitrary, mintAmount);
    uint256 newBalance = lpToken.balanceOf(_arbitrary);
    assertEq(newBalance - oldBalance, 0);
  }

  function test_LPToken__mint_revertIfInvalidMintAmount() public {
    address _arbitrary = address(12345);
    uint256 oldBalance = lpToken.balanceOf(_arbitrary);
    vm.expectRevert(bytes("LPToken: cannot mint 0"));
    lpToken.mint(_arbitrary, 0);
    uint256 newBalance = lpToken.balanceOf(_arbitrary);
    assertEq(newBalance - oldBalance, 0);
  }

  // ============ _beforeTokenTransfer ============
  function test_LPToken___beforeTokenTransfer_works() public {
    lpToken.mint(address(this), 10000);
    address _arbitrary = address(12345);
    uint256 oldBalance = lpToken.balanceOf(_arbitrary);
    lpToken.transfer(_arbitrary, 100);
    uint256 newBalance = lpToken.balanceOf(_arbitrary);
    assertEq(newBalance - oldBalance, 100);
  }

  function test_LPToken___beforeTokenTransfer_revertIfSelfTargeting() public {
    lpToken.mint(address(this), 100);
    vm.expectRevert(bytes("LPToken: cannot send to itself"));
    lpToken.transfer(address(lpToken), 100);
  }
}
