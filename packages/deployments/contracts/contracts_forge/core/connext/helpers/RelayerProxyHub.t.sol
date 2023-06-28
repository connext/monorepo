// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../../utils/ForgeHelper.sol";
import {RelayerProxyHub, IRootManager, IGnosisHubConnector, IArbitrumHubConnector, IOptimismHubConnector, IZkSyncHubConnector, IPolygonHubConnector} from "../../../../contracts/core/connext/helpers/RelayerProxyHub.sol";
import {IKeep3rV2, RelayerProxy} from "../../../../contracts/core/connext/helpers/RelayerProxy.sol";
import {RootManager} from "../../../../contracts/messaging/RootManager.sol";
import {Types} from "../../../../contracts/messaging/connectors/optimism/lib/Types.sol";
import {ProposedOwnable} from "../../../../contracts/shared/ProposedOwnable.sol";
import {ChainIDs} from "../../../../contracts/core/connext/libraries/ChainIDs.sol";

contract RelayerProxyHubTest is ForgeHelper {
  // ============ Events ============
  event FundsReceived(uint256 amount, uint256 balance);

  event FundsDeducted(uint256 amount, uint256 balance);

  event RelayerAdded(address relayer);

  event RelayerRemoved(address relayer);

  event ConnextChanged(address updated, address previous);
  event SpokeConnectorChanged(address updated, address previous);
  event RelayerChanged(address updated, address previous);
  event FeeCollectorChanged(address updated, address previous);
  event PropagateCooldownChanged(uint256 propagateCooldown, uint256 oldPropagateCooldown);
  event RootManagerChanged(address rootManager, address oldRootManager);
  event HubConnectorChanged(address hubConnector, address oldHubConnector, uint32 chain);

  // ============ Storage ============
  address OWNER = address(1);
  address _connext = address(12312);
  address _spokeConnector = address(12321222);
  address _gelatoRelayer = address(123444412);
  address _feeCollector = address(12335555);
  address _rootManager = address(12335558);
  address _keep3r = address(12335556);
  address _autonolas = address(12335557);
  uint8 _autonolasPriority = 4;
  address[] _hubConnectors = new address[](10);
  uint32[] _hubConnectorChains = new uint32[](10);

  RelayerProxyHub proxy;

  // ============ Setup ============
  function setUp() public {
    utils_setUpPropagateParams();
    utils_deployAndAssert();
  }

  function utils_deployAndAssert() public {
    vm.expectEmit(true, true, true, true);
    emit ConnextChanged(_connext, address(0));

    vm.expectEmit(true, true, true, true);
    emit SpokeConnectorChanged(_spokeConnector, address(0));

    vm.expectEmit(true, true, true, true);
    emit FeeCollectorChanged(_feeCollector, address(0));

    vm.expectEmit(true, true, true, true);
    emit RelayerAdded(_gelatoRelayer);

    _hubConnectors[0] = address(100);
    _hubConnectors[1] = address(1);
    _hubConnectors[2] = address(2);
    _hubConnectors[3] = address(3);
    _hubConnectors[4] = address(4);
    _hubConnectors[5] = address(5);
    _hubConnectors[6] = address(6);
    _hubConnectors[7] = address(7);
    _hubConnectors[8] = address(8);
    _hubConnectors[9] = address(9);
    _hubConnectorChains[0] = ChainIDs.GNOSIS;
    _hubConnectorChains[1] = ChainIDs.GNOSIS_CHIADO;
    _hubConnectorChains[2] = ChainIDs.ARBITRUM_ONE;
    _hubConnectorChains[3] = ChainIDs.ARBITRUM_GOERLI;
    _hubConnectorChains[4] = ChainIDs.OPTIMISM;
    _hubConnectorChains[5] = ChainIDs.OPTIMISM_GOERLI;
    _hubConnectorChains[6] = ChainIDs.ZKSYNC;
    _hubConnectorChains[7] = ChainIDs.ZKSYNC_TEST;
    _hubConnectorChains[8] = ChainIDs.POLYGON_POS;
    _hubConnectorChains[9] = ChainIDs.MUMBAI;

    vm.prank(OWNER);
    proxy = new RelayerProxyHub(
      _connext,
      _spokeConnector,
      _gelatoRelayer,
      _feeCollector,
      _rootManager,
      _keep3r,
      _autonolas,
      _autonolasPriority,
      300,
      _hubConnectors,
      _hubConnectorChains
    );
    vm.deal(address(proxy), 1 ether);
  }

  uint256[] _messageFees = new uint256[](10);
  bytes[] _encodedData = new bytes[](10);
  uint256 _relayerFee = 123;

  function utils_setUpPropagateParams() public {
    _messageFees[0] = 123;
    _messageFees[1] = 456;
    _encodedData[0] = abi.encode(1);
    _encodedData[1] = abi.encode(2);
  }

  function utils_mockIsKeeper(address _sender, bool _isKeeper) public {
    vm.mockCall(address(_keep3r), abi.encodeWithSelector(IKeep3rV2.isKeeper.selector, _sender), abi.encode(_isKeeper));
  }

  function utils_mockPropagate() public {
    vm.mockCall(address(proxy.rootManager()), abi.encodeWithSelector(IRootManager.propagate.selector), abi.encode());
  }

  function test_RelayerProxyHub__deploy_works() public {
    assertEq(address(proxy.connext()), _connext);
    assertEq(address(proxy.spokeConnector()), _spokeConnector);
    assertEq(proxy.gelatoRelayer(), _gelatoRelayer);
    assertEq(proxy.feeCollector(), _feeCollector);
  }

  function test_RelayerProxyHub__setRootManager_onlyOwner_failsIfNotOwner(address sender) public {
    vm.assume(sender != OWNER);
    vm.prank(sender);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    proxy.setRootManager(address(123));
  }

  function test_RelayerProxyHub__setRootManager_onlyOwner_works() public {
    vm.prank(OWNER);
    vm.expectEmit(true, true, true, true);
    emit RootManagerChanged(address(123), address(12335558));
    proxy.setRootManager(address(123));
    assertEq(address(proxy.rootManager()), address(123));
  }

  function test_RelayerProxyHub__setPropagateCooldown_onlyOwner_failsIfNotOwner(address sender) public {
    vm.assume(sender != OWNER);
    vm.prank(sender);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    proxy.setPropagateCooldown(123);
  }

  function test_RelayerProxyHub__setPropagateCooldown_onlyOwner_works() public {
    vm.prank(OWNER);
    vm.expectEmit(true, true, true, true);
    emit PropagateCooldownChanged(123, 300);
    proxy.setPropagateCooldown(123);
    assertEq(proxy.propagateCooldown(), 123);
  }

  function test_RelayerProxyHub__setHubConnector_onlyOwner_failsIfNotOwner(address sender) public {
    vm.assume(sender != OWNER);
    vm.prank(sender);
    vm.expectRevert(ProposedOwnable.ProposedOwnable__onlyOwner_notOwner.selector);
    proxy.setHubConnector(address(123), 123);
  }

  function test_RelayerProxyHub__setHubConnector_onlyOwner_works() public {
    vm.prank(OWNER);
    vm.expectEmit(true, true, true, true);
    emit HubConnectorChanged(address(123), address(0), 123);
    proxy.setHubConnector(address(123), 123);
    assertEq(proxy.hubConnectors(123), address(123));
  }

  function test_RelayerProxyHub__propagateWorkable_isFalseIfRootIsSame(bytes32 _root) public {
    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.dequeue.selector),
      abi.encode(_root, 123)
    );

    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.lastPropagatedRoot.selector),
      abi.encode(_root)
    );

    assertEq(proxy.propagateWorkable(), false);
  }

  function test_RelayerProxyHub__propagateWorkable_isTrue() public {
    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.dequeue.selector),
      abi.encode(vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001"), 123)
    );

    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.lastPropagatedRoot.selector),
      abi.encode(vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000002"))
    );

    assertEq(proxy.propagateWorkable(), true);
  }

  function test_RelayerProxyHub__propagate_failsIfNotGelatoRelayer(address sender) public {
    vm.assume(sender != _gelatoRelayer);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy.RelayerProxy__onlyRelayer_notRelayer.selector, sender));
    proxy.propagate(_hubConnectors, _messageFees, _encodedData, _relayerFee);
  }

  function test_RelayerProxyHub__propagate_works() public {
    utils_mockPropagate();
    vm.prank(_gelatoRelayer);
    vm.expectEmit(true, true, true, true);
    emit FundsDeducted(123 + 456, 1 ether);
    vm.expectEmit(true, true, true, true);
    emit FundsDeducted(123, 1 ether - 123);
    proxy.propagate(_hubConnectors, _messageFees, _encodedData, _relayerFee);
  }

  function test_RelayerProxyHub__propagateKeep3r_failsIfNotPriority(address sender) public {
    vm.assume(sender != _autonolas);
    vm.roll(100);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy.RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);

    vm.roll(101);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy.RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);

    vm.roll(102);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy.RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);

    vm.roll(103);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy.RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
  }

  function test_RelayerProxyHub__propagateKeep3r_doesNotWorkIfNotKeep3r(address sender) public {
    vm.assume(sender != _autonolas);
    vm.mockCall(address(_keep3r), abi.encodeWithSelector(IKeep3rV2.isKeeper.selector, sender), abi.encode(false));
    vm.roll(105);
    vm.prank(sender);
    vm.expectRevert(
      abi.encodeWithSelector(RelayerProxy.RelayerProxy__validateAndPayWithCredits_notKeep3r.selector, sender)
    );
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
  }

  function test_RelayerProxyHub__propagateKeep3r_worksIfAutonolas() public {
    utils_mockIsKeeper(_autonolas, true);
    utils_mockPropagate();
    vm.roll(100);
    vm.prank(_autonolas);
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
  }

  function test_RelayerProxyHub__propagateKeep3r_worksIfKeep3r(address sender) public {
    vm.assume(sender != _autonolas);
    utils_mockIsKeeper(sender, true);
    utils_mockPropagate();
    vm.roll(105);
    vm.prank(sender);
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
  }

  function test_RelayerProxyHub__propagateKeep3r_failsIfNotCooledDown() public {
    utils_mockIsKeeper(_gelatoRelayer, true);
    utils_mockPropagate();
    vm.roll(105);
    vm.prank(_gelatoRelayer);
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
    vm.expectRevert(
      abi.encodeWithSelector(
        RelayerProxyHub.RelayerProxyHub__propagateCooledDown_notCooledDown.selector,
        1648744712,
        1648745012
      )
    );
    vm.prank(_gelatoRelayer);
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
  }

  function test_RelayerProxyHub__processFromRootKeep3r_failsIfNotPriority(address sender) public {
    vm.assume(sender != _autonolas);
    vm.roll(100);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy.RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.processFromRootKeep3r(abi.encode("foo"), 137, bytes32(uint256(1)));

    vm.roll(101);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy.RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.processFromRootKeep3r(abi.encode("foo"), 137, bytes32(uint256(1)));

    vm.roll(102);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy.RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.processFromRootKeep3r(abi.encode("foo"), 137, bytes32(uint256(1)));

    vm.roll(103);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy.RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.processFromRootKeep3r(abi.encode("foo"), 137, bytes32(uint256(1)));
  }

  function test_RelayerProxyHub__processFromRootKeep3r_doesNotWorkIfNotKeep3r(address sender) public {
    vm.assume(sender != _autonolas);
    vm.mockCall(address(_keep3r), abi.encodeWithSelector(IKeep3rV2.isKeeper.selector, sender), abi.encode(false));
    vm.roll(105);
    vm.prank(sender);
    vm.expectRevert(
      abi.encodeWithSelector(RelayerProxy.RelayerProxy__validateAndPayWithCredits_notKeep3r.selector, sender)
    );
    proxy.processFromRootKeep3r(abi.encode("foo"), 137, bytes32(uint256(1)));
  }

  function test_RelayerProxyHub__processFromRootKeep3r_failsIfNoHubConnector() public {
    utils_mockIsKeeper(_autonolas, true);
    vm.roll(100);
    vm.prank(_autonolas);
    vm.expectRevert(
      abi.encodeWithSelector(RelayerProxyHub.RelayerProxyHub__processFromRoot_noHubConnector.selector, 1234567)
    );
    proxy.processFromRootKeep3r(abi.encode("foo"), 1234567, bytes32(uint256(1)));
  }

  function test_RelayerProxyHub__processFromRootKeep3r_worksForGnosis() public {
    utils_mockIsKeeper(_autonolas, true);
    vm.mockCall(
      _hubConnectors[0],
      abi.encodeWithSelector(IGnosisHubConnector.executeSignatures.selector),
      abi.encode()
    );
    vm.roll(100);
    vm.prank(_autonolas);
    IGnosisHubConnector.GnosisRootMessageData memory params = IGnosisHubConnector.GnosisRootMessageData({
      _data: abi.encode("data"),
      _signatures: abi.encode("signatures")
    });
    proxy.processFromRootKeep3r(abi.encode(params), 100, bytes32(uint256(1)));

    vm.mockCall(
      _hubConnectors[1],
      abi.encodeWithSelector(IGnosisHubConnector.executeSignatures.selector),
      abi.encode()
    );
    vm.prank(_autonolas);
    proxy.processFromRootKeep3r(abi.encode(params), 10200, bytes32(uint256(1)));
  }

  function test_RelayerProxyHub__processFromRootKeep3r_worksForArbitrum() public {
    utils_mockIsKeeper(_autonolas, true);
    vm.mockCall(
      _hubConnectors[2],
      abi.encodeWithSelector(IArbitrumHubConnector.processMessageFromRoot.selector),
      abi.encode()
    );
    vm.roll(100);
    vm.prank(_autonolas);
    bytes32[] memory _proof = new bytes32[](1);
    _proof[0] = bytes32(uint256(1));
    IArbitrumHubConnector.ArbitrumRootMessageData memory params = IArbitrumHubConnector.ArbitrumRootMessageData({
      _nodeNum: 42,
      _sendRoot: bytes32(uint256(2)),
      _blockHash: bytes32(uint256(3)),
      _proof: _proof,
      _index: 69,
      _message: IArbitrumHubConnector.L2Message({
        l2Sender: address(0),
        to: address(1),
        l2Block: 24,
        l1Block: 48,
        l2Timestamp: 256,
        value: 10,
        callData: abi.encode("data")
      })
    });
    proxy.processFromRootKeep3r(abi.encode(params), 42161, bytes32(uint256(4)));

    vm.mockCall(
      _hubConnectors[3],
      abi.encodeWithSelector(IArbitrumHubConnector.processMessageFromRoot.selector),
      abi.encode()
    );
    vm.prank(_autonolas);
    proxy.processFromRootKeep3r(abi.encode(params), 421613, bytes32(uint256(4)));
  }

  function test_RelayerProxyHub__processFromRootKeep3r_worksForOptimism() public {
    utils_mockIsKeeper(_autonolas, true);
    vm.mockCall(
      _hubConnectors[4],
      abi.encodeWithSelector(IOptimismHubConnector.processMessageFromRoot.selector),
      abi.encode()
    );
    vm.roll(100);
    vm.prank(_autonolas);
    Types.WithdrawalTransaction memory _tx = Types.WithdrawalTransaction({
      nonce: 0,
      sender: address(0),
      target: address(1),
      value: 10,
      gasLimit: 100,
      data: abi.encode("data")
    });
    Types.OutputRootProof memory _outputRootProof = Types.OutputRootProof({
      version: bytes32(uint256(1)),
      stateRoot: bytes32(uint256(2)),
      messagePasserStorageRoot: bytes32(uint256(3)),
      latestBlockhash: bytes32(uint256(4))
    });
    bytes[] memory _withdrawalProof = new bytes[](1);
    _withdrawalProof[0] = abi.encode("withdrawalProof");
    IOptimismHubConnector.OptimismRootMessageData memory params = IOptimismHubConnector.OptimismRootMessageData({
      _tx: _tx,
      _l2OutputIndex: 42,
      _outputRootProof: _outputRootProof,
      _withdrawalProof: _withdrawalProof
    });
    proxy.processFromRootKeep3r(abi.encode(params), 10, bytes32(uint256(1)));

    vm.mockCall(
      _hubConnectors[5],
      abi.encodeWithSelector(IOptimismHubConnector.processMessageFromRoot.selector),
      abi.encode()
    );
    vm.prank(_autonolas);
    proxy.processFromRootKeep3r(abi.encode(params), 420, bytes32(uint256(1)));
  }

  function test_RelayerProxyHub__processFromRootKeep3r_worksForZkSync() public {
    utils_mockIsKeeper(_autonolas, true);
    vm.mockCall(
      _hubConnectors[6],
      abi.encodeWithSelector(IZkSyncHubConnector.processMessageFromRoot.selector),
      abi.encode()
    );
    vm.roll(100);
    vm.prank(_autonolas);
    IZkSyncHubConnector.ZkSyncRootMessageData memory params = IZkSyncHubConnector.ZkSyncRootMessageData({
      _l2BlockNumber: 42,
      _l2MessageIndex: 69,
      _l2TxNumberInBlock: 24,
      _message: abi.encode("data"),
      _proof: new bytes32[](1)
    });
    proxy.processFromRootKeep3r(abi.encode(params), 324, bytes32(uint256(1)));

    vm.mockCall(
      _hubConnectors[7],
      abi.encodeWithSelector(IZkSyncHubConnector.processMessageFromRoot.selector),
      abi.encode()
    );
    vm.prank(_autonolas);
    proxy.processFromRootKeep3r(abi.encode(params), 280, bytes32(uint256(1)));
  }

  function test_RelayerProxyHub__processFromRootKeep3r_worksForPolygon() public {
    utils_mockIsKeeper(_autonolas, true);
    vm.mockCall(_hubConnectors[8], abi.encodeWithSelector(IPolygonHubConnector.receiveMessage.selector), abi.encode());
    vm.roll(100);
    vm.prank(_autonolas);
    proxy.processFromRootKeep3r(abi.encode("params"), 137, bytes32(uint256(1)));

    vm.mockCall(_hubConnectors[9], abi.encodeWithSelector(IPolygonHubConnector.receiveMessage.selector), abi.encode());
    vm.prank(_autonolas);
    proxy.processFromRootKeep3r(abi.encode("params"), 80001, bytes32(uint256(1)));
  }

  function test_RelayerProxyHub__processFromRootKeep3r_failsForDuplicates() public {
    utils_mockIsKeeper(_autonolas, true);
    vm.mockCall(_hubConnectors[8], abi.encodeWithSelector(IPolygonHubConnector.receiveMessage.selector), abi.encode());
    vm.roll(100);
    vm.prank(_autonolas);
    proxy.processFromRootKeep3r(abi.encode("params"), 137, bytes32(uint256(1)));

    vm.prank(_autonolas);
    vm.expectRevert(
      abi.encodeWithSelector(
        RelayerProxyHub.RelayerProxyHub__processFromRoot_alreadyProcessed.selector,
        137,
        bytes32(uint256(1))
      )
    );
    proxy.processFromRootKeep3r(abi.encode("params"), 137, bytes32(uint256(1)));
  }
}
