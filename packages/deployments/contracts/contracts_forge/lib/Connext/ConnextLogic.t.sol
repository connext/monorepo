// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../../ForgeHelper.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {ConnextLogic, ConnextMessage, ITokenRegistry, IConnextHandler, IExecutor, IWrapped} from "../../../contracts/lib/Connext/ConnextLogic.sol";
import {RouterPermissionsManagerInfo} from "../../../contracts/lib/Connext/RouterPermissionsManagerLogic.sol";
import {IStableSwap} from "../../../contracts/interfaces/IStableSwap.sol";
import {TestERC20} from "../../../contracts/test/TestERC20.sol";

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

  uint32 domain = 1;
  uint32 destinationDomain = 2;
  address tokenRegistry = address(2);
  address canonical = address(4);
  address stableSwap = address(5);
  TestERC20 adopted;

  // ============ Test set up ============
  function setUp() public {
    adopted = new TestERC20();

    // Setup asset
    ConnextMessage.TokenId memory tokenId = ConnextMessage.TokenId(
      domain,
      bytes32(uint256(uint160(address(canonical))))
    );
    _adoptedToLocalPools[tokenId.id] = IStableSwap(stableSwap);
    _canonicalToAdopted[tokenId.id] = address(adopted);
    _adoptedToCanonical[address(adopted)] = tokenId;

    // Mocks
    vm.mockCall(address(adopted), abi.encodeWithSelector(IERC20.balanceOf.selector), abi.encode(0));
    vm.mockCall(address(adopted), abi.encodeWithSelector(IERC20.transferFrom.selector), abi.encode(true));
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getLocalAddress.selector),
      abi.encode(address(adopted))
    );
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.isLocalOrigin.selector),
      abi.encode(bool(true))
    );
    vm.mockCall(
      address(tokenRegistry),
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(domain, bytes32(uint256(uint160(address(canonical)))))
    );
  }

  // ============ Utils ============

  function callExecute(IConnextHandler.ExecuteArgs memory _executeArgs) public returns (bytes32) {
    ConnextLogic.ExecuteLibArgs memory args = ConnextLogic.ExecuteLibArgs(
      _executeArgs,
      false,
      3,
      ITokenRegistry(tokenRegistry),
      IWrapped(address(11111)),
      IExecutor(address(22222)),
      9995,
      10_000
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
      true
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

  // ============ initiateClaim ============

  // ============ claim ============

  // ============ bumpTransfer ============
}
