// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IStableSwap} from "../../contracts/interfaces/IStableSwap.sol";
import {ConnextMessage} from "../../contracts/libraries/ConnextMessage.sol";
import {ITokenRegistry} from "../../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {BridgeFacet} from "../../contracts/facets/BridgeFacet.sol";
import {TestERC20} from "../../contracts/test/TestERC20.sol";
import {CallParams, ExecuteArgs} from "../../contracts/libraries/LibConnextStorage.sol";

import "../../lib/forge-std/src/console.sol";
import "../ForgeHelper.sol";

contract BridgeFacetTest is ForgeHelper, BridgeFacet {
  // ============ storage ============
  // local asset for this domain
  address _local;

  // routers
  uint256 _router0Key = 2;
  address _router0 = address(2);
  uint256 _router1Key = 3;
  address _router1 = address(3);

  // default origin sender
  address _originSender = address(4);

  // domains
  uint32 _originDomain = 1000;
  uint32 _destinationDomain = 2000;

  // canonical token details
  address _tokenRegistry = address(6);
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
      address(0), // callback
      0, // callbackFee
      false, // forceSlow
      false // receiveLocal
    );

  // ============ Test set up ============
  function setUp() public {
    // deploy any needed contracts
    deployContracts();
    // setup token registry + mock getTokenId call
    s.tokenRegistry = ITokenRegistry(_tokenRegistry);
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
    bytes32 toSign = ECDSA.toEthSignedMessageHash(keccak256(abi.encode(_transferId, pathLen)));
    for (uint256 i; i < pathLen; i++) {
      (uint8 v, bytes32 r, bytes32 s) = vm.sign(_keys[i], toSign);
      signatures[i] = abi.encodePacked(r, s, v);
    }
    return signatures;
  }

  function getTransferId() public returns (bytes32) {
    // console.log("expecting:");
    // console.log("- local", _local);
    // console.log("- nonce", _nonce);
    // console.log("- _params.to", _params.to);
    // console.log("- _params.originDomain", _params.originDomain);
    // console.log("- _params.destinationDomain", _params.destinationDomain);
    // console.log("- _params.callback", _params.callback);
    // console.log("- _params.callbackFee", _params.callbackFee);
    // console.log("- _params.forceSlow", _params.forceSlow);
    // console.log("- _params.receiveLocal", _params.receiveLocal);
    // console.log("- _params.callData");
    // console.logBytes(_params.callData);
    // console.log("- originSender", _originSender);
    // console.log("- tokenId");
    // console.logBytes32(_canonicalTokenId);
    // console.log("- tokenDomain", _canonicalDomain);
    // console.log("- amount", _amount);
    // console.log("- encoded");
    // console.logBytes(abi.encode(_nonce, _params, _originSender, _canonicalTokenId, _canonicalDomain, _amount));

    bytes32 transferId = keccak256(
      abi.encode(_nonce, _params, _originSender, _canonicalTokenId, _canonicalDomain, _amount)
    );
    console.log("- transferId");
    console.logBytes32(transferId);
    return transferId;
  }

  function _getExecuteArgs(address[] memory routers, uint256[] memory keys)
    public
    returns (bytes32, ExecuteArgs memory)
  {
    if (routers.length == 0) {
      routers = new address[](1);
      keys = new uint256[](1);
      routers[0] = _router0;
      keys[0] = _router0Key;
    }
    // generate transfer id
    bytes32 transferId = getTransferId();
    // generate router signatures
    bytes[] memory sigs = getRouterSignatures(transferId, routers, keys);
    return (transferId, ExecuteArgs(_params, _local, routers, sigs, _relayerFee, _amount, _nonce, _originSender));
  }

  // Meant to mimic the getTransferId in the contract.
  function getTransferIdFromExecuteArgs(ExecuteArgs memory _args) public returns (bytes32) {
    bytes32 transferId = keccak256(
      abi.encode(_args.nonce, _args.params, _args.originSender, _canonicalTokenId, _canonicalDomain, _args.amount)
    );
    console.log("Test::BridgeFacet::getTransferIdFromExecuteArgs:");
    console.logBytes32(transferId);
    return transferId;
  }

  function getExecuteArgsNoRouters() public returns (bytes32, ExecuteArgs memory) {
    // form execute args
    bytes[] memory sigs = new bytes[](0);
    address[] memory routers = new address[](0);
    ExecuteArgs memory args = ExecuteArgs(_params, _local, routers, sigs, _relayerFee, _amount, _nonce, _originSender);
    // generate transfer id from execute args
    bytes32 transferId = getTransferIdFromExecuteArgs(args);
    return (transferId, args);
  }

  function getExecuteArgs(address[] memory routers, uint256[] memory keys)
    public
    returns (bytes32, ExecuteArgs memory)
  {
    return _getExecuteArgs(routers, keys);
  }

  function getExecuteArgs() public returns (bytes32, ExecuteArgs memory) {
    address[] memory routers;
    uint256[] memory keys;
    return _getExecuteArgs(routers, keys);
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
    (bytes32 transferId, ExecuteArgs memory _args) = getExecuteArgsNoRouters();
    // console.log("expecting:");
    // console.log("- local", _args.local);
    // console.log("- nonce", _args.nonce);

    // console.log("- _params.to", _args.params.to);
    // console.log("- _params.originDomain", _args.params.originDomain);
    // console.log("- _params.destinationDomain", _args.params.destinationDomain);
    // console.log("- _params.callback", _args.params.callback);
    // console.log("- _params.callbackFee", _args.params.callbackFee);
    // console.log("- _params.forceSlow", _args.params.forceSlow);
    // console.log("- _params.receiveLocal", _args.params.receiveLocal);
    // console.log("- _params.callData");
    // console.logBytes(_args.params.callData);

    // console.log("- originSender", _args.originSender);
    // console.log("- tokenId");
    // console.logBytes32(_canonicalTokenId);
    // console.log("- tokenDomain", _canonicalDomain);
    // console.log("- amount", _args.amount);
    // console.log("- encoded");
    // console.logBytes(
    //   abi.encode(_args.nonce, _args.params, _args.originSender, _canonicalTokenId, _canonicalDomain, _args.amount)
    // );
    // console.log("- transferId");
    // console.logBytes32(transferId);

    // set reconciled context
    s.reconciledTransfers[transferId] = true;

    // get pre-execute liquidity
    uint256 pathLen = _args.routers.length;
    uint256[] memory prevLiquidity = new uint256[](pathLen);
    for (uint256 i; i < pathLen; i++) {
      prevLiquidity[i] = s.routerBalances[_args.routers[i]][_args.local];
    }

    // get pre-execute to balance
    uint256 prevBalanceTo = IERC20(_local).balanceOf(_params.to);

    // get pre-execute balance here
    uint256 prevBalance = IERC20(_local).balanceOf(address(this));

    // execute
    vm.expectEmit(true, true, false, true);
    emit Executed(transferId, _params.to, _args, _local, _amount, address(this));
    this.execute(_args);

    // should not change router balances
    for (uint256 i; i < pathLen; i++) {
      assertEq(prevLiquidity[i], s.routerBalances[_args.routers[i]][_args.local]);
    }

    // should increment balance of `to` in `adopted`
    assertEq(IERC20(_local).balanceOf(_params.to), prevBalanceTo + _amount);

    // should decrement balance of bridge
    assertEq(IERC20(_local).balanceOf(address(this)), prevBalance - _amount);

    // should mark the transfer as executed
    assertEq(s.transferRelayer[transferId], address(this));
  }

  // should use the local asset if specified (receiveLocal = true)

  // should work without calldata

  // should work with successful calldata

  // should work with failing calldata

  // should work if already reconciled (happening in slow liquidity mode)

  // should work with unapproved router if ownership renounced

  // should work with unapproved router if router-whitelist ownership renounced
}
