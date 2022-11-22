// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {SwapUtils} from "../../../../contracts/core/connext/libraries/SwapUtils.sol";
import {Constants} from "../../../../contracts/core/connext/libraries/Constants.sol";
import {AmplificationUtils} from "../../../../contracts/core/connext/libraries/AmplificationUtils.sol";
import {LPToken} from "../../../../contracts/core/connext/helpers/LPToken.sol";

import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {StableSwapFacet} from "../../../../contracts/core/connext/facets/StableSwapFacet.sol";
import {SwapAdminFacet} from "../../../../contracts/core/connext/facets/SwapAdminFacet.sol";

import "../../../utils/FacetHelper.sol";

contract SwapAdminFacetTest is SwapAdminFacet, StableSwapFacet, FacetHelper {
  // ============ Libraries ============
  using SwapUtils for SwapUtils.Swap;
  using AmplificationUtils for SwapUtils.Swap;

  // ============ Storage ============

  // owner
  address _owner = address(1234);
  address _user1 = address(1);
  address _user2 = address(2);
  LPToken _lpTokenTarget;

  // TODO: Should initialize StableSwapFacet separately instead of inheriting here.
  // address _stableSwapFacet;

  // Test Values
  uint256 INITIAL_A_VALUE = 50;
  uint256 SWAP_FEE = 1e7;
  string LP_TOKEN_NAME = "Test LP Token Name";
  string LP_TOKEN_SYMBOL = "TESTLP";
  uint256 blockTimestamp = 2 days;

  // ============ Test set up ============
  function setUp() public {
    utils_deployAssetContracts();

    // we are on the origin domain where local != canonical
    s.domain = _originDomain;
    utils_setupAsset(false, false);

    // set the owner to this contract
    setOwner(_owner);

    // set lpTokenTargetAddress
    _lpTokenTarget = new LPToken();
    _lpTokenTarget.initialize(LP_TOKEN_NAME, LP_TOKEN_SYMBOL);
    s.lpTokenTargetAddress = address(_lpTokenTarget);

    // _stableSwapFacet = address(new StableSwapFacet());

    utils_initializeSwap();
    utils_addLiquidity(1 ether, 1 ether);
  }

  // ============ Utils ==============
  function setOwner(address owner) internal {
    // set owner
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.contractOwner = owner;
  }

  function utils_initializeSwap() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(_local);
    _pooledTokens[1] = IERC20(_adopted);

    // Mint Token0, Token1 to Owner, User1, User2
    TestERC20(_local).mint(_owner, 100 ether);
    TestERC20(_adopted).mint(_owner, 100 ether);

    TestERC20(_local).mint(_user1, 100 ether);
    TestERC20(_adopted).mint(_user1, 100 ether);

    TestERC20(_local).mint(_user2, 100 ether);
    TestERC20(_adopted).mint(_user2, 100 ether);

    // Approve Token0, Token1 from User1, User2
    vm.startPrank(_user1);
    TestERC20(_local).approve(address(this), 100 ether);
    TestERC20(_adopted).approve(address(this), 100 ether);
    vm.stopPrank();

    vm.startPrank(_user2);
    TestERC20(_local).approve(address(this), 100 ether);
    TestERC20(_adopted).approve(address(this), 100 ether);
    vm.stopPrank();

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    uint256 _a = INITIAL_A_VALUE;
    uint256 _adminFee = 0;
    uint256 _fee = SWAP_FEE;

    vm.startPrank(_owner);
    this.initializeSwap(_canonicalKey, _pooledTokens, _decimals, LP_TOKEN_NAME, LP_TOKEN_SYMBOL, _a, _fee, _adminFee);
    vm.stopPrank();

    assertEq(this.getSwapVirtualPrice(_canonicalKey), 0);
  }

  function utils_addLiquidity(uint256 amount1, uint256 amount2) public {
    vm.warp(blockTimestamp);

    uint256[] memory amounts = new uint256[](2);
    amounts[0] = amount1;
    amounts[1] = amount2;

    vm.startPrank(_owner);
    IERC20(s.swapStorages[_canonicalKey].pooledTokens[0]).approve(address(this), 100 ether);
    IERC20(s.swapStorages[_canonicalKey].pooledTokens[1]).approve(address(this), 100 ether);

    this.addSwapLiquidity(_canonicalKey, amounts, 0, blockTimestamp + 10);
    vm.stopPrank();
  }

  function utils_swapExact(
    uint256 amountIn,
    address assetIn,
    address assetOut,
    uint256 minAmountOut
  ) public returns (uint256) {
    vm.warp(blockTimestamp);
    return this.swapExact(_canonicalKey, amountIn, assetIn, assetOut, minAmountOut, blockTimestamp + 10);
  }

  function utils_removeAllLiquidity() public {
    address swapToken = this.getSwapLPToken(_canonicalKey);
    uint256 totalSupply = IERC20(swapToken).totalSupply();

    uint256[] memory expectedAmounts = new uint256[](2);
    expectedAmounts = this.calculateRemoveSwapLiquidity(_canonicalKey, totalSupply);

    IERC20(swapToken).approve(address(this), totalSupply);

    this.removeSwapLiquidity(_canonicalKey, totalSupply, expectedAmounts, blockTimestamp + 1);
  }

  // =========== Admin Functions ============
  function test_SwapAdminFacet__initializeSwap_failIfNotOwner() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20("Test Token", "TEST"));
    _pooledTokens[1] = IERC20(new TestERC20("Test Token", "TEST"));

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));
    bytes32 key = keccak256(abi.encode(canonicalId, _canonicalDomain));

    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.initializeSwap(key, _pooledTokens, _decimals, LP_TOKEN_NAME, LP_TOKEN_SYMBOL, INITIAL_A_VALUE, SWAP_FEE, 0);
  }

  function test_SwapAdminFacet__initializeSwap_failIfDuplicatedTokens() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20("Test Token", "TEST"));
    _pooledTokens[1] = _pooledTokens[0];

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));
    bytes32 key = keccak256(abi.encode(canonicalId, _canonicalDomain));

    vm.prank(_owner);
    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__initializeSwap_duplicateTokens.selector);

    this.initializeSwap(key, _pooledTokens, _decimals, LP_TOKEN_NAME, LP_TOKEN_SYMBOL, INITIAL_A_VALUE, SWAP_FEE, 0);
  }

  function test_SwapAdminFacet__initializeSwap_failIfAlreadyInitialized() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20("Test Token", "TEST"));
    _pooledTokens[1] = IERC20(new TestERC20("Test Token", "TEST"));

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    vm.prank(_owner);
    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__initializeSwap_alreadyInitialized.selector);

    this.initializeSwap(
      _canonicalKey,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A_VALUE,
      SWAP_FEE,
      0
    );
  }

  function test_SwapAdminFacet__initializeSwap_failIfDecimalsMismatch() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20("Test Token", "TEST"));
    _pooledTokens[1] = IERC20(new TestERC20("Test Token", "TEST"));

    uint8[] memory _decimals = new uint8[](1);
    _decimals[0] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));
    bytes32 key = keccak256(abi.encode(canonicalId, _canonicalDomain));

    vm.prank(_owner);
    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__initializeSwap_decimalsMismatch.selector);

    this.initializeSwap(key, _pooledTokens, _decimals, LP_TOKEN_NAME, LP_TOKEN_SYMBOL, INITIAL_A_VALUE, SWAP_FEE, 0);
  }

  function test_SwapAdminFacet__initializeSwap_failIfZeroTokenAddress() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20("Test Token", "TEST"));
    _pooledTokens[1] = IERC20(address(0));

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));
    bytes32 key = keccak256(abi.encode(canonicalId, _canonicalDomain));

    vm.prank(_owner);
    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__initializeSwap_zeroTokenAddress.selector);

    this.initializeSwap(key, _pooledTokens, _decimals, LP_TOKEN_NAME, LP_TOKEN_SYMBOL, INITIAL_A_VALUE, SWAP_FEE, 0);
  }

  function test_SwapAdminFacet__initializeSwap_failIfAExceedMax() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20("Test Token", "TEST"));
    _pooledTokens[1] = IERC20(new TestERC20("Test Token", "TEST"));

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));
    bytes32 key = keccak256(abi.encode(canonicalId, _canonicalDomain));

    vm.prank(_owner);
    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__initializeSwap_aExceedMax.selector);

    this.initializeSwap(key, _pooledTokens, _decimals, LP_TOKEN_NAME, LP_TOKEN_SYMBOL, Constants.MAX_A, SWAP_FEE, 0);
  }

  function test_SwapAdminFacet__initializeSwap_failIfFeeExceedMax() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20("Test Token", "TEST"));
    _pooledTokens[1] = IERC20(new TestERC20("Test Token", "TEST"));

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));
    bytes32 key = keccak256(abi.encode(canonicalId, _canonicalDomain));

    vm.prank(_owner);
    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__initializeSwap_feeExceedMax.selector);

    this.initializeSwap(
      key,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      Constants.MAX_A - 1,
      Constants.MAX_SWAP_FEE,
      Constants.MAX_ADMIN_FEE - 1
    );
  }

  function test_SwapAdminFacet__initializeSwap_failIfAdminFeeExceedMax() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20("Test Token", "TEST"));
    _pooledTokens[1] = IERC20(new TestERC20("Test Token", "TEST"));

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));
    bytes32 key = keccak256(abi.encode(canonicalId, _canonicalDomain));

    vm.prank(_owner);
    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__initializeSwap_adminFeeExceedMax.selector);

    this.initializeSwap(
      key,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      Constants.MAX_A - 1,
      Constants.MAX_SWAP_FEE - 1,
      Constants.MAX_ADMIN_FEE
    );
  }

  function test_SwapAdminFacet__initializeSwap_shouldWork() public {
    IERC20[] memory _pooledTokens = new IERC20[](2);
    _pooledTokens[0] = IERC20(new TestERC20("Test Token", "TEST"));
    _pooledTokens[1] = IERC20(new TestERC20("Test Token", "TEST"));

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    uint256 a = INITIAL_A_VALUE;
    uint256 adminFee = 0;
    uint256 fee = SWAP_FEE;

    address token;

    bytes32 canonicalId = bytes32(abi.encodePacked(address(_pooledTokens[0])));
    bytes32 key = keccak256(abi.encode(canonicalId, _canonicalDomain));

    uint256[] memory precisionMultipliers = new uint256[](_pooledTokens.length);
    for (uint8 i = 0; i < _pooledTokens.length; i++) {
      precisionMultipliers[i] = 10**uint256(Constants.POOL_PRECISION_DECIMALS - _decimals[i]);
      s.tokenIndexes[_canonicalId][address(_pooledTokens[i])] = i;
    }

    vm.expectEmit(true, true, true, true);
    emit SwapInitialized(
      key,
      SwapUtils.Swap({
        key: key,
        initialA: a * Constants.A_PRECISION,
        futureA: a * Constants.A_PRECISION,
        swapFee: fee,
        adminFee: adminFee,
        lpToken: LPToken(addressFrom(address(this), vm.getNonce(address(this)))),
        pooledTokens: _pooledTokens,
        tokenPrecisionMultipliers: precisionMultipliers,
        balances: new uint256[](_pooledTokens.length),
        adminFees: new uint256[](_pooledTokens.length),
        initialATime: 0,
        futureATime: 0,
        disabled: false,
        removeTime: 0
      }),
      _owner
    );

    vm.prank(_owner);
    this.initializeSwap(key, _pooledTokens, _decimals, LP_TOKEN_NAME, LP_TOKEN_SYMBOL, a, fee, adminFee);

    assertEq(s.swapStorages[key].initialA, a * Constants.A_PRECISION);
    assertEq(s.swapStorages[key].futureA, a * Constants.A_PRECISION);
    assertEq(s.swapStorages[key].swapFee, fee);
    assertEq(s.swapStorages[key].adminFee, adminFee);
    assertEq(address(s.swapStorages[key].pooledTokens[0]), address(_pooledTokens[0]));
    assertEq(s.swapStorages[key].balances[0], 0);
  }

  // function test_SwapAdminFacet__disableSwap
  function test_SwapAdminFacet__disableSwap_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.disableSwap(_canonicalKey);
  }

  function test_SwapAdminFacet__disableSwap_failIfNotInitialized() public {
    vm.startPrank(_owner);

    bytes32 canonicalId = bytes32(abi.encodePacked(address(0)));
    bytes32 key = keccak256(abi.encode(canonicalId, _canonicalDomain));

    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__disableSwap_notInitialized.selector);

    this.disableSwap(key);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__disableSwap_failIfAlreadyDisabled() public {
    vm.startPrank(_owner);

    this.disableSwap(_canonicalKey);

    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__disableSwap_alreadyDisabled.selector);

    this.disableSwap(_canonicalKey);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__disableSwap_shouldWork() public {
    vm.startPrank(_owner);

    vm.expectEmit(true, false, false, true);
    emit SwapDisabled(_canonicalKey, _owner);

    this.disableSwap(_canonicalKey);

    assertEq(s.swapStorages[_canonicalKey].disabled, true);
    assertEq(s.swapStorages[_canonicalKey].removeTime, block.timestamp + Constants.REMOVE_DELAY);

    vm.stopPrank();
  }

  // function test_SwapAdminFacet__removeSwap
  function test_SwapAdminFacet__removeSwap_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.removeSwap(_canonicalKey);
  }

  function test_SwapAdminFacet__removeSwap_failIfNotInitialized() public {
    vm.startPrank(_owner);

    bytes32 canonicalId = bytes32(abi.encodePacked(address(0)));
    bytes32 key = keccak256(abi.encode(canonicalId, _canonicalDomain));

    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__removeSwap_notInitialized.selector);

    this.removeSwap(key);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__removeSwap_failedIfNotDisabled() public {
    vm.startPrank(_owner);

    assertEq(this.isDisabled(_canonicalKey), false);

    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__removeSwap_notDisabledPool.selector);
    this.removeSwap(_canonicalKey);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__removeSwap_failedIfDisabledButNotElapsed() public {
    vm.startPrank(_owner);

    this.disableSwap(_canonicalKey);
    assertEq(this.isDisabled(_canonicalKey), true);
    assertEq(s.swapStorages[_canonicalKey].removeTime, block.timestamp + Constants.REMOVE_DELAY);

    vm.expectRevert(SwapAdminFacet.SwapAdminFacet__removeSwap_delayNotElapsed.selector);
    this.removeSwap(_canonicalKey);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__removeSwap_shouldWorkIfNotZeroBalance() public {
    vm.startPrank(_owner);

    uint256 currentBlockTimestamp = block.timestamp;

    this.disableSwap(_canonicalKey);
    assertEq(this.isDisabled(_canonicalKey), true);
    assertEq(s.swapStorages[_canonicalKey].removeTime, currentBlockTimestamp + Constants.REMOVE_DELAY);

    vm.warp(currentBlockTimestamp + Constants.REMOVE_DELAY + 1);

    vm.expectEmit(true, true, true, true);
    emit AdminFeesWithdrawn(_canonicalKey, _owner);

    vm.expectEmit(true, false, false, true);
    emit SwapRemoved(_canonicalKey, _owner);

    this.removeSwap(_canonicalKey);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__removeSwap_shouldWork() public {
    vm.startPrank(_owner);
    utils_removeAllLiquidity();

    this.disableSwap(_canonicalKey);

    vm.expectEmit(true, false, false, true);
    emit SwapRemoved(_canonicalKey, _owner);

    vm.warp(block.timestamp + Constants.REMOVE_DELAY + 1);
    this.removeSwap(_canonicalKey);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__removeSwap_shouldWorkWithAdminFee() public {
    vm.startPrank(_owner);

    this.setSwapAdminFee(_canonicalKey, 1e8);
    utils_swapExact(1e17, _local, _adopted, 0);
    utils_swapExact(1e17, _adopted, _local, 0);

    assertEq(this.getSwapAdminBalance(_canonicalKey, 0), 1001973776101);
    assertEq(this.getSwapAdminBalance(_canonicalKey, 1), 998024139765);

    uint256 beforeBalance0 = IERC20(_local).balanceOf(_owner);
    uint256 beforeBalance1 = IERC20(_adopted).balanceOf(_owner);

    utils_removeAllLiquidity();

    this.disableSwap(_canonicalKey);
    vm.warp(block.timestamp + Constants.REMOVE_DELAY + 1);

    vm.expectEmit(true, true, true, true);
    emit AdminFeesWithdrawn(_canonicalKey, _owner);

    vm.expectEmit(true, false, false, true);
    emit SwapRemoved(_canonicalKey, _owner);

    this.removeSwap(_canonicalKey);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__removeSwap_shouldDeleteNestedArrays() public {
    vm.startPrank(_owner);

    this.setSwapAdminFee(_canonicalKey, 1e8);
    utils_swapExact(1e17, _local, _adopted, 0);
    utils_swapExact(1e17, _adopted, _local, 0);

    IERC20[] memory pooledTokens = s.swapStorages[_canonicalKey].pooledTokens;

    utils_removeAllLiquidity();

    this.disableSwap(_canonicalKey);
    vm.warp(block.timestamp + Constants.REMOVE_DELAY + 1);

    vm.expectEmit(true, false, false, true);
    emit SwapRemoved(_canonicalKey, _owner);

    this.removeSwap(_canonicalKey);

    assert(s.tokenIndexes[_canonicalKey][address(pooledTokens[0])] == 0);
    assert(s.tokenIndexes[_canonicalKey][address(pooledTokens[1])] == 0);

    SwapUtils.Swap memory entry = SwapUtils.Swap({
      key: _canonicalKey,
      initialA: 0,
      futureA: 0,
      swapFee: 0,
      adminFee: 0,
      lpToken: LPToken(address(0)),
      pooledTokens: new IERC20[](2),
      tokenPrecisionMultipliers: new uint256[](2),
      balances: new uint256[](2),
      adminFees: new uint256[](2),
      initialATime: 0,
      futureATime: 0,
      disabled: false,
      removeTime: 0
    });
    s.swapStorages[_canonicalKey] = entry;

    assert(address(s.swapStorages[_canonicalKey].pooledTokens[0]) == address(0));
    assert(address(s.swapStorages[_canonicalKey].pooledTokens[1]) == address(0));
    assert(s.swapStorages[_canonicalKey].balances[0] == 0);
    assert(s.swapStorages[_canonicalKey].balances[1] == 0);

    vm.stopPrank();
  }

  // function test_SwapAdminFacet__withdrawSwapAdminFees
  function test_SwapAdminFacet__withdrawSwapAdminFess_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.withdrawSwapAdminFees(_canonicalKey);
  }

  function test_SwapAdminFacet__withdrawSwapAdminFess_successIfNoFees() public {
    vm.startPrank(_owner);
    this.setSwapAdminFee(_canonicalKey, 1e8);

    uint256 beforeBalance0 = IERC20(_local).balanceOf(_owner);
    uint256 beforeBalance1 = IERC20(_adopted).balanceOf(_owner);

    this.withdrawSwapAdminFees(_canonicalKey);

    assertEq(IERC20(_local).balanceOf(_owner), beforeBalance0);
    assertEq(IERC20(_adopted).balanceOf(_owner), beforeBalance1);

    vm.stopPrank();
  }

  function test_SwapAdminFacet__withdrawSwapAdminFess_shouldWorkWithExpectedAmount() public {
    vm.startPrank(_owner);
    this.setSwapAdminFee(_canonicalKey, 1e8);
    utils_swapExact(1e17, _local, _adopted, 0);
    utils_swapExact(1e17, _adopted, _local, 0);

    assertEq(this.getSwapAdminBalance(_canonicalKey, 0), 1001973776101);
    assertEq(this.getSwapAdminBalance(_canonicalKey, 1), 998024139765);

    uint256 beforeBalance0 = IERC20(_local).balanceOf(_owner);
    uint256 beforeBalance1 = IERC20(_adopted).balanceOf(_owner);

    vm.expectEmit(true, true, true, true);
    emit AdminFeesWithdrawn(_canonicalKey, _owner);

    this.withdrawSwapAdminFees(_canonicalKey);

    assertEq(IERC20(_local).balanceOf(_owner), beforeBalance0 + 1001973776101);
    assertEq(IERC20(_adopted).balanceOf(_owner), beforeBalance1 + 998024139765);
    vm.stopPrank();
  }

  // function test_SwapAdminFacet__setSwapAdminFee
  function test_SwapAdminFacet__setSwapAdminFee_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.setSwapAdminFee(_canonicalKey, 1e8);
  }

  function test_SwapAdminFacet__setSwapAdminFee_failIfHigherThanLimit() public {
    vm.startPrank(_owner);
    this.setSwapAdminFee(_canonicalKey, Constants.MAX_ADMIN_FEE);
    assertEq(this.getSwapStorage(_canonicalKey).adminFee, Constants.MAX_ADMIN_FEE);

    vm.expectRevert("too high");
    this.setSwapAdminFee(_canonicalKey, Constants.MAX_ADMIN_FEE + 1);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__setSwapAdminFee_shouldWork() public {
    vm.startPrank(_owner);
    uint256 adminFee = Constants.MAX_ADMIN_FEE;
    vm.expectEmit(true, true, true, true);
    emit AdminFeesSet(_canonicalKey, adminFee, _owner);
    this.setSwapAdminFee(_canonicalKey, adminFee);
    assertEq(this.getSwapStorage(_canonicalKey).adminFee, adminFee);
    vm.stopPrank();
  }

  // function test_SwapAdminFacet__setSwapFee
  function test_SwapAdminFacet__setSwapFee_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.setSwapFee(_canonicalKey, 1e8);
  }

  function test_SwapAdminFacet__setSwapFee_failIfHigherThanLimit() public {
    vm.startPrank(_owner);
    this.setSwapFee(_canonicalKey, Constants.MAX_SWAP_FEE);
    assertEq(this.getSwapStorage(_canonicalKey).swapFee, Constants.MAX_SWAP_FEE);

    vm.expectRevert("too high");
    this.setSwapFee(_canonicalKey, Constants.MAX_SWAP_FEE + 1);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__setSwapFee_shouldWork() public {
    vm.startPrank(_owner);
    uint256 swapFee = Constants.MAX_SWAP_FEE;
    vm.expectEmit(true, true, true, true);
    emit SwapFeesSet(_canonicalKey, swapFee, _owner);
    this.setSwapFee(_canonicalKey, swapFee);
    assertEq(this.getSwapStorage(_canonicalKey).swapFee, swapFee);
    vm.stopPrank();
  }

  // function test_SwapAdminFacet__rampA
  function test_SwapAdminFacet__rampA_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.rampA(_canonicalKey, 100, blockTimestamp + 14 days + 1);
  }

  function test_SwapAdminFacet__rampA_shouldWorkWithUpwards() public {
    // Create imbalanced pool to measure virtual price change
    // We expect virtual price to increase as A decreases
    utils_addLiquidity(1 ether, 0);

    vm.startPrank(_owner);

    uint256 endTimestamp = blockTimestamp + 14 days + 1;

    vm.expectEmit(true, true, true, true);
    emit RampAStarted(_canonicalKey, 100, endTimestamp, _owner);
    this.rampA(_canonicalKey, 100, endTimestamp);

    // +0 seconds since ramp A
    assertEq(this.getSwapA(_canonicalKey), INITIAL_A_VALUE);
    assertEq(this.getSwapAPrecise(_canonicalKey), INITIAL_A_VALUE * Constants.A_PRECISION);
    assertEq(this.getSwapVirtualPrice(_canonicalKey), 1000167146429977312);

    // set timestamp to +100000 seconds
    vm.warp(blockTimestamp + 100000);
    assertEq(this.getSwapA(_canonicalKey), 54);
    assertEq(this.getSwapAPrecise(_canonicalKey), 5413);
    assertEq(this.getSwapVirtualPrice(_canonicalKey), 1000258443200231295);

    // set timestamp to the end of ramp period
    vm.warp(endTimestamp);
    assertEq(this.getSwapA(_canonicalKey), 100);
    assertEq(this.getSwapAPrecise(_canonicalKey), 10000);
    assertEq(this.getSwapVirtualPrice(_canonicalKey), 1000771363829405068);

    vm.stopPrank();
  }

  function test_SwapAdminFacet__rampA_shouldWorkWithDownwards() public {
    // Create imbalanced pool to measure virtual price change
    // We expect virtual price to increase as A decreases
    utils_addLiquidity(1 ether, 0);

    vm.startPrank(_owner);

    uint256 endTimestamp = blockTimestamp + 14 days + 1;
    vm.expectEmit(true, true, true, true);
    emit RampAStarted(_canonicalKey, 25, endTimestamp, _owner);
    this.rampA(_canonicalKey, 25, endTimestamp);

    // +0 seconds since ramp A
    assertEq(this.getSwapA(_canonicalKey), INITIAL_A_VALUE);
    assertEq(this.getSwapAPrecise(_canonicalKey), INITIAL_A_VALUE * Constants.A_PRECISION);
    assertEq(this.getSwapVirtualPrice(_canonicalKey), 1000167146429977312);

    // set timestamp to +100000 seconds
    vm.warp(blockTimestamp + 100000);
    assertEq(this.getSwapA(_canonicalKey), 47);
    assertEq(this.getSwapAPrecise(_canonicalKey), 4793);
    assertEq(this.getSwapVirtualPrice(_canonicalKey), 1000115610744866506);

    // set timestamp to the end of ramp period
    vm.warp(endTimestamp);
    assertEq(this.getSwapA(_canonicalKey), 25);
    assertEq(this.getSwapAPrecise(_canonicalKey), 2500);
    assertEq(this.getSwapVirtualPrice(_canonicalKey), 998999574522335473);

    vm.stopPrank();
  }

  // function test_SwapAdminFacet__stopRampA
  function test_SwapAdminFacet__stopRampA_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.stopRampA(_canonicalKey);
  }

  function test_SwapAdminFacet__stopRampA_shouldWork() public {
    vm.startPrank(_owner);
    uint256 endTimestamp = blockTimestamp + 14 days + 1;
    this.rampA(_canonicalKey, 100, endTimestamp);

    uint256 currentTimestmp = blockTimestamp + 100000;
    vm.warp(currentTimestmp);
    vm.expectEmit(true, true, true, true);
    emit RampAStopped(_canonicalKey, _owner);
    this.stopRampA(_canonicalKey);

    assertEq(this.getSwapStorage(_canonicalKey).initialA, 5413);
    assertEq(this.getSwapStorage(_canonicalKey).futureA, 5413);
    assertEq(this.getSwapStorage(_canonicalKey).initialATime, currentTimestmp);
    assertEq(this.getSwapStorage(_canonicalKey).futureATime, currentTimestmp);

    vm.stopPrank();
  }
}
