// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IStableSwap} from "../../../../contracts/core/connext/interfaces/IStableSwap.sol";
import {ITokenRegistry} from "../../../../contracts/core/connext/interfaces/ITokenRegistry.sol";
import {ConnextMessage} from "../../../../contracts/core/connext/libraries/ConnextMessage.sol";
import {CallParams, ExecuteArgs} from "../../../../contracts/core/connext/libraries/LibConnextStorage.sol";
import {BridgeFacet} from "../../../../contracts/core/connext/facets/BridgeFacet.sol";
import {TestERC20} from "../../../../contracts/test/TestERC20.sol";

import "../../../../lib/forge-std/src/console.sol";
import "./FacetHelper.sol";

contract BridgeFacetTest is BridgeFacet, FacetHelper {
  // ============ storage ============
  // local asset for this domain
  address _local;

  // routers
  uint256 _router0Key = 2;
  address _router0 = vm.addr(2);
  uint256 _router1Key = 3;
  address _router1 = vm.addr(3);

  // default origin sender
  address _originSender = address(4);

  // domains
  uint32 _originDomain = 1000;
  uint32 _destinationDomain = 2000;

  // canonical token details
  address _canonical = address(5);
  bytes32 _canonicalTokenId = bytes32(abi.encodePacked(_canonical));
  uint32 _canonicalDomain = _originDomain;

  // relayer fee
  uint256 _relayerFee = 0.1 ether;

  // default amount
  uint256 _amount = 1.1 ether;

  // default nonce on xcall
  uint256 _nonce = 1;

  // default CallParams
  CallParams _params =
    CallParams(
      address(11), // to
      bytes(""), // callData
      _originDomain, // origin domain
      _destinationDomain, // destination domain
      address(11), // recovery address
      address(0), // callback
      0, // callbackFee
      false, // forceSlow
      false // receiveLocal
    );

  // ============ Test set up ============
  function setUp() public {
    // deploy any needed contracts
    deployContracts();

    // set defaults
    setDefaults();

    vm.mockCall(
      _tokenRegistry,
      abi.encodeWithSelector(ITokenRegistry.getTokenId.selector),
      abi.encode(_canonicalDomain, _canonicalTokenId)
    );

    // setup asset context (use local == adopted)
    s.adoptedToCanonical[_local] = ConnextMessage.TokenId(_canonicalDomain, _canonicalTokenId);
    s.adoptedToLocalPools[_canonicalTokenId] = IStableSwap(address(0));
    s.canonicalToAdopted[_canonicalTokenId] = _local;

    // setup other context
    s.approvedRelayers[address(this)] = true;
    s.maxRoutersPerTransfer = 5;
  }

  function deployContracts() public {
    // deploy the local token
    _local = address(new TestERC20());
  }

  // ============ utils ============
  function getRouterSignatures(
    bytes32 _transferId,
    address[] memory _routers,
    uint256[] memory _keys
  ) public returns (bytes[] memory) {
    uint256 pathLen = _routers.length;
    bytes[] memory signatures = new bytes[](pathLen);
    if (pathLen == 0) {
      return signatures;
    }
    bytes32 preImage = keccak256(abi.encode(_transferId, pathLen));
    bytes32 toSign = ECDSA.toEthSignedMessageHash(preImage);
    for (uint256 i; i < pathLen; i++) {
      (uint8 v, bytes32 r, bytes32 _s) = vm.sign(_keys[i], toSign);
      signatures[i] = abi.encodePacked(r, _s, v);
    }
    return signatures;
  }

  function _getExecuteArgs(
    address[] memory routers,
    uint256[] memory keys,
    bool fill
  ) public returns (bytes32, ExecuteArgs memory) {
    if (routers.length == 0 && fill) {
      routers = new address[](1);
      keys = new uint256[](1);
      routers[0] = _router0;
      keys[0] = _router0Key;
    }
    // get args
    bytes[] memory empty = new bytes[](0);
    ExecuteArgs memory args = ExecuteArgs(_params, _local, routers, empty, _relayerFee, _amount, _nonce, _originSender);
    // generate transfer id
    bytes32 _id = getTransferIdFromExecuteArgs(args);
    // generate router signatures
    args.routerSignatures = getRouterSignatures(_id, routers, keys);
    return (_id, args);
  }

  // Meant to mimic the getTransferId in the contract.
  function getTransferIdFromExecuteArgs(ExecuteArgs memory _args) public returns (bytes32) {
    bytes32 transferId = keccak256(
      abi.encode(_args.nonce, _args.params, _args.originSender, _canonicalTokenId, _canonicalDomain, _args.amount)
    );
    return transferId;
  }

  function getExecuteArgsNoRouters() public returns (bytes32, ExecuteArgs memory) {
    address[] memory routers = new address[](0);
    uint256[] memory keys = new uint256[](0);
    return _getExecuteArgs(routers, keys, false);
  }

  function getExecuteArgs(address[] memory routers, uint256[] memory keys)
    public
    returns (bytes32, ExecuteArgs memory)
  {
    return _getExecuteArgs(routers, keys, false);
  }

  function getExecuteArgs() public returns (bytes32, ExecuteArgs memory) {
    address[] memory routers;
    uint256[] memory keys;
    return _getExecuteArgs(routers, keys, true);
  }

  function executeAndAssert(bytes32 _id, ExecuteArgs memory _args) public {
    // get pre-execute liquidity in local
    uint256 pathLen = _args.routers.length;
    uint256[] memory prevLiquidity = new uint256[](pathLen);
    for (uint256 i; i < pathLen; i++) {
      prevLiquidity[i] = s.routerBalances[_args.routers[i]][_local];
    }

    // get pre-execute balance here in local
    uint256 prevBalance = IERC20(_local).balanceOf(address(this));

    // get pre-execute to balance in adopted
    IERC20 token = IERC20(s.canonicalToAdopted[_canonicalTokenId]);
    uint256 prevBalanceTo = token.balanceOf(_params.to);

    // execute
    uint256 transferred = pathLen == 0
      ? _args.amount
      : (_args.amount * _liquidityFeeNumerator) / _liquidityFeeDenominator;
    vm.expectEmit(true, true, false, true);
    emit Executed(_id, _args.params.to, _args, _args.local, transferred, address(this));
    this.execute(_args);

    // check local balance
    if (pathLen > 0) {
      // should decrement router balance
      uint256 decrement = transferred / pathLen;
      for (uint256 i; i < pathLen; i++) {
        assertEq(s.routerBalances[_args.routers[i]][_args.local], prevLiquidity[i] - decrement);
      }
    } else {
      // should decrement balance of bridge
      assertEq(IERC20(_local).balanceOf(address(this)), prevBalance - _amount);
    }

    // should increment balance of `to` in `adopted`
    assertEq(token.balanceOf(_params.to), prevBalanceTo + transferred);

    // should mark the transfer as executed
    assertEq(s.transferRelayer[_id], address(this));
  }

  // ============ execute ============

  // ============ execute failure cases

  // should fail if msg.sender is not an approved relayer
  function test_BridgeFacet__execute_failIfRelayerNotApproved() public {
    // set context
    s.approvedRelayers[address(this)] = false;

    // get args
    (, ExecuteArgs memory args) = getExecuteArgs();

    // expect failure
    vm.expectRevert(BridgeFacet.BridgeFacet__execute_unapprovedRelayer.selector);
    this.execute(args);
  }

  // should fail if the # of routers > maxRouters

  // should fail if it is a slow transfer (forceSlow = true) and not reconciled
  function test_BridgeFacet__execute_failIfForceSlowAndNotReconciled() public {
    // set test params
    _params.forceSlow = true;

    // get args
    (bytes32 transferId, ExecuteArgs memory args) = getExecuteArgs();

    // expect failure
    vm.expectRevert(BridgeFacet.BridgeFacet__execute_notReconciled.selector);
    this.execute(args);
  }

  // should fail if the router is not approved and ownership is not renounced

  // should fail if the router signature is invalid

  // should fail if it was already executed

  // should fail if sponsored vault did not fund contract

  // ============ execute success cases

  // should use slow liquidity if specified (forceSlow = true)
  function test_BridgeFacet__execute_forceSlowWorks() public {
    // set test params
    _params.forceSlow = true;

    // get args
    (bytes32 _id, ExecuteArgs memory _args) = getExecuteArgsNoRouters();

    // set reconciled context
    s.reconciledTransfers[_id] = true;

    executeAndAssert(_id, _args);
  }

  // should use the local asset if specified (receiveLocal = true)
  function test_BridgeFacet__execute_receiveLocalWorks() public {
    // set test params
    _params.receiveLocal = true;

    // get args
    (bytes32 _id, ExecuteArgs memory _args) = getExecuteArgs();

    // set liquidity context
    for (uint256 i; i < _args.routers.length; i++) {
      s.routerBalances[_args.routers[i]][_args.local] += 10 ether;
    }

    executeAndAssert(_id, _args);
  }

  // should work without calldata

  // should work with successful calldata

  // should work with failing calldata

  // should work if already reconciled (happening in slow liquidity mode)

  // should work with unapproved router if ownership renounced

  // should work with unapproved router if router-whitelist ownership renounced
}
