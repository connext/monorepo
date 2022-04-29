// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ForgeHelper.sol";

import {SponsorVault, ITokenExchange, IGasTokenOracle} from "../contracts/SponsorVault.sol";

import {TestERC20} from "../contracts/test/TestERC20.sol";

contract MockTokenExchange is ITokenExchange {
  function getInGivenExactOut(address token, uint256 exactOut) external returns (uint256) {
    return exactOut / 10;
  }

  function swapExactOut(address token, uint256 exactOut, address recipient) external payable returns (uint256) {
    return exactOut;
  }
}

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
  address gasTokenOracle = address(1);
  MockTokenExchange tokenExchange;
  address gasPriceOracle = address(2);
  uint32 originDomain = 1;
  TestERC20 localToken;
  TestERC20 localToken2;

  SponsorVault.Rate rate = SponsorVault.Rate(1, 1);

  function setUp() public {
    localToken = new TestERC20();
    localToken2 = new TestERC20();

    tokenExchange = new MockTokenExchange();

    vault = new SponsorVault(connext);

    // fund the vault
    address(vault).call{value: 100 ether}("");
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

    vault.setTokenExchange(address(2), payable(address(tokenExchange)));
  }

  function test_SponsorVault__setTokenExchange_failsWithConnextZeroAddress() public {
    vm.expectRevert(
      abi.encodeWithSelector(SponsorVault.SponsorVault__setTokenExchange_invalidAdopted.selector)
    );

    vault.setTokenExchange(address(0), payable(address(tokenExchange)));
  }

  function test_SponsorVault__setTokenExchange_works(address _token, address payable _tokenExchange) public {
    vm.assume(_token != address(0));

    vm.expectEmit(true, true, true, true);
    emit TokenExchangeUpdated(_token, _tokenExchange, address(this));

    vault.setTokenExchange(_token, _tokenExchange);

    assertEq(vault.tokenExchanges(_token), _tokenExchange);
  }

  // ============ reimburseLiquidityFees ============

  function test_SponsorVault__reimburseLiquidityFees_failsIfNotConnext() public {
    vm.prank(address(0));
    vm.expectRevert(
      abi.encodeWithSelector(SponsorVault.SponsorVault__onlyConnext.selector)
    );

    vault.reimburseLiquidityFees(address(1), 1);
  }

  function test_SponsorVault__reimburseLiquidityFees_returns_0_if_no_tokenExchanges_and_no_token_balance() public {
    assertEq(vault.tokenExchanges(address(1)), address(0));
    assertEq(localToken2.balanceOf(address(vault)), 0);

    uint256 balanceBefore = address(vault).balance;

    uint256 sponsored = vault.reimburseLiquidityFees(address(localToken2), 1);

    assertEq(sponsored, 0);
    assertEq(address(vault).balance, balanceBefore);
  }

  function test_SponsorVault__reimburseLiquidityFees_returns_0_if_tokenExchanges_it_set_but_no_enough_eth() public {
    vault.setTokenExchange(address(localToken), payable(address(tokenExchange)));

    uint256 balanceBefore = address(vault).balance;

    vm.mockCall(
      address(tokenExchange),
      abi.encodeWithSelector(ITokenExchange.getInGivenExactOut.selector),
      abi.encode(uint256(balanceBefore + 1))
    );

    uint256 sponsored = vault.reimburseLiquidityFees(address(localToken), 1);

    assertEq(sponsored, 0);
    assertEq(address(vault).balance, balanceBefore);
  }

  function test_SponsorVault__reimburseLiquidityFees_should_work_with_tokenExchange() public {
    uint256 liquidityFee = 500;
    uint256 amountIn = tokenExchange.getInGivenExactOut(address(localToken), liquidityFee);

    vault.setTokenExchange(address(localToken), payable(address(tokenExchange)));

    uint256 balanceBefore = address(vault).balance;
    uint256 balanceLocalBefore = localToken.balanceOf(address(vault));

    vm.expectCall(
      address(tokenExchange),
      abi.encodeWithSelector(ITokenExchange.swapExactOut.selector, address(localToken), liquidityFee, address(this))
    );

    uint256 sponsored = vault.reimburseLiquidityFees(address(localToken), liquidityFee);

    assertEq(sponsored, liquidityFee);
    assertEq(address(vault).balance, balanceBefore - amountIn);
    assertEq(localToken.balanceOf(address(vault)), balanceLocalBefore);
  }

  function test_SponsorVault__reimburseLiquidityFees_should_work_with_no_tokenExchange_but_token_balance() public {
    uint256 liquidityFee = 500;

    assertEq(vault.tokenExchanges(address(1)), address(0));
    assertTrue(localToken.balanceOf(address(vault)) >= liquidityFee);

    uint256 balanceBefore = address(vault).balance;
    uint256 balanceLocalBefore = localToken.balanceOf(address(vault));

    uint256 sponsored = vault.reimburseLiquidityFees(address(localToken), liquidityFee);

    assertEq(sponsored, liquidityFee);
    assertEq(address(vault).balance, balanceBefore);
    assertEq(localToken.balanceOf(address(vault)), balanceLocalBefore - liquidityFee);
  }

  // ============ reimburseRelayerFees ============

  function test_SponsorVault__reimburseRelayerFees_failsIfNotConnext() public {
    vm.prank(address(0));
    vm.expectRevert(
      abi.encodeWithSelector(SponsorVault.SponsorVault__onlyConnext.selector)
    );

    vault.reimburseRelayerFees(originDomain, payable(address(this)), 1);
  }

  function test_SponsorVault__reimburseRelayerFees_should_not_sponsor_fee_when_no_gasTokenOracle_nor_rate() public {
    assertEq(vault.gasTokenOracle(), address(0));
    assertEq(vault.gasTokenOracle(), address(0));

    (uint256 num, uint256 den) = vault.rates(originDomain);
    assertEq(num, 0);
    assertEq(den, 0);

    uint256 relayerFeeCap = 1000;
    uint256 relayerFee = 500;
    address to = address(10);

    vault.setRelayerFeeCap(relayerFeeCap);

    uint256 balanceBefore = to.balance;

    vault.reimburseRelayerFees(originDomain, payable(to), relayerFee);

    assertEq(to.balance, balanceBefore);
  }

  function test_SponsorVault__reimburseRelayerFees_should_use_rate_when_no_gasTokenOracle_is_set() public {
    SponsorVault.Rate memory _rate = SponsorVault.Rate({num: 1, den: 2});
    uint256 relayerFeeCap = 1000;
    uint256 relayerFee = 500;
    address to = address(10);

    vault.setRelayerFeeCap(relayerFeeCap);
    vault.setRate(originDomain, _rate);

    uint256 balanceBefore = to.balance;

    vault.reimburseRelayerFees(originDomain, payable(to), relayerFee);

    assertEq(to.balance, balanceBefore + (relayerFee * _rate.num / _rate.den));
  }

  function test_SponsorVault__reimburseRelayerFees_should_use_rate_when_no_gasTokenOracle_is_set_but_no_sponsor_the_fee_when_no_enough_balance() public {
    SponsorVault.Rate memory _rate = SponsorVault.Rate({num: 1, den: 1});
    uint256 relayerFeeCap = address(vault).balance * 2;
    uint256 relayerFee = address(vault).balance + 10;
    address to = address(10);

    vault.setRelayerFeeCap(relayerFeeCap);
    vault.setRate(originDomain, _rate);

    uint256 balanceBefore = to.balance;

    vault.reimburseRelayerFees(originDomain, payable(to), relayerFee);

    assertEq(to.balance, balanceBefore);
  }

  function test_SponsorVault__reimburseRelayerFees_should_return_relayerFeeCap_if_fee_is_to_high() public {
    SponsorVault.Rate memory _rate = SponsorVault.Rate({num: 1, den: 2});
    uint256 relayerFeeCap = 1000;
    uint256 relayerFee = 3000;
    address to = address(10);

    vault.setRelayerFeeCap(relayerFeeCap);
    vault.setRate(originDomain, _rate);

    uint256 balanceBefore = to.balance;

    vault.reimburseRelayerFees(originDomain, payable(to), relayerFee);

    assertEq(to.balance, balanceBefore + relayerFeeCap);
  }

  function test_SponsorVault__reimburseRelayerFees_should_use_gasTokenOracle_rate() public {
    SponsorVault.Rate memory _rate = SponsorVault.Rate({num: 1, den: 2});

    uint256 relayerFeeCap = 1000;
    uint256 relayerFee = 500;
    address to = address(10);

    vault.setRelayerFeeCap(relayerFeeCap);
    vault.setRate(originDomain, _rate);
    vault.setGasTokenOracle(gasTokenOracle);

    uint256 balanceBefore = to.balance;

    SponsorVault.Rate memory gasTokenOracleRate = SponsorVault.Rate({num: 1, den: 3});

    vm.mockCall(
      address(gasTokenOracle),
      abi.encodeWithSelector(IGasTokenOracle.getRate.selector),
      abi.encode(gasTokenOracleRate)
    );

    vm.expectCall(
      address(gasTokenOracle),
      abi.encodeWithSelector(IGasTokenOracle.getRate.selector, originDomain)
    );

    vault.reimburseRelayerFees(originDomain, payable(to), relayerFee);

    assertEq(to.balance, balanceBefore + (relayerFee * gasTokenOracleRate.num / gasTokenOracleRate.den));
  }

  function test_SponsorVault__reimburseRelayerFees_should_use_gasTokenOracle_rate_but_return_relayerFeeCap_when_fee_is_to_high() public {
    SponsorVault.Rate memory _rate = SponsorVault.Rate({num: 1, den: 2});

    uint256 relayerFeeCap = 1000;
    uint256 relayerFee = 3300;
    address to = address(10);

    vault.setRelayerFeeCap(relayerFeeCap);
    vault.setRate(originDomain, _rate);
    vault.setGasTokenOracle(gasTokenOracle);

    uint256 balanceBefore = to.balance;

    SponsorVault.Rate memory gasTokenOracleRate = SponsorVault.Rate({num: 1, den: 3});

    vm.mockCall(
      address(gasTokenOracle),
      abi.encodeWithSelector(IGasTokenOracle.getRate.selector),
      abi.encode(gasTokenOracleRate)
    );

    vm.expectCall(
      address(gasTokenOracle),
      abi.encodeWithSelector(IGasTokenOracle.getRate.selector, originDomain)
    );

    vault.reimburseRelayerFees(originDomain, payable(to), relayerFee);

    assertEq(to.balance, balanceBefore + relayerFeeCap);
  }

  function test_SponsorVault__reimburseRelayerFees_should_use_gasTokenOracle_rate_but_no_sponsor_the_fee_when_no_enough_balance() public {
    SponsorVault.Rate memory _rate = SponsorVault.Rate({num: 1, den: 2});

    address to = address(10);
    uint256 balanceBefore = to.balance;
    uint256 relayerFeeCap = address(vault).balance * 2;
    uint256 relayerFee = address(vault).balance + 10;

    vault.setRelayerFeeCap(relayerFeeCap);
    vault.setRate(originDomain, _rate);
    vault.setGasTokenOracle(gasTokenOracle);


    SponsorVault.Rate memory gasTokenOracleRate = SponsorVault.Rate({num: 1, den: 1});

    vm.mockCall(
      address(gasTokenOracle),
      abi.encodeWithSelector(IGasTokenOracle.getRate.selector),
      abi.encode(gasTokenOracleRate)
    );

    vm.expectCall(
      address(gasTokenOracle),
      abi.encodeWithSelector(IGasTokenOracle.getRate.selector, originDomain)
    );

    vault.reimburseRelayerFees(originDomain, payable(to), relayerFee);

    assertEq(to.balance, balanceBefore);
  }
}
