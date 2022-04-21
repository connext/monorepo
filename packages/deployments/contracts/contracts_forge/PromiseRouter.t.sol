// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ForgeHelper.sol";

import "../contracts/interfaces/IConnext.sol";
import "../contracts/interfaces/ICallback.sol";
import "../contracts/nomad-xapps/contracts/promise-router/PromiseRouter.sol";
import {Home} from "../contracts/nomad-core/contracts/Home.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

// running tests (with logging on failure):
// yarn workspace @connext/nxtp-contracts test:forge -vvv
// run a single test:
// yarn workspace @connext/nxtp-contracts test:forge -m testAddRouterAlreadyApproved -vvv

// other forge commands: yarn workspace @connext/nxtp-contracts forge <CMD>
// see docs here: https://onbjerg.github.io/foundry-book/index.html

contract MockHome {
  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes memory _messageBody
  ) external {
    1 == 1;
  }
}

contract MockConnext {
  function claim(address _recipient, bytes32[] calldata _transferIds) external {
    1 == 1;
  }
}

contract MockCallback is ICallback {
  function callback(
    bytes32 transferId,
    bool success,
    bytes memory data
  ) external {
    require(data.length != 0);
  }
}

contract PromiseRouterTest is ForgeHelper {
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

  event SetConnext(address indexed connext);

  // ============ Storage ============

  PromiseRouter promiseRouter;
  PromiseRouter promiseRouterImpl;
  ERC1967Proxy proxy;

  address internal xAppConnectionManager = address(1);
  address internal home;
  MockConnext internal connext;
  MockCallback internal callback;
  address internal connext2 = address(3);
  address internal recipient = address(4);
  bytes32 internal remote = "remote";
  uint32 internal localDomain = uint32(123);
  uint32 internal remoteDomain = uint32(1);

  // ============ Test set up ============

  function setUp() public {
    connext = new MockConnext();
    callback = new MockCallback();
    home = address(new MockHome());
    vm.mockCall(xAppConnectionManager, abi.encodeWithSignature("home()"), abi.encode(home));
    vm.mockCall(xAppConnectionManager, abi.encodeWithSignature("isReplica(address)"), abi.encode(bool(true)));
    vm.mockCall(home, abi.encodeWithSignature("localDomain()"), abi.encode(localDomain));

    promiseRouterImpl = new PromiseRouter();

    proxy = new ERC1967Proxy(
      address(promiseRouterImpl),
      abi.encodeWithSelector(PromiseRouter.initialize.selector, xAppConnectionManager)
    );

    promiseRouter = PromiseRouter(payable(address(proxy)));
    promiseRouter.setConnext(address(connext));
  }

  // ============ Utils ============
  // https://github.com/brockelmore/forge-std
  // specifically here with overriding mappings: https://github.com/brockelmore/forge-std/blob/99107e3e39f27339d224575756d4548c08639bc0/src/test/StdStorage.t.sol#L189-L192
  function setPromiseMessage(bytes32 transferId, bytes29 _msg) internal {
    stdstore
      .target(address(promiseRouter))
      .sig(promiseRouter.promiseMessages.selector)
      .with_key(transferId)
      .checked_write(_msg);
  }

  function setCallbackFee(bytes32 transferId, uint256 _fee) internal {
    stdstore.target(address(promiseRouter)).sig(promiseRouter.callbackFees.selector).with_key(transferId).checked_write(
        _fee
      );
  }

  // ============ initialize ============
  function testInitializeParameters() public {
    assertEq(address(promiseRouter.xAppConnectionManager()), address(xAppConnectionManager));
    assertEq(address(promiseRouter.connext()), address(connext));
  }

  // ============ setConnext ============

  // Should work
  function testSetConnext() public {
    vm.expectEmit(true, true, true, true);
    emit SetConnext(connext2);

    promiseRouter.setConnext(connext2);
    assertEq(address(promiseRouter.connext()), connext2);
  }

  // Fail if not called by owner
  function testSetConnextOnlyOwner() public {
    vm.prank(address(0));
    vm.expectRevert("Ownable: caller is not the owner");
    promiseRouter.setConnext(connext2);
  }

  // ============ send ============
  // Fail if not called by connext
  function testSendOnlyConnext(bool returnSuccess, bytes calldata returnData) public {
    vm.assume(returnData.length > 0);
    vm.prank(address(0));
    vm.expectRevert(abi.encodeWithSelector(PromiseRouter.PromiseRouter__onlyConnext_notConnext.selector));

    bytes32 transferId = "A";
    address callbackAddress = address(1);

    promiseRouter.send(remoteDomain, transferId, callbackAddress, returnSuccess, returnData);
  }

  // Fail if return data is empty
  function testSendEmptyReturnData(bool returnSuccess, bytes calldata returnData) public {
    vm.assume(returnData.length == 0);
    vm.prank(address(connext));
    vm.expectRevert(abi.encodeWithSelector(PromiseRouter.PromiseRouter__send_returndataEmpty.selector));

    bytes32 transferId = "A";
    address callbackAddress = address(1);

    promiseRouter.send(remoteDomain, transferId, callbackAddress, returnSuccess, returnData);
  }

  // Fail if callback address is not contract
  function testSendNonContractCallback(bool returnSuccess, bytes calldata returnData) public {
    vm.assume(returnData.length > 0);
    vm.prank(address(connext));
    vm.expectRevert(abi.encodeWithSelector(PromiseRouter.PromiseRouter__send_callbackAddressNotContract.selector));

    bytes32 transferId = "A";
    address callbackAddress = address(1);

    promiseRouter.send(remoteDomain, transferId, callbackAddress, returnSuccess, returnData);
  }

  // Fail if !remote
  function testSendNotRemote(bool returnSuccess, bytes calldata returnData) public {
    vm.assume(returnData.length > 0);
    vm.prank(address(connext));
    vm.expectRevert("!remote");

    bytes32 transferId = "A";
    address callbackAddress = address(callback);

    promiseRouter.send(remoteDomain, transferId, callbackAddress, returnSuccess, returnData);
  }

  // Should work
  function testSend(bool returnSuccess, bytes calldata returnData) public {
    promiseRouter.enrollRemoteRouter(remoteDomain, bytes32(remote));
    vm.prank(address(connext));
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
  function testHandle(bytes calldata returnData, uint32 _nonce) public {
    vm.assume(returnData.length != 0);
    promiseRouter.enrollRemoteRouter(remoteDomain, bytes32(remote));

    uint64 originAndNonce = (uint64(remoteDomain) << 32) | _nonce;
    bytes32 transferId = "A";
    address callbackAddress = address(callback);
    bool success = true;

    bytes memory message = PromiseMessage.formatPromiseCallback(transferId, callbackAddress, success, returnData);
    bytes29 _msg = message.ref(0).mustBePromiseCallback();

    vm.expectEmit(true, true, true, true);
    emit Receive(originAndNonce, remoteDomain, transferId, callbackAddress, success, returnData, message);

    promiseRouter.handle(remoteDomain, _nonce, remote, message);
    assertEq(keccak256(abi.encodePacked(promiseRouter.promiseMessages(transferId))), keccak256(abi.encodePacked(_msg)));
  }
}
