// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../../ForgeHelper.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import {ConnextLogic, ConnextMessage, ITokenRegistry, IConnextHandler, IExecutor, IWrapped} from "../../../contracts/lib/Connext/ConnextLogic.sol";
import {RouterPermissionsManagerInfo} from "../../../contracts/lib/Connext/RouterPermissionsManagerLogic.sol";
import {IStableSwap} from "../../../contracts/interfaces/IStableSwap.sol";
import {TestERC20} from "../../../contracts/test/TestERC20.sol";

import "../../../lib/forge-std/src/console.sol";

contract ConnextLogicTest is ForgeHelper {
  // ============ Libraries ============
  using stdStorage for StdStorage;

  // ============ Storage ============
  mapping(bytes32 => address[]) _routedTransfers;
  mapping(bytes32 => bool) _reconciledTransfers;
  mapping(address => mapping(address => uint256)) _routerBalances;
  mapping(bytes32 => IStableSwap) _adoptedToLocalPools;
  mapping(bytes32 => address) _canonicalToAdopted;
  mapping(address => ConnextMessage.TokenId) _adoptedToCanonical;
  RouterPermissionsManagerInfo _routerInfo;
  mapping(bytes32 => address) _transferRelayer;

  uint256 LIQUIDITY_FEE_NUMERATOR = 9995;
  uint256 LIQUIDITY_FEE_DENOMINATOR = 10000;
  uint32 domain = 1;
  uint32 destinationDomain = 2;
  address tokenRegistry = address(2);
  address stableSwap = address(5);
  address canonical = address(4);
  bytes32 tokenIdentifier = bytes32(uint256(uint160(address(canonical))));
  TestERC20 adopted;
  TestERC20 local;

  // ============ Test set up ============
  function setUp() public {
    adopted = new TestERC20();
    local = new TestERC20();

    // Setup asset
    ConnextMessage.TokenId memory tokenId = ConnextMessage.TokenId(domain, tokenIdentifier);
    _adoptedToLocalPools[tokenIdentifier] = IStableSwap(stableSwap);
    _canonicalToAdopted[tokenIdentifier] = address(adopted);
    _adoptedToCanonical[address(adopted)] = tokenId;

    // Mocks
    vm.mockCall(address(adopted), abi.encodeWithSelector(IERC20.transferFrom.selector), abi.encode(true));
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(local))
    );
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.isLocalOrigin.selector),
      abi.encode(bool(true))
    );
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(domain, tokenIdentifier)
    );
  }

  // ============ Utils ============

  function getRouterSignatures(
    bytes32 transferId,
    address[] memory routers,
    uint256[] memory keys
  ) public returns (bytes[] memory) {
    uint256 pathLen = routers.length;
    bytes[] memory signatures = new bytes[](pathLen);
    bytes32 toSign = ECDSA.toEthSignedMessageHash(keccak256(abi.encode(transferId, pathLen)));
    for (uint256 i; i < pathLen; i++) {
      (uint8 v, bytes32 r, bytes32 s) = vm.sign(keys[i], toSign);
      signatures[i] = abi.encodePacked(r, s, v);
    }
    return signatures;
  }

  function callExecute(IConnextHandler.ExecuteArgs memory _executeArgs) public returns (bytes32) {
    ConnextLogic.ExecuteLibArgs memory args = ConnextLogic.ExecuteLibArgs(
      _executeArgs,
      false,
      3,
      ITokenRegistry(tokenRegistry),
      IWrapped(address(11111)),
      IExecutor(address(22222)),
      LIQUIDITY_FEE_NUMERATOR,
      LIQUIDITY_FEE_DENOMINATOR
    );
    return
      ConnextLogic.execute(
        args,
        _routedTransfers,
        _reconciledTransfers,
        _routerBalances,
        _adoptedToLocalPools,
        _canonicalToAdopted,
        _routerInfo,
        _transferRelayer
      );
  }

  // ============ addStableSwapPool ============

  // ============ addAssetId ============

  // ============ removeAssetId ============

  // ============ addRelayer ============

  // ============ removeRelayer ============

  // ============ setMaxRoutersPerTransfer ============

  // ============ addLiquidityForRouter ============

  // ============ removeLiquidity ============

  // ============ xcall ============

  // ============ reconcile ============

  // ============ execute ============

  // Should use slow liquidity if specified in CallParams
  function test_ConnextHandler__execute_forceSlowOnlyReconciled() public {
    // establish test constants
    address to = address(33333);
    address[] memory routers;
    bytes[] memory routerSignatures;
    uint256 amount = 12345;
    uint256 nonce = 1;
    address originSender = address(22222);

    IConnextHandler.CallParams memory callParams = IConnextHandler.CallParams(
      to,
      bytes(""),
      domain,
      destinationDomain,
      true,
      false
    );

    IConnextHandler.ExecuteArgs memory executeArgs = IConnextHandler.ExecuteArgs(
      callParams,
      address(adopted),
      routers,
      routerSignatures,
      amount,
      nonce,
      originSender
    );

    // get transfer id
    bytes32 id = keccak256(
      abi.encode(0, callParams, address(this), bytes32(abi.encodePacked(canonical)), domain, amount)
    );

    // should fail
    vm.expectRevert(ConnextLogic.ConnextLogic__execute_notReconciled.selector);

    // call execute
    callExecute(executeArgs);

    // make sure no routers were stored
    assertEq(_routedTransfers[id].length, 0);
  }

  // Should return the local asset if specified
  function test_ConnextHandler__execute_receiveLocalWorks() public {
    // establish test constants
    address to = address(33333);
    uint256 amount = 12345;
    uint256 nonce = 1;
    address originSender = address(22222);
    IConnextHandler.CallParams memory callParams = IConnextHandler.CallParams(
      to,
      bytes(""),
      domain,
      destinationDomain,
      false,
      true
    );
    bytes32 id = keccak256(abi.encode(nonce, callParams, originSender, tokenIdentifier, domain, amount));

    address[] memory routers = new address[](1);
    routers[0] = vm.addr(44444);
    uint256[] memory keys = new uint256[](routers.length);
    keys[0] = 44444;
    bytes[] memory routerSignatures = getRouterSignatures(id, routers, keys);

    // setup routers
    _routerInfo.approvedRouters[routers[0]] = true;
    _routerBalances[routers[0]][address(local)] = 12345 * 2;

    IConnextHandler.ExecuteArgs memory executeArgs = IConnextHandler.ExecuteArgs(
      callParams,
      address(local),
      routers,
      routerSignatures,
      amount,
      nonce,
      originSender
    );

    // get balance before
    uint256 adoptedBalance = adopted.balanceOf(to);
    uint256 localBalance = local.balanceOf(to);

    // call execute
    callExecute(executeArgs);

    // make sure the routers were stored
    assertEq(_routedTransfers[id].length, routers.length);

    // no balance change in adopted
    assertEq(adopted.balanceOf(to), adoptedBalance);

    // balance change in local
    uint256 expected = localBalance + (amount * LIQUIDITY_FEE_NUMERATOR) / LIQUIDITY_FEE_DENOMINATOR;
    assertEq(local.balanceOf(to), expected);
  }

  // ============ initiateClaim ============

  // ============ claim ============

  // ============ bumpTransfer ============
}
