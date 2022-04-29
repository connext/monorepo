// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ForgeHelper.sol";

import {SponsorVault, ITokenExchange, IGasTokenOracle} from "../contracts/SponsorVault.sol";

import {TestERC20} from "../contracts/test/TestERC20.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract SponsorVaultTest is ForgeHelper {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  // ============ Events ============

  event ConnextUpdated(address connext, address caller);
  event RateUpdated(uint32 originDomain, SponsorVault.Rate rate, address caller);
  event RelayerFeeCapUpdated(uint256 relayerFeeCap, address caller);
  event GasTokenOracleUpdated(address oracle, address caller);
  event TokenExchangeUpdated(address token, address tokenExchange, address caller);

  // ============ Storage ============

  SponsorVault vault;

  address connext = address(this);
  address payable tokenExchange = payable(address(1));
  address gasPriceOracle = address(2);
  uint32 originDomain = 1;
  TestERC20 localToken;

  SponsorVault.Rate rate = SponsorVault.Rate(1, 1);

  function setUp() public {
    localToken = new TestERC20();

    vault = new SponsorVault(connext);

    // fund the vault
    address(this).call{value: 10 ether}("");
    localToken.transfer(address(vault), 10 ether);
  }

  // ============ Utils ============
  // https://github.com/brockelmore/forge-std
  // specifically here with overriding mappings: https://github.com/brockelmore/forge-std/blob/99107e3e39f27339d224575756d4548c08639bc0/src/test/StdStorage.t.sol#L189-L192

  // ============ constructor ============
  function test_SponsorVault__constructor_failsWithConnextZeroAddress() public {
    vm.expectRevert(
      abi.encodeWithSelector(SponsorVault.SponsorVault__setConnext_invalidConnext.selector)
    );

    new SponsorVault(address(0));
  }

  function test_SponsorVault__constructor_works(address _connext) public {
    vm.assume(_connext != address(0));

    vm.expectEmit(true, true, true, true);
    emit ConnextUpdated(_connext, address(this));

    SponsorVault testVault = new SponsorVault(_connext);

    assertEq(testVault.connext(), _connext);
  }

  // ============ setConnext ============

  function test_SponsorVault__setConnext_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert("Ownable: caller is not the owner");

    vault.setConnext(address(2));
  }

  function test_SponsorVault__setConnext_failsWithConnextZeroAddress() public {
    vm.expectRevert(
      abi.encodeWithSelector(SponsorVault.SponsorVault__setConnext_invalidConnext.selector)
    );

    vault.setConnext(address(0));
  }

  function test_SponsorVault__setConnext_works(address _connext) public {
    vm.assume(_connext != address(0));

    vm.expectEmit(true, true, true, true);
    emit ConnextUpdated(_connext, address(this));

    vault.setConnext(_connext);

    assertEq(vault.connext(), _connext);
  }

  // ============ setRate ============

  function test_SponsorVault__setRate_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert("Ownable: caller is not the owner");

    vault.setRate(1, rate);
  }

  function test_SponsorVault__setRate_failsWithOriginDomainZero() public {
    vm.expectRevert(
      abi.encodeWithSelector(SponsorVault.SponsorVault__setRate_invalidOriginDomain.selector)
    );

    vault.setRate(0, rate);
  }

  function test_SponsorVault__setRate_works(uint32 _originDomain, SponsorVault.Rate calldata _rate) public {
    vm.assume(_originDomain != 0);

    vm.expectEmit(true, true, true, true);
    emit RateUpdated(_originDomain, _rate, address(this));

    vault.setRate(_originDomain, _rate);

    (uint256 num, uint256 den) = vault.rates(_originDomain);

    assertEq(num, _rate.num);
    assertEq(den, _rate.den);
  }

  // ============ setRelayerFeeCap ============

  function test_SponsorVault__setRelayerFeeCap_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert("Ownable: caller is not the owner");

    vault.setRelayerFeeCap(1);
  }

  function test_SponsorVault__setRelayerFeeCap_works(uint256 _relayerFeeCap) public {
    vm.expectEmit(true, true, true, true);
    emit RelayerFeeCapUpdated(_relayerFeeCap, address(this));

    vault.setRelayerFeeCap(_relayerFeeCap);

    assertEq(vault.relayerFeeCap(), _relayerFeeCap);
  }

  // ============ setGasTokenOracle ============

  function test_SponsorVault__setGasTokenOracle_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert("Ownable: caller is not the owner");

    vault.setGasTokenOracle(address(1));
  }

  function test_SponsorVault__setGasTokenOracle_works(address _gasTokenOracle) public {
    vm.expectEmit(true, true, true, true);
    emit GasTokenOracleUpdated(_gasTokenOracle, address(this));

    vault.setGasTokenOracle(_gasTokenOracle);

    assertEq(vault.gasTokenOracle(), _gasTokenOracle);
  }

  // ============ setTokenExchange ============

    function test_SponsorVault__setTokenExchange_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert("Ownable: caller is not the owner");

    vault.setTokenExchange(address(2), tokenExchange);
  }

  function test_SponsorVault__setTokenExchange_failsWithConnextZeroAddress() public {
    vm.expectRevert(
      abi.encodeWithSelector(SponsorVault.SponsorVault__setTokenExchange_invalidAdopted.selector)
    );

    vault.setTokenExchange(address(0), tokenExchange);
  }

  function test_SponsorVault__setTokenExchange_works(address _token, address payable _tokenExchange) public {
    vm.assume(_token != address(0));

    vm.expectEmit(true, true, true, true);
    emit TokenExchangeUpdated(_token, _tokenExchange, address(this));

    vault.setTokenExchange(_token, _tokenExchange);

    assertEq(vault.tokenExchanges(_token), _tokenExchange);
  }

  // ============ reimburseLiquidityFees ============

  // ============ reimburseRelayerFees ============
}
