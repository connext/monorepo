// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {SpokeConnector} from "../../../../../contracts/messaging/connectors/SpokeConnector.sol";
import {TaikoSpokeConnector} from "../../../../../contracts/messaging/connectors/taiko/TaikoSpokeConnector.sol";
import {IBridge} from "../../../../../contracts/messaging/interfaces/ambs/taiko/IBridge.sol";
import {IRootManager} from "../../../../../contracts/messaging/interfaces/IRootManager.sol";

/**
 * @dev For test contract to access internal functions of `TaikoSpokeConnector`
 */
contract TaikoSpokeConnectorForTest is TaikoSpokeConnector {
  constructor(
    SpokeConnector.ConstructorParams memory _constructorParams,
    uint256 _hubChainId,
    uint256 _gasCap
  ) TaikoSpokeConnector(_constructorParams, _hubChainId, _gasCap) {}

  function forTest_sendMessage(bytes memory _data, bytes memory _extraData) external {
    _sendMessage(_data, _extraData);
  }

  function forTest_processMessage(bytes memory _data) external {
    _processMessage(_data);
  }

  function forTest_verifySender(address _expected) external view returns (bool _isValid) {
    _isValid = _verifySender(_expected);
  }
}

contract Base is ConnectorHelper {
  // The Ethereum chain id
  uint256 public constant HUB_CHAIN_ID = 1;

  address public owner = makeAddr("owner");
  address public user = makeAddr("user");
  address public taikoBridge = makeAddr("taikoBridge");
  address public merkleTreeManager = makeAddr("MerkleTreeManager");
  address public watcherManager = makeAddr("WatcherManager");

  TaikoSpokeConnectorForTest public taikoSpokeConnector;

  /**
   * @notice Deploys a new `TaikoSpokeConnectorForTest` contract instance
   */
  function setUp() public {
    vm.prank(owner);
    SpokeConnector.ConstructorParams memory _params = SpokeConnector.ConstructorParams({
      domain: _l1Domain,
      mirrorDomain: _l2Domain,
      amb: taikoBridge,
      rootManager: _rootManager,
      mirrorConnector: _l1Connector,
      processGas: _processGas,
      reserveGas: _reserveGas,
      delayBlocks: DELAY_BLOCKS,
      merkle: merkleTreeManager,
      watcherManager: watcherManager,
      minDisputeBlocks: _minDisputeBlocks,
      disputeBlocks: _disputeBlocks
    });
    taikoSpokeConnector = new TaikoSpokeConnectorForTest(_params, HUB_CHAIN_ID, _gasCap);
  }
}

contract Unit_Connector_TaikoSpokeConnector_Constructor is Base {
  /**
   * @notice Tests the values of constructor arguments
   */
  function test_checkConstructorArgs() public {
    assertEq(taikoSpokeConnector.DOMAIN(), _l1Domain);
    assertEq(taikoSpokeConnector.MIRROR_DOMAIN(), _l2Domain);
    assertEq(taikoSpokeConnector.AMB(), taikoBridge);
    assertEq(taikoSpokeConnector.ROOT_MANAGER(), _rootManager);
    assertEq(taikoSpokeConnector.mirrorConnector(), _l1Connector);
    assertEq(taikoSpokeConnector.PROCESS_GAS(), _processGas);
    assertEq(taikoSpokeConnector.RESERVE_GAS(), _reserveGas);
    assertEq(taikoSpokeConnector.delayBlocks(), DELAY_BLOCKS);
    assertEq(address(taikoSpokeConnector.MERKLE()), merkleTreeManager);
    assertEq(address(taikoSpokeConnector.watcherManager()), watcherManager);
    assertEq(taikoSpokeConnector.minDisputeBlocks(), _minDisputeBlocks);
    assertEq(taikoSpokeConnector.disputeBlocks(), _disputeBlocks);
    assertEq(address(taikoSpokeConnector.BRIDGE()), taikoBridge);
    assertEq(taikoSpokeConnector.MIRROR_CHAIN_ID(), HUB_CHAIN_ID);
    assertEq(taikoSpokeConnector.gasCap(), _gasCap);
  }
}

contract Unit_Connector_TaikoSpokeConnector_RenounceOwnership is Base {
  /**
   * @notice Tests that reverts when `renounceOwnership` is called
   */
  function test_revertIfCalled() public {
    vm.expectRevert(TaikoSpokeConnector.TaikoSpokeConnector_NotImplementedMethod.selector);
    vm.prank(owner);
    taikoSpokeConnector.renounceOwnership();
  }
}

contract Unit_Connector_TaikoSpokeConnector_SendMessage is Base {
  /**
   * @notice Tests that reverts when called with invalid length data
   * @param _data Message data
   * @param _encodedData Encoded data
   */
  function test_revertIfDataIsNot32Length(bytes memory _data, bytes memory _encodedData) public {
    vm.assume(_data.length != ROOT_LENGTH);
    vm.prank(user);
    vm.expectRevert(TaikoSpokeConnector.TaikoSpokeConnector_LengthIsNot32.selector);
    taikoSpokeConnector.forTest_sendMessage(_data, _encodedData);
  }

  /**
   * @notice Tests that Taiko Bridge's `sendMessage()` is called with the expected message.
   * It should be called with the zero address since `_encodedData` is empty
   * @param _root The root to be sent
   */
  function test_callSendMessage(bytes32 _root) public {
    // Declare the calldata of the `processMessage` function with the root as argument
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, abi.encode(_root));
    // Declare the expected message
    IBridge.Message memory _expectedMsg = IBridge.Message({
      id: 0,
      from: address(taikoSpokeConnector),
      srcChainId: block.chainid,
      destChainId: HUB_CHAIN_ID,
      user: user,
      to: _l1Connector,
      refundTo: _l1Connector,
      value: 0,
      fee: 0,
      gasLimit: _gasCap,
      data: _calldata,
      memo: ""
    });

    // Expect `sendMessage` function to be called
    _mockAndExpect(
      taikoBridge,
      abi.encodeWithSelector(IBridge.sendMessage.selector, _expectedMsg),
      abi.encode(keccak256(abi.encode(_expectedMsg)))
    );
    // Call `sendMessage` function
    vm.prank(user);
    bytes memory _data = abi.encode(_root);
    bytes memory _encodedData = "";
    taikoSpokeConnector.forTest_sendMessage(_data, _encodedData);
  }
}

contract Unit_Connector_TaikoSpokeConnector_ProcessMessage is Base {
  /**
   * @notice Emitted on `processMessage` function call when the aggregate root is received
   * @param root Delivered root
   */
  event AggregateRootReceived(bytes32 indexed root);

  /**
   * @notice Helper function to mock the call over `context` and expect it to be called
   * @param _msgHash The message hash
   * @param _from The message's origin sender address
   * @param _srcChainId The message's source chain id
   */
  function _happyPath(bytes32 _msgHash, address _from, uint256 _srcChainId) internal {
    // Mock the call over `context` with the return of the message context and expect it to be called
    IBridge.Context memory _context = IBridge.Context({msgHash: _msgHash, from: _from, srcChainId: _srcChainId});
    _mockAndExpect(taikoBridge, abi.encodeWithSelector(IBridge.context.selector), abi.encode(_context));
  }

  /**
   * @notice Tests that reverts when called with invalid length data
   * @param _data Message data
   */
  function test_revertIfDataIsNot32Length(bytes memory _data) public {
    vm.assume(_data.length != ROOT_LENGTH);
    vm.prank(user);
    vm.expectRevert(TaikoSpokeConnector.TaikoSpokeConnector_LengthIsNot32.selector);
    taikoSpokeConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that reverts when the source chain id is not the spoke chain id
   * @param _msgHash The message hash
   * @param _from The message's origin sender address
   * @param _srcChainId The message's source chain id
   * @param _root The root to be sent
   */
  function test_revertIfInvalidSrcChain(bytes32 _msgHash, address _from, uint256 _srcChainId, bytes32 _root) public {
    // Assume that src chain id is different from the spoke chain id on the message context
    vm.assume(_srcChainId != HUB_CHAIN_ID);
    _happyPath(_msgHash, _from, _srcChainId);

    // Expect `processMessage` to revert with `TaikoSpokeConnector_SourceChainNotSpoke` error
    vm.expectRevert(TaikoSpokeConnector.TaikoSpokeConnector_SourceChainNotHub.selector);

    vm.prank(user);
    bytes memory _data = abi.encode(_root);
    taikoSpokeConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that reverts when the origin sender is not the mirror connector
   * @param _msgHash The message hash
   * @param _from The message's origin sender address
   * @param _srcChainId The message's source chain id
   * @param _root The root to be sent
   */
  function test_revertIfOriginSenderNotMirror(
    bytes32 _msgHash,
    address _from,
    uint256 _srcChainId,
    bytes32 _root
  ) public {
    // Assume `from` is invalid and `srcChainId` is valid
    vm.assume(_from != _l1Connector);
    _srcChainId = HUB_CHAIN_ID;
    _happyPath(_msgHash, _from, _srcChainId);

    // Expect `processMessage` to revert with `TaikoSpokeConnector_SourceChainNotSpoke` error
    vm.expectRevert(TaikoSpokeConnector.TaikoSpokeConnector_OriginSenderNotMirror.selector);

    vm.prank(user);
    bytes memory _data = abi.encode(_root);
    taikoSpokeConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that `aggregate` is called with the expected arguments
   * @param _msgHash The message hash
   * @param _root The root to be sent
   */
  function test_receiveAggregateRoot(bytes32 _msgHash, bytes32 _root) public {
    vm.assume(_root != bytes32(""));
    // Set `from` and `srcChainId` to valid values
    address _from = _l1Connector;
    uint256 _srcChainId = HUB_CHAIN_ID;
    _happyPath(_msgHash, _from, _srcChainId);

    // Expect `AggregateRootReceived` event to be emitted with the root as argument
    vm.expectEmit(true, true, true, true, address(taikoSpokeConnector));
    emit AggregateRootReceived(_root);

    vm.prank(user);
    bytes memory _data = abi.encode(_root);
    taikoSpokeConnector.forTest_processMessage(_data);
  }
}

contract Unit_Connector_TaikoSpokeConnector_VerifySender is Base {
  /**
   * @notice Tests that returns false if the sender is not the expected one
   * @param _from The message's origin sender address
   */
  function test_returnFalse(address _from) public {
    vm.assume(_from != _l1Connector);
    assertEq(taikoSpokeConnector.forTest_verifySender(_from), false);
  }

  /**
   * @notice Tests that returns true if the sender is the expected one
   */
  function test_returnTrue() public {
    assertEq(taikoSpokeConnector.forTest_verifySender(_l1Connector), true);
  }
}
