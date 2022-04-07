// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "./ForgeHelper.sol";

import "../contracts/nomad-xapps/contracts/relayer-fee-router/RelayerFeeRouter.sol";
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

contract RelayerFeeRouterTest is ForgeHelper {
  using TypedMemView for bytes;
  using TypedMemView for bytes29;
  using RelayerFeeMessage for bytes29;

  // ============ Libraries ============
  using stdStorage for StdStorage;

  event Send(
    uint32 domain,
    address recipient,
    uint256 amount,
    bytes32[] _transactionIds,
    bytes32 remote,
    bytes message
  );

  event Receive(
    uint64 indexed originAndNonce,
    uint32 indexed origin,
    address indexed recipient,
    uint256 amount,
    bytes32[] transactionIds
  );

  event SetConnext(address indexed connext);

  // ============ Storage ============

  RelayerFeeRouter relayerFeeRouter;
  RelayerFeeRouter relayerFeeRouterImplementation;
  ERC1967Proxy proxy;

  uint256 domain = 1;
  address bridgeRouter = address(1);
  address tokenRegistry = address(2);
  address wrapper = address(3);

  address internal xAppConnectionManager = address(1);
  address internal home;
  address internal connext = address(this);
  address internal connext2 = address(3);
  address internal recipient = address(4);
  bytes32 internal remote = "remote";
  uint32 internal localDomain = uint32(123);
  uint32 internal remoteDomain = uint32(1);

  // ============ Test set up ============

  function setUp() public {
    home = address(new MockHome());
    vm.mockCall(xAppConnectionManager, abi.encodeWithSignature("home()"), abi.encode(home));
    vm.mockCall(xAppConnectionManager, abi.encodeWithSignature("isReplica(address)"), abi.encode(bool(true)));
    // vm.mockCall(home, abi.encodeWithSelector(Home.dispatch.selector), bytes("0x"));
    vm.mockCall(home, abi.encodeWithSignature("localDomain()"), abi.encode(localDomain));

    relayerFeeRouterImplementation = new RelayerFeeRouter();

    proxy = new ERC1967Proxy(
      address(relayerFeeRouterImplementation),
      abi.encodeWithSelector(RelayerFeeRouter.initialize.selector, xAppConnectionManager, connext)
    );

    relayerFeeRouter = RelayerFeeRouter(payable(address(proxy)));

    // Shouldn't enrollRemoteRouter be protected by onlyOwner?
    relayerFeeRouter.enrollRemoteRouter(remoteDomain, bytes32(remote));
  }

  // ============ initialize ============
  function testInitializeParameters() public {
    assertEq(address(relayerFeeRouter.xAppConnectionManager()), address(xAppConnectionManager));
    assertEq(address(relayerFeeRouter.connext()), address(connext));
  }

  // ============ setConnext ============

  // Should work
  function testSetConnext() public {
    vm.expectEmit(true, true, true, true);
    emit SetConnext(connext2);

    relayerFeeRouter.setConnext(connext2);
    assertEq(address(relayerFeeRouter.connext()), connext2);
  }

  // Fail if not called by owner
  function testSetConnextOnlyOwner() public {
    vm.prank(address(0));
    vm.expectRevert("Ownable: caller is not the owner");
    relayerFeeRouter.setConnext(connext2);
  }

  // ============ send ============
  // Fail if not called by connext
  function testSendOnlyConnext() public {
    vm.prank(address(0));
    vm.expectRevert(abi.encodeWithSelector(RelayerFeeRouter.RelayerFeeRouter__onlyConnext_notConnext.selector));

    bytes32[] memory transactionIds = new bytes32[](2);
    transactionIds[0] = "AAA";
    transactionIds[1] = "BBB";

    relayerFeeRouter.send(remoteDomain, recipient, 1, transactionIds);
  }

  // Fail if not no amount and no transaction ids
  function testSendClaimEmpty() public {
    vm.expectRevert(abi.encodeWithSelector(RelayerFeeRouter.RelayerFeeRouter__send_claimEmpty.selector));

    bytes32[] memory transactionIds = new bytes32[](0);

    relayerFeeRouter.send(remoteDomain, recipient, 0, transactionIds);
  }

  // Fail if empty recipient
  function testSendRecipientEmpty() public {
    vm.expectRevert(abi.encodeWithSelector(RelayerFeeRouter.RelayerFeeRouter__send_recipientEmpty.selector));

    bytes32[] memory transactionIds = new bytes32[](2);
    transactionIds[0] = "AAA";
    transactionIds[1] = "BBB";

    relayerFeeRouter.send(remoteDomain, address(0), 1, transactionIds);
  }

  // Should work
  function testSend(bytes32[] calldata _transactionIds, uint256 _amount) public {
    vm.assume(_amount != 0 || _transactionIds.length != 0);
    bytes memory message = RelayerFeeMessage.formatClaimFees(recipient, _amount, _transactionIds);

    vm.expectCall(home, abi.encodeWithSelector(MockHome.dispatch.selector, remoteDomain, remote, message));
    vm.expectEmit(true, true, true, true);
    emit Send(remoteDomain, recipient, _amount, _transactionIds, remote, message);

    relayerFeeRouter.send(remoteDomain, recipient, _amount, _transactionIds);
  }

  function testSend0Amount(bytes32[] calldata _transactionIds) public {
    vm.assume(_transactionIds.length != 0);
    bytes memory message = RelayerFeeMessage.formatClaimFees(recipient, 0, _transactionIds);

    vm.expectCall(home, abi.encodeWithSelector(MockHome.dispatch.selector, remoteDomain, remote, message));
    vm.expectEmit(true, true, true, true);
    emit Send(remoteDomain, recipient, 0, _transactionIds, remote, message);

    relayerFeeRouter.send(remoteDomain, recipient, 0, _transactionIds);
  }

  // ============ handle ============
  // Should work
  function testHandle(
    bytes32[] calldata _transactionIds,
    uint32 _nonce,
    uint256 _amount
  ) public {
    vm.assume(_amount != 0 || _transactionIds.length != 0);
    uint64 originAndNonce = (uint64(remoteDomain) << 32) | _nonce;
    bytes memory message = RelayerFeeMessage.formatClaimFees(recipient, _amount, _transactionIds);

    vm.expectEmit(true, true, true, true);
    emit Receive(originAndNonce, remoteDomain, recipient, _amount, _transactionIds);

    relayerFeeRouter.handle(remoteDomain, _nonce, remote, message);
  }

  function testHandle0Amount(bytes32[] calldata _transactionIds, uint32 _nonce) public {
    vm.assume(_transactionIds.length != 0);
    uint64 originAndNonce = (uint64(remoteDomain) << 32) | _nonce;
    bytes memory message = RelayerFeeMessage.formatClaimFees(recipient, 0, _transactionIds);

    vm.expectEmit(true, true, true, true);
    emit Receive(originAndNonce, remoteDomain, recipient, 0, _transactionIds);

    relayerFeeRouter.handle(remoteDomain, _nonce, remote, message);
  }
}
