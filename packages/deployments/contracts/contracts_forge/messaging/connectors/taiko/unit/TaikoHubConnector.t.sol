// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../../../../../contracts/messaging/connectors/Connector.sol";
import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {TaikoHubConnector} from "../../../../../contracts/messaging/connectors/taiko/TaikoHubConnector.sol";
import {IBridge} from "../../../../../contracts/messaging/interfaces/ambs/taiko/IBridge.sol";
import {IRootManager} from "../../../../../contracts/messaging/interfaces/IRootManager.sol";

/**
 * @dev For test contract to access internal functions of `TaikoHubConnector`
 */
contract TaikoHubConnectorForTest is TaikoHubConnector {
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _taikoBridge,
    uint256 _spokeChainId,
    uint256 _gasCap
  )
    TaikoHubConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _taikoBridge,
      _spokeChainId,
      _gasCap
    )
  {}

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

/**
 * @dev Base contract for the `TaikoHubConnector` unit tests contracts to inherit from
 */
contract Base is ConnectorHelper {
  // The taiko l2 chain id
  uint256 public constant SPOKE_CHAIN_ID = 167007;

  address public user = makeAddr("user");
  address public owner = makeAddr("owner");
  address public taikoBridge = makeAddr("taikoBridge");
  address public offChainAgent = makeAddr("offChainAgent");
  TaikoHubConnectorForTest public taikoHubConnector;

  /**
   * @notice Deploys a new `TaikoHubConnectorForTest` contract instance
   */
  function setUp() public {
    vm.prank(owner);
    taikoHubConnector = new TaikoHubConnectorForTest(
      _l1Domain,
      _l2Domain,
      _amb,
      _rootManager,
      _l2Connector,
      taikoBridge,
      SPOKE_CHAIN_ID,
      _gasCap
    );
  }
}

contract Unit_Connector_TaikoHubConnector_Constructor is Base {
  /**
   * @notice Tests the values of the constructor arguments
   */
  function test_checkConstructorArgs() public {
    assertEq(taikoHubConnector.DOMAIN(), _l1Domain);
    assertEq(taikoHubConnector.MIRROR_DOMAIN(), _l2Domain);
    assertEq(taikoHubConnector.AMB(), _amb);
    assertEq(taikoHubConnector.ROOT_MANAGER(), _rootManager);
    assertEq(taikoHubConnector.mirrorConnector(), _l2Connector);
    assertEq(address(taikoHubConnector.BRIDGE()), taikoBridge);
    assertEq(taikoHubConnector.MIRROR_CHAIN_ID(), SPOKE_CHAIN_ID);
    assertEq(taikoHubConnector.gasCap(), _gasCap);
  }
}

contract Unit_Connector_TaikoHubConnector_SendMessage is Base {
  /**
   * @notice Tests that reverts when called with invalid length data
   * @param _data Message data
   * @param _encodedData Encoded data
   */
  function test_revertIfDataIsNot32Length(bytes memory _data, bytes memory _encodedData) public {
    vm.assume(_data.length != ROOT_LENGTH);
    vm.prank(user);
    vm.expectRevert(TaikoHubConnector.TaikoHubConnector_LengthIsNot32.selector);
    taikoHubConnector.forTest_sendMessage(_data, _encodedData);
  }

  /**
   * @notice Tests that Taiko Bridge's `sendMessage()` is called with the expected message.
   * It should be called with the zero address since `_encodedData` is empty
   * @param _root The root to be sent
   */
  function test_callSendMessage(bytes32 _root) public {
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, abi.encode(_root));
    // Declare the expected message
    IBridge.Message memory _expectedMsg = IBridge.Message({
      id: 0,
      from: address(taikoHubConnector),
      srcChainId: block.chainid,
      destChainId: SPOKE_CHAIN_ID,
      user: user,
      to: _l2Connector,
      refundTo: _l2Connector,
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
    taikoHubConnector.forTest_sendMessage(_data, _encodedData);
  }
}

contract Unit_Connector_TaikoHubConnector_ProcessMessage is Base {
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
    vm.expectRevert(TaikoHubConnector.TaikoHubConnector_LengthIsNot32.selector);
    taikoHubConnector.forTest_processMessage(_data);
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
    vm.assume(_srcChainId != SPOKE_CHAIN_ID);
    _happyPath(_msgHash, _from, _srcChainId);

    // Expect `processMessage` to revert with `TaikoHubConnector_SourceChainNotSpoke` error
    vm.expectRevert(TaikoHubConnector.TaikoHubConnector_SourceChainNotSpoke.selector);

    vm.prank(user);
    bytes memory _data = abi.encode(_root);
    taikoHubConnector.forTest_processMessage(_data);
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
    vm.assume(_from != _l2Connector);
    _srcChainId = SPOKE_CHAIN_ID;
    _happyPath(_msgHash, _from, _srcChainId);

    // Expect `processMessage` to revert with `TaikoHubConnector_SourceChainNotSpoke` error
    vm.expectRevert(TaikoHubConnector.TaikoHubConnector_OriginSenderNotMirror.selector);

    vm.prank(user);
    bytes memory _data = abi.encode(_root);
    taikoHubConnector.forTest_processMessage(_data);
  }

  /**
   * @notice Tests that `aggregate` is called with the expected arguments
   * @param _msgHash The message hash
   * @param _root The root to be sent
   */
  function test_callAggregate(bytes32 _msgHash, bytes32 _root) public {
    // Set `from` and `srcChainId` to valid values
    address _from = _l2Connector;
    uint256 _srcChainId = SPOKE_CHAIN_ID;
    _happyPath(_msgHash, _from, _srcChainId);

    // Mock the call over `aggregate` and expect it to be properly called
    _mockAndExpect(
      _rootManager,
      abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _root),
      abi.encode("")
    );

    vm.prank(user);
    bytes memory _data = abi.encode(_root);
    taikoHubConnector.forTest_processMessage(_data);
  }
}

contract Unit_Connector_TaikoHubConnector_VerifySender is Base {
  /**
   * @notice Tests that returns false if the origin sender is not the mirror connector
   * @param _from The message's origin sender address
   */
  function test_returnFalse(address _from) public {
    vm.assume(_from != _l2Connector);
    assertEq(taikoHubConnector.forTest_verifySender(_from), false);
  }

  /**
   * @notice Tests that returns true if the origin sender is the mirror connector
   */
  function test_returnTrue() public {
    address _from = _l2Connector;
    assertEq(taikoHubConnector.forTest_verifySender(_from), true);
  }
}
