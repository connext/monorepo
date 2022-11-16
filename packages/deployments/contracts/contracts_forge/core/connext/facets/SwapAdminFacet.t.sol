// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {LibDiamond} from "../../../../contracts/core/connext/libraries/LibDiamond.sol";
import {SwapUtils} from "../../../../contracts/core/connext/libraries/SwapUtils.sol";
import {AmplificationUtils} from "../../../../contracts/core/connext/libraries/AmplificationUtils.sol";
import {LPToken} from "../../../../contracts/core/connext/helpers/LPToken.sol";

import {BaseConnextFacet} from "../../../../contracts/core/connext/facets/BaseConnextFacet.sol";
import {StableSwapFacet} from "../../../../contracts/core/connext/facets/StableSwapFacet.sol";
import {SwapAdminFacet} from "../../../../contracts/core/connext/facets/SwapAdminFacet.sol";

import "../../../utils/FacetHelper.sol";

contract SwapAdminFacetTest is SwapAdminFacet, FacetHelper {
  // ======== Test Constructor ========

  constructor() SwapAdminFacet(_originDomain) {}

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

  // StableSwapFacet used as reference contract (we are going to delegate call below).
  StableSwapFacet stableSwapFacet;

  // ============ Test set up ============
  function setUp() public {
    utils_deployAssetContracts();

    // we are on the origin domain where local != canonical
    s.domain = _originDomain;
    utils_setupAsset(false, false);
    console.log("setup asset");

    // set the owner to this contract
    setOwner(_owner);

    stableSwapFacet = new StableSwapFacet(_originDomain);

    utils_initializeSwap();
    console.log("setup swap");
    utils_addLiquidity(1 ether, 1 ether);
    console.log("setup swap funds");
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

    vm.startPrank(_owner);
    TestERC20(_local).approve(address(this), 100 ether);
    TestERC20(_adopted).approve(address(this), 100 ether);
    vm.stopPrank();

    uint8[] memory _decimals = new uint8[](2);
    _decimals[0] = 18;
    _decimals[1] = 18;

    uint256 _a = INITIAL_A_VALUE;
    uint256 _adminFee = 0;
    uint256 _fee = SWAP_FEE;

    _lpTokenTarget = new LPToken();
    _lpTokenTarget.initialize(LP_TOKEN_NAME, LP_TOKEN_SYMBOL);

    vm.prank(_owner);
    this.initializeSwap(
      _canonicalKey,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      _a,
      _fee,
      _adminFee,
      address(_lpTokenTarget)
    );

    assertEq(s.swapStorages[_canonicalKey].getVirtualPrice(), 0);
  }

  function utils_addLiquidity(uint256 amount1, uint256 amount2) public {
    vm.warp(blockTimestamp);

    uint256[] memory amounts = new uint256[](2);
    amounts[0] = amount1;
    amounts[1] = amount2;

    vm.startPrank(_owner);
    IERC20(s.swapStorages[_canonicalKey].pooledTokens[0]).approve(address(this), 100 ether);
    IERC20(s.swapStorages[_canonicalKey].pooledTokens[1]).approve(address(this), 100 ether);

    this.utils_delegatecallAddLiquidity(amounts);
    vm.stopPrank();
  }

  function utils_delegatecallAddLiquidity(uint256[] memory amounts) public {
    address(stableSwapFacet).delegatecall(
      abi.encodeWithSelector(StableSwapFacet.addSwapLiquidity.selector, _canonicalKey, amounts, 0, blockTimestamp + 10)
    );
  }

  function utils_swapExact(
    uint256 amountIn,
    address assetIn,
    address assetOut,
    uint256 minAmountOut
  ) public returns (uint256) {
    vm.warp(blockTimestamp);
    // see: StableSwapFacet.swapExact:
    return
      s.swapStorages[_canonicalKey].swap(
        s.tokenIndexes[_canonicalKey][assetIn], // see: StableSwapFacet.getSwapTokenIndex
        s.tokenIndexes[_canonicalKey][assetOut],
        amountIn,
        minAmountOut
      );
    // (bool success, bytes memory result) = address(stableSwapFacet).delegatecall(
    //   abi.encodeWithSelector(
    //     StableSwapFacet.swapExact.selector,
    //     _canonicalKey,
    //     amountIn,
    //     assetIn,
    //     assetOut,
    //     minAmountOut,
    //     blockTimestamp + 10
    //   )
    // );
    // require(success, "swapExact failed");
    // return uint256(bytes32(result));
  }

  function utils_getSwapAdminBalance(bytes32 canonicalKey, uint256 x) public returns (uint256) {
    (bool success, bytes memory result) = address(stableSwapFacet).delegatecall(
      abi.encodeWithSelector(StableSwapFacet.getSwapAdminBalance.selector, canonicalKey, x)
    );
    // TODO: Would be great to elevate `result` as the error itself.
    require(success, "getSwapAdminBalance failed");
    return uint256(bytes32(result));
  }

  function utils_getSwapStorage(bytes32 canonicalKey) internal returns (SwapUtils.Swap storage) {
    // See: StableSwapFacet.getSwapStorage:
    return s.swapStorages[canonicalKey];
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

    this.initializeSwap(
      key,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A_VALUE,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
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

    this.initializeSwap(
      key,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A_VALUE,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
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
      0,
      address(_lpTokenTarget)
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

    this.initializeSwap(
      key,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A_VALUE,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
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

    this.initializeSwap(
      key,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A_VALUE,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
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

    this.initializeSwap(
      key,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      AmplificationUtils.MAX_A,
      SWAP_FEE,
      0,
      address(_lpTokenTarget)
    );
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
      AmplificationUtils.MAX_A - 1,
      SwapUtils.MAX_SWAP_FEE,
      SwapUtils.MAX_ADMIN_FEE - 1,
      address(_lpTokenTarget)
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
      AmplificationUtils.MAX_A - 1,
      SwapUtils.MAX_SWAP_FEE - 1,
      SwapUtils.MAX_ADMIN_FEE,
      address(_lpTokenTarget)
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
      precisionMultipliers[i] = 10**uint256(SwapUtils.POOL_PRECISION_DECIMALS - _decimals[i]);
      s.tokenIndexes[_canonicalId][address(_pooledTokens[i])] = i;
    }

    vm.expectEmit(true, true, true, true);
    emit SwapInitialized(
      key,
      SwapUtils.Swap({
        key: key,
        initialA: a * AmplificationUtils.A_PRECISION,
        futureA: a * AmplificationUtils.A_PRECISION,
        swapFee: fee,
        adminFee: adminFee,
        lpToken: LPToken(address(0xbfFb01bB2DDb4EfA87cB78EeCB8115AFAe6d2032)),
        pooledTokens: _pooledTokens,
        tokenPrecisionMultipliers: precisionMultipliers,
        balances: new uint256[](_pooledTokens.length),
        adminFees: new uint256[](_pooledTokens.length),
        initialATime: 0,
        futureATime: 0
      }),
      _owner
    );

    vm.prank(_owner);
    this.initializeSwap(
      key,
      _pooledTokens,
      _decimals,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      a,
      fee,
      adminFee,
      address(_lpTokenTarget)
    );

    assertEq(s.swapStorages[key].initialA, a * AmplificationUtils.A_PRECISION);
    assertEq(s.swapStorages[key].futureA, a * AmplificationUtils.A_PRECISION);
    assertEq(s.swapStorages[key].swapFee, fee);
    assertEq(s.swapStorages[key].adminFee, adminFee);
    assertEq(address(s.swapStorages[key].pooledTokens[0]), address(_pooledTokens[0]));
    assertEq(s.swapStorages[key].balances[0], 0);
  }

  // function test_SwapAdminFacet__withdrawSwapAdminFees
  function test_SwapAdminFacet__withdrawSwapAdminFees_failIfNotOwner() public {
    assertTrue(_owner != address(1));

    vm.prank(address(1));
    vm.expectRevert(BaseConnextFacet.BaseConnextFacet__onlyOwnerOrAdmin_notOwnerOrAdmin.selector);

    this.withdrawSwapAdminFees(_canonicalKey);
  }

  function test_SwapAdminFacet__withdrawSwapAdminFees_successIfNoFees() public {
    vm.startPrank(_owner);
    this.setSwapAdminFee(_canonicalKey, 1e8);

    uint256 beforeBalance0 = IERC20(_local).balanceOf(_owner);
    uint256 beforeBalance1 = IERC20(_adopted).balanceOf(_owner);

    this.withdrawSwapAdminFees(_canonicalKey);

    assertEq(IERC20(_local).balanceOf(_owner), beforeBalance0);
    assertEq(IERC20(_adopted).balanceOf(_owner), beforeBalance1);

    vm.stopPrank();
  }

  function test_SwapAdminFacet__withdrawSwapAdminFees_shouldWorkWithExpectedAmount() public {
    vm.prank(_owner);
    this.setSwapAdminFee(_canonicalKey, 1e8);

    vm.startPrank(_user1);
    this.utils_swapExact(1e17, _local, _adopted, 0);
    this.utils_swapExact(1e17, _adopted, _local, 0);
    vm.stopPrank();

    vm.startPrank(_owner);

    assertEq(utils_getSwapAdminBalance(_canonicalKey, 0), 1001973776101);
    assertEq(utils_getSwapAdminBalance(_canonicalKey, 1), 998024139765);

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
    this.setSwapAdminFee(_canonicalKey, SwapUtils.MAX_ADMIN_FEE);
    assertEq(utils_getSwapStorage(_canonicalKey).adminFee, SwapUtils.MAX_ADMIN_FEE);

    vm.expectRevert("too high");
    this.setSwapAdminFee(_canonicalKey, SwapUtils.MAX_ADMIN_FEE + 1);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__setSwapAdminFee_shouldWork() public {
    vm.startPrank(_owner);
    uint256 adminFee = SwapUtils.MAX_ADMIN_FEE;
    vm.expectEmit(true, true, true, true);
    emit AdminFeesSet(_canonicalKey, adminFee, _owner);
    this.setSwapAdminFee(_canonicalKey, adminFee);
    assertEq(utils_getSwapStorage(_canonicalKey).adminFee, adminFee);
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
    this.setSwapFee(_canonicalKey, SwapUtils.MAX_SWAP_FEE);
    assertEq(utils_getSwapStorage(_canonicalKey).swapFee, SwapUtils.MAX_SWAP_FEE);

    vm.expectRevert("too high");
    this.setSwapFee(_canonicalKey, SwapUtils.MAX_SWAP_FEE + 1);
    vm.stopPrank();
  }

  function test_SwapAdminFacet__setSwapFee_shouldWork() public {
    vm.startPrank(_owner);
    uint256 swapFee = SwapUtils.MAX_SWAP_FEE;
    vm.expectEmit(true, true, true, true);
    emit SwapFeesSet(_canonicalKey, swapFee, _owner);
    this.setSwapFee(_canonicalKey, swapFee);
    assertEq(utils_getSwapStorage(_canonicalKey).swapFee, swapFee);
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

    SwapUtils.Swap storage swap = utils_getSwapStorage(_canonicalKey);

    // +0 seconds since ramp A
    assertEq(swap.getA(), INITIAL_A_VALUE);
    assertEq(swap.getAPrecise(), INITIAL_A_VALUE * AmplificationUtils.A_PRECISION);
    assertEq(swap.getVirtualPrice(), 1000167146429976812);

    // set timestamp to +100000 seconds
    vm.warp(blockTimestamp + 100000);
    assertEq(swap.getA(), 54);
    assertEq(swap.getAPrecise(), 5413);
    assertEq(swap.getVirtualPrice(), 1000258443200230795);

    // set timestamp to the end of ramp period
    vm.warp(endTimestamp);
    assertEq(swap.getA(), 100);
    assertEq(swap.getAPrecise(), 10000);
    assertEq(swap.getVirtualPrice(), 1000771363829404568);

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

    SwapUtils.Swap storage swap = utils_getSwapStorage(_canonicalKey);

    // +0 seconds since ramp A
    assertEq(swap.getA(), INITIAL_A_VALUE);
    assertEq(swap.getAPrecise(), INITIAL_A_VALUE * AmplificationUtils.A_PRECISION);
    assertEq(swap.getVirtualPrice(), 1000167146429976812);

    // set timestamp to +100000 seconds
    vm.warp(blockTimestamp + 100000);
    assertEq(swap.getA(), 47);
    assertEq(swap.getAPrecise(), 4793);
    assertEq(swap.getVirtualPrice(), 1000115610744866006);

    // set timestamp to the end of ramp period
    vm.warp(endTimestamp);
    assertEq(swap.getA(), 25);
    assertEq(swap.getAPrecise(), 2500);
    assertEq(swap.getVirtualPrice(), 998999574522334973);

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

    uint256 currentTimestamp = blockTimestamp + 100000;
    vm.warp(currentTimestamp);
    vm.expectEmit(true, true, true, true);
    emit RampAStopped(_canonicalKey, _owner);
    this.stopRampA(_canonicalKey);

    SwapUtils.Swap storage swap = utils_getSwapStorage(_canonicalKey);

    assertEq(swap.initialA, 5413);
    assertEq(swap.futureA, 5413);
    assertEq(swap.initialATime, currentTimestamp);
    assertEq(swap.futureATime, currentTimestamp);

    vm.stopPrank();
  }
}
