// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "../../utils/ForgeHelper.sol";

import {TypedMemView, PromiseMessage, PromiseRouter, AddressUpgradeable} from "../../../contracts/core/promise/PromiseRouter.sol";
import {Home} from "../../../contracts/nomad-core/contracts/Home.sol";
import {ProposedOwnable} from "../../../contracts/core/shared/ProposedOwnable.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {Deployer} from "../../utils/Deployer.sol";
import {IConnextHandler} from "../../../contracts/core/connext/interfaces/IConnextHandler.sol";
import {BaseConnextFacet} from "../../../contracts/core/connext/facets/BaseConnextFacet.sol";

import {MockHome, MockCallback, MockPromiseRouter, TestSetterFacet} from "../../utils/Mock.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract PromiseRouterTest is ForgeHelper, Deployer {
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using PromiseMessage for bytes29;

  // ============ Libraries ============
  using stdStorage for StdStorage;

  event Send(
    uint32 domain,
    bytes32 remote,
    bytes32 transferId,
    address callbackAddress,
    bool success,
    bytes data,
    bytes message
  );

  event Receive(
    uint64 indexed originAndNonce,
    uint32 indexed origin,
    bytes32 transferId,
    address callbackAddress,
    bool success,
    bytes data,
    bytes message
  );

  event CallbackFeeAdded(bytes32 indexed transferId, uint256 addedFee, uint256 totalFee, address caller);
  event CallbackExecuted(bytes32 indexed transferId, address relayer);

  event SetConnext(address indexed connext);

  // ============ Storage ============

  MockPromiseRouter promiseRouter;
  MockPromiseRouter promiseRouterImpl;
  ERC1967Proxy proxy;

  address internal xAppConnectionManager = address(1);
  address internal home;
  MockCallback internal callback;
  address internal connext2 = address(3);
  address internal recipient = address(4);
  bytes32 internal remote = "remote";
  uint32 internal localDomain = uint32(123);
  uint32 internal remoteDomain = uint32(1);
  address internal relayer = address(5);
  address internal tokenRegistry = address(6);
  address internal wrapper = address(7);
  address internal relayerFeeRouter = address(8);

  // ============ Test set up ============

  function setUp() public {
    callback = new MockCallback();
    home = address(new MockHome());
    vm.mockCall(xAppConnectionManager, abi.encodeWithSignature("home()"), abi.encode(home));
    vm.mockCall(xAppConnectionManager, abi.encodeWithSignature("isReplica(address)"), abi.encode(bool(true)));
    vm.mockCall(home, abi.encodeWithSignature("localDomain()"), abi.encode(localDomain));

    promiseRouterImpl = new MockPromiseRouter();

    proxy = new ERC1967Proxy(
      address(promiseRouterImpl),
      abi.encodeWithSelector(PromiseRouter.initialize.selector, xAppConnectionManager)
    );

    promiseRouter = MockPromiseRouter(payable(address(proxy)));

    deployConnext(
      localDomain,
      xAppConnectionManager,
      tokenRegistry,
      wrapper,
      relayerFeeRouter,
      payable(address(proxy))
    );

    promiseRouter.setConnext(address(connextDiamondProxy));
    promiseRouter.enrollRemoteRouter(remoteDomain, bytes32(remote));
  }

  // ============ Utils ============
  // https://github.com/brockelmore/forge-std
  // specifically here with overriding mappings: https://github.com/brockelmore/forge-std/blob/99107e3e39f27339d224575756d4548c08639bc0/src/test/StdStorage.t.sol#L189-L192
  function setCallbackFee(bytes32 transferId, uint256 _fee) internal {
    stdstore.target(address(promiseRouter)).sig(promiseRouter.callbackFees.selector).with_key(transferId).checked_write(
        _fee
      );
  }

  function setApprovedRelayer(address _relayer, bool _approved) internal {
    TestSetterFacet(address(connextDiamondProxy)).setTestApprovedRelayer(_relayer, _approved);
  }

  // ============ initialize ============
  function test_PromiseRouter__initializeParameters_shouldWork() public {
    assertEq(address(promiseRouter.xAppConnectionManager()), address(xAppConnectionManager));
    assertEq(address(promiseRouter.connext()), address(connextDiamondProxy));
  }

  // ============ setConnext ============

  // Should work
  function test_PromiseRouter__setConnext_shouldWork() public {
    vm.expectEmit(true, true, true, true);
    emit SetConnext(connext2);

    promiseRouter.setConnext(connext2);
    assertEq(address(promiseRouter.connext()), connext2);

    promiseRouter.setConnext(address(connextDiamondProxy));
  }

  // Fail if not called by owner
  function test_PromiseRouter__setConnext_failsIfNotOwner() public {
    vm.prank(address(0));
    vm.expectRevert(abi.encodeWithSelector(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector));
    promiseRouter.setConnext(connext2);
  }

  // ============ send ============
  // Fail if not called by connext
  function test_PromiseRouter__send_failsIfNotConnext(bool returnSuccess, bytes calldata returnData) public {
    vm.assume(returnData.length > 0);
    vm.prank(address(0));
    vm.expectRevert(abi.encodeWithSelector(PromiseRouter.PromiseRouter__onlyConnext_notConnext.selector));

    bytes32 transferId = "A";
    address callbackAddress = address(1);

    promiseRouter.send(remoteDomain, transferId, callbackAddress, returnSuccess, returnData);
  }

  // Fail if return data is empty
  function test_PromiseRouter__send_failsIfEmptyReturnData(bool returnSuccess, bytes calldata returnData) public {
    vm.assume(returnData.length == 0);
    vm.prank(address(connextDiamondProxy));
    vm.expectRevert(abi.encodeWithSelector(PromiseRouter.PromiseRouter__send_returndataEmpty.selector));

    bytes32 transferId = "A";
    address callbackAddress = address(1);

    promiseRouter.send(remoteDomain, transferId, callbackAddress, returnSuccess, returnData);
  }

  // Fail if callback address is not contract
  function test_PromiseRouter__send_failsIfNonContractCallback(bool returnSuccess, bytes calldata returnData) public {
    vm.assume(returnData.length > 0);
    vm.prank(address(connextDiamondProxy));
    vm.expectRevert(abi.encodeWithSelector(PromiseRouter.PromiseRouter__send_callbackAddressNotContract.selector));

    bytes32 transferId = "A";
    address callbackAddress = address(0);

    promiseRouter.send(remoteDomain, transferId, callbackAddress, returnSuccess, returnData);
  }

  // Should work
  function test_PromiseRouter__send_shouldWork(bool returnSuccess, bytes calldata returnData) public {
    vm.prank(address(connextDiamondProxy));
    vm.assume(returnData.length > 0);

    bytes32 transferId = "A";
    address callbackAddress = address(callback);

    bytes memory message = PromiseMessage.formatPromiseCallback(transferId, callbackAddress, returnSuccess, returnData);

    vm.expectCall(home, abi.encodeWithSelector(MockHome.dispatch.selector, remoteDomain, remote, message));
    vm.expectEmit(true, true, true, true);
    emit Send(remoteDomain, remote, transferId, callbackAddress, returnSuccess, returnData, message);

    promiseRouter.send(remoteDomain, transferId, callbackAddress, returnSuccess, returnData);
  }

  // ============ handle ============
  // Should work
  function test_PromiseRouter__handle_shouldWork(bytes calldata returnData, uint32 _nonce) public {
    vm.assume(returnData.length != 0);

    uint64 originAndNonce = (uint64(remoteDomain) << 32) | _nonce;
    bytes32 transferId = "A";
    address callbackAddress = address(callback);
    bool success = true;

    bytes memory message = PromiseMessage.formatPromiseCallback(transferId, callbackAddress, success, returnData);
    bytes29 _msg = message.ref(0).mustBePromiseCallback();

    vm.expectEmit(true, true, true, true);
    emit Receive(originAndNonce, remoteDomain, transferId, callbackAddress, success, returnData, message);

    promiseRouter.handle(remoteDomain, _nonce, remote, message);
    assertTrue(!_msg.isNull());
    assertEq(promiseRouter.messageHashes(transferId), _msg.keccak());
  }

  // ============ process ============
  // Fail if relayer is not approved on connext contract
  function test_PromiseRouter__process_failsIfNotApprovedRelayer(bytes calldata returnData) public {
    vm.assume(returnData.length != 0);
    bytes32 transferId = "A";
    address callbackAddress = address(callback);
    bool success = true;

    promiseRouter.mockHandle(callbackAddress, success, returnData);
    bytes memory message = PromiseMessage.formatPromiseCallback(transferId, callbackAddress, success, returnData);
    bytes29 _msg = message.ref(0).mustBePromiseCallback();

    setApprovedRelayer(relayer, false);

    vm.expectRevert(abi.encodeWithSelector(PromiseRouter.PromiseRouter__process_notApprovedRelayer.selector));

    vm.prank(relayer);
    promiseRouter.process(transferId, message);
  }

  // Should work if callback fee is zero
  function test_PromiseRouter__process_shouldWorkIfZeroCallbackfee(bytes calldata returnData) public {
    vm.assume(returnData.length != 0);
    bytes32 transferId = "A";
    address callbackAddress = address(callback);
    bool success = true;
    uint256 beforeBalance = 1 ether;

    // transfer 1 ether wei to promiseRouter as callback fee
    address(promiseRouter).call{value: beforeBalance}("");

    uint256 relayerBeforeBalance = relayer.balance;
    uint256 callbackFee = 0 ether;

    setApprovedRelayer(relayer, true);
    setCallbackFee(transferId, callbackFee);

    promiseRouter.mockHandle(callbackAddress, success, returnData);
    bytes memory message = PromiseMessage.formatPromiseCallback(transferId, callbackAddress, success, returnData);
    bytes29 _msg = message.ref(0).mustBePromiseCallback();

    assertEq(_msg.keccak(), promiseRouter.messageHashes(transferId));
    assertTrue(_msg.isValid());
    assertTrue(AddressUpgradeable.isContract(_msg.callbackAddress()));
    assertTrue(callbackAddress == _msg.callbackAddress());

    // check if callback executed
    vm.expectCall(
      address(callback),
      abi.encodeWithSelector(MockCallback.callback.selector, transferId, success, returnData)
    );

    vm.expectEmit(true, true, true, true);
    emit CallbackExecuted(transferId, relayer);

    vm.prank(relayer);
    promiseRouter.process(transferId, message);

    // check if promiseMessage cleared after callback
    assertEq(promiseRouter.messageHashes(transferId), bytes32(0));

    // check if callbackFee cleared after callback
    assertTrue(promiseRouter.callbackFees(transferId) == 0);

    // check if callback fee is transferred to relayer
    uint256 relayerAfterBalance = relayer.balance;
    assertEq(relayerAfterBalance, relayerBeforeBalance + callbackFee);
    assertEq(address(promiseRouter).balance, beforeBalance - callbackFee);
  }

  // Should work
  function test_PromiseRouter__process_shouldWork(bytes calldata returnData, uint32 _nonce) public {
    vm.assume(returnData.length != 0);
    bytes32 transferId = "A";
    address callbackAddress = address(callback);
    bool success = true;
    uint256 beforeBalance = 1 ether;

    // transfer 1 ether wei to promiseRouter as callback fee
    address(promiseRouter).call{value: beforeBalance}("");

    uint256 relayerBeforeBalance = relayer.balance;
    uint256 callbackFee = 0.5 ether;

    setApprovedRelayer(relayer, true);
    setCallbackFee(transferId, callbackFee);

    promiseRouter.mockHandle(callbackAddress, success, returnData);
    bytes memory message = PromiseMessage.formatPromiseCallback(transferId, callbackAddress, success, returnData);
    // bytes29 _msg = message.ref(0).mustBePromiseCallback();

    // assertEq(_msg.keccak(), promiseRouter.messageHashes(transferId));

    // assertTrue(_msg.isValid());
    // assertTrue(AddressUpgradeable.isContract(_msg.callbackAddress()));
    // assertTrue(callbackAddress == _msg.callbackAddress());

    // check if callback executed
    vm.expectCall(
      address(callback),
      abi.encodeWithSelector(MockCallback.callback.selector, transferId, success, returnData)
    );

    vm.expectEmit(true, true, true, true);
    emit CallbackExecuted(transferId, relayer);

    vm.prank(relayer);
    promiseRouter.process(transferId, message);

    // check if promiseMessage cleared after callback
    assertEq(promiseRouter.messageHashes(transferId), bytes32(0));

    // check if callbackFee cleared after callback
    assertEq(promiseRouter.callbackFees(transferId), 0);

    // check if callback fee is transferred to relayer
    uint256 relayerAfterBalance = relayer.balance;
    assertEq(relayerAfterBalance, relayerBeforeBalance + callbackFee);
    assertEq(address(promiseRouter).balance, beforeBalance - callbackFee);
  }

  // ============ bumpCallbackFee ============
  // Fail if value is zero
  function test_PromiseRouter__bumpCallbackFee_failsIfZeroValue() public {
    bytes32 transferId = "A";

    vm.expectRevert(abi.encodeWithSelector(PromiseRouter.PromiseRouter__bumpCallbackFee_valueIsZero.selector));

    uint256 amount = 0 ether;
    promiseRouter.bumpCallbackFee{value: amount}(transferId);
  }

  // Should fail if message isnt handled
  function test_PromiseRouter__bumpCallbackFee_shouldFailIfMessageNotHandled() public {
    bytes32 transferId = "A";

    uint256 initialFee = 0.5 ether;
    setCallbackFee(transferId, initialFee);

    uint256 amount = 0.5 ether;

    vm.expectRevert(PromiseRouter.PromiseRouter__bumpCallbackFee_messageUnavailable.selector);
    promiseRouter.bumpCallbackFee{value: amount}(transferId);

    assertEq(promiseRouter.callbackFees(transferId), initialFee);
  }

  // Should work
  function test_PromiseRouter__bumpCallbackFee_shouldWork(bytes calldata returnData, uint32 _nonce) public {
    vm.assume(returnData.length != 0);

    uint64 originAndNonce = (uint64(remoteDomain) << 32) | _nonce;
    bytes32 transferId = "A";
    address callbackAddress = address(callback);
    bool success = true;

    bytes memory message = PromiseMessage.formatPromiseCallback(transferId, callbackAddress, success, returnData);
    bytes29 _msg = message.ref(0).mustBePromiseCallback();

    vm.expectEmit(true, true, true, true);
    emit Receive(originAndNonce, remoteDomain, transferId, callbackAddress, success, returnData, message);

    promiseRouter.handle(remoteDomain, _nonce, remote, message);
    assertTrue(!_msg.isNull());

    uint256 initial = promiseRouter.callbackFees(transferId);
    uint256 amount = 0.5 ether;
    promiseRouter.bumpCallbackFee{value: amount}(transferId);
    assertEq(promiseRouter.callbackFees(transferId), initial + amount);
  }
}
