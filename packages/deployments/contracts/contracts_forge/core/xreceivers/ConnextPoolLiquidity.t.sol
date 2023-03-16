// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ConnextPoolLiquidity} from "../../../contracts/core/xreceivers/ConnextPoolLiquidity.sol";
import {IConnext} from "../../../contracts/core/connext/interfaces/IConnext.sol";
import {SwapUtils} from "../../../contracts/core/connext/libraries/SwapUtils.sol";
import {LPToken} from "../../../contracts/core/connext/helpers/LPToken.sol";

import "../../utils/ForgeHelper.sol";

contract ConnextPoolLiquidityTest is ForgeHelper {
  // ============ Storage ============
  address constant MOCK_CONNEXT = address(999999);
  address MOCK_WRAPPER = address(888888);
  address constant MOCK_ERC20 = address(777777);
  address constant MOCK_nextERC20 = address(777778);
  address constant OWNER = address(666666);
  address constant MOCK_LP_TOKEN = address(555555);
  bytes32 constant KEY = bytes32("key");
  bytes32 constant CANONICAL_ID = bytes32("canonicalId");

  uint256 INITIAL_A_VALUE = 50;
  uint256 SWAP_FEE = 1e7;
  string LP_TOKEN_NAME = "Test LP Token Name";
  string LP_TOKEN_SYMBOL = "TESTLP";
  uint256 blockTimestamp = 2 days;

  IERC20[] pooledTokens = [IERC20(MOCK_ERC20), IERC20(MOCK_nextERC20)];
  uint256[] tokenMults = [uint256(1), uint256(1)];
  uint256[] balances = [uint256(0), uint256(0)];
  uint256[] adminFees = [uint256(0), uint256(0)];

  SwapUtils.Swap MOCK_SWAP =
    SwapUtils.Swap({
      key: KEY,
      initialA: INITIAL_A_VALUE,
      futureA: INITIAL_A_VALUE,
      initialATime: blockTimestamp,
      futureATime: blockTimestamp,
      swapFee: SWAP_FEE,
      adminFee: 0,
      lpToken: LPToken(MOCK_LP_TOKEN),
      pooledTokens: pooledTokens,
      tokenPrecisionMultipliers: tokenMults,
      balances: balances,
      adminFees: adminFees,
      disabled: false,
      removeTime: 0
    });

  // Arguments in tested methods.
  address constant originSender = address(111111);
  address constant recipient = address(222222);

  // Unused arguments in tested methods.
  bytes32 constant transferId = bytes32("");
  uint32 constant origin = 123456;

  // Tested contract.
  ConnextPoolLiquidity connextPoolLiquidity;

  // ============ Test set up ============
  function setUp() public {
    vm.prank(OWNER);
    connextPoolLiquidity = new ConnextPoolLiquidity(MOCK_CONNEXT);
    assertEq(address(connextPoolLiquidity.connext()), MOCK_CONNEXT);

    vm.label(MOCK_CONNEXT, "Connext");
    vm.label(MOCK_WRAPPER, "Wrapper");
    vm.label(MOCK_ERC20, "ERC20");
    vm.label(OWNER, "owner");
    vm.label(originSender, "originSender");
    vm.label(recipient, "recipient");
    vm.label(address(connextPoolLiquidity), "ConnextPoolLiquidity");
  }

  // ============ ConnextPoolLiquidity.xReceive ============
  function test_ConnextPoolLiquidity__xReceive_works(uint256 amount) public {
    vm.assume(amount > 0);

    address asset = MOCK_ERC20;
    bytes memory callData = abi.encode(recipient);
    bytes memory canonicalId = abi.encode(1);

    vm.mockCall(MOCK_CONNEXT, abi.encodeWithSelector(IConnext.getTokenId.selector), abi.encode(origin, canonicalId));
    vm.mockCall(MOCK_CONNEXT, abi.encodeWithSelector(IConnext.getSwapLPToken.selector), abi.encode(MOCK_LP_TOKEN));
    vm.mockCall(MOCK_LP_TOKEN, abi.encodeWithSelector(IERC20.balanceOf.selector), abi.encode(0));
    vm.mockCall(MOCK_CONNEXT, abi.encodeWithSelector(IConnext.getSwapStorage.selector), abi.encode(MOCK_SWAP));
    vm.mockCall(MOCK_CONNEXT, abi.encodeWithSelector(IConnext.getSwapTokenIndex.selector), abi.encode(0));
    vm.mockCall(MOCK_CONNEXT, abi.encodeWithSelector(IConnext.calculateSwapTokenAmount.selector), abi.encode(10));
    vm.mockCall(MOCK_ERC20, abi.encodeWithSelector(IERC20.allowance.selector), abi.encode(0));
    vm.mockCall(MOCK_CONNEXT, abi.encodeWithSelector(IConnext.addSwapLiquidity.selector), abi.encode(10));
    vm.mockCall(MOCK_ERC20, abi.encodeWithSelector(IERC20.balanceOf.selector), abi.encode(amount));

    vm.prank(MOCK_CONNEXT);
    connextPoolLiquidity.xReceive(transferId, amount, asset, originSender, origin, callData);
  }

  function test_ConnextPoolLiquidity__xReceive_revertsOnZeroAsset() public {
    uint256 amount = 1;
    address asset = address(0);
    bytes memory callData = abi.encode(recipient);

    vm.prank(MOCK_CONNEXT);
    vm.expectRevert("!asset");
    connextPoolLiquidity.xReceive(transferId, amount, asset, originSender, origin, callData);
  }

  function test_ConnextPoolLiquidity__xReceive_revertsOnZeroAmount() public {
    uint256 amount = 0;
    address asset = MOCK_ERC20;
    bytes memory callData = abi.encode(recipient);

    vm.prank(MOCK_CONNEXT);
    vm.expectRevert("!amount");
    connextPoolLiquidity.xReceive(transferId, amount, asset, originSender, origin, callData);
  }

  function test_ConnextPoolLiquidity__xReceive_revertsOnZeroAddressRecipient() public {
    uint256 amount = 1;
    address zeroRecipient = address(0);
    address asset = MOCK_ERC20;
    bytes memory callData = abi.encode(zeroRecipient);

    vm.prank(MOCK_CONNEXT);
    vm.expectRevert("!recipient");
    connextPoolLiquidity.xReceive(transferId, amount, asset, originSender, origin, callData);
  }
}
