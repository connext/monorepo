// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {ConnectorHelper} from "../../../../utils/ConnectorHelper.sol";
import {SygmaHubConnector, IRootManager, IBridge} from "../../../../../contracts/messaging/connectors/sygma/SygmaHubConnector.sol";

/**
 * @dev For test contract to access internal functions of `SygmaHubConnector`
 */
contract SygmaHubConnectorForTest is SygmaHubConnector {
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    address _permissionlessHandler,
    uint256 _gasCap
  ) SygmaHubConnector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector, _permissionlessHandler, _gasCap) {}

  function forTest_sendMessage(bytes memory _root, bytes memory _encodedData) external {
    _sendMessage(_root, _encodedData);
  }

  function forTest_verifySender(address _expected) external view returns (bool _isValid) {
    _isValid = _verifySender(_expected);
  }
}

/**
 * @dev Base contract for the `SygmaHubConnector` unit tests contracts to inherit from
 */
contract Base is ConnectorHelper {
  address public user = makeAddr("user");
  address public permissionlessHandler = makeAddr("permissionlessHandler");
  address public watcherManager = makeAddr("watcherManager");
  SygmaHubConnectorForTest public sygmaHubConnector;

  /**
   * @notice Deploys a new `SygmaHubConnectorForTest` contract instance
   */
  function setUp() public {
    vm.prank(_owner);
    sygmaHubConnector = new SygmaHubConnectorForTest(
      _l1Domain,
      _l2Domain,
      _amb,
      _rootManager,
      _l2Connector,
      permissionlessHandler,
      _gasCap
    );
  }
}

contract Unit_Connector_SygmaHubConnector_Constructor is Base {
  /**
   * @notice Tests the values of the constructor arguments
   */
  function test_checkConstructorArgs() public {
    assertEq(sygmaHubConnector.DOMAIN(), _l1Domain);
    assertEq(sygmaHubConnector.MIRROR_DOMAIN(), _l2Domain);
    assertEq(sygmaHubConnector.AMB(), _amb);
    assertEq(sygmaHubConnector.ROOT_MANAGER(), _rootManager);
    assertEq(sygmaHubConnector.mirrorConnector(), _l2Connector);
    assertEq(sygmaHubConnector.PERMISSIONLESS_HANDLER(), permissionlessHandler);
    assertEq(sygmaHubConnector.gasCap(), _gasCap);
  }
}

contract Unit_Connector_SygmaHubConnector_ReceiveMessage is Base {
  /**
   * @notice Tests it reverts when the caller is not the permissionless handler
   * @param _caller The address of the caller
   * @param _originSender The address of the origin sender
   * @param _root The message's root
   */
  function test_revertIfCallerNotHandler(address _caller, address _originSender, bytes32 _root) public {
    vm.assume(_caller != sygmaHubConnector.PERMISSIONLESS_HANDLER());
    vm.expectRevert(SygmaHubConnector.SygmaHubConnector_OnlyPermissionedHandler.selector);
    vm.prank(_caller);
    sygmaHubConnector.receiveMessage(_originSender, _root);
  }

  /**
   * @notice Tests it reverts when the origin sender is not the mirror connector
   * @param _originSender The address of the origin sender
   * @param _root The message's root
   */
  function test_revertIfOriginNotMirror(address _originSender, bytes32 _root) public {
    vm.assume(_originSender != _l2Connector);
    vm.expectRevert(SygmaHubConnector.SygmaHubConnector_OriginIsNotMirrorConnector.selector);
    vm.prank(permissionlessHandler);
    sygmaHubConnector.receiveMessage(_originSender, _root);
  }

  /**
   * @notice Tests it calls `aggregate` on the root manager
   * @param _root The message's root
   */
  function test_callAggregate(bytes32 _root) public {
    _mockAndExpect(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _root), "");
    vm.prank(permissionlessHandler);
    sygmaHubConnector.receiveMessage(_l2Connector, _root);
  }

  function test_emitMessageProcessed(bytes32 _root) public {
    _mockAndExpect(_rootManager, abi.encodeWithSelector(IRootManager.aggregate.selector, _l2Domain, _root), "");

    vm.expectEmit(true, true, true, true, address(sygmaHubConnector));
    emit MessageProcessed(abi.encodePacked(_root), permissionlessHandler);

    vm.prank(permissionlessHandler);
    sygmaHubConnector.receiveMessage(_l2Connector, _root);
  }
}

contract Unit_Connector_SygmaHubConnector_SendMessage is Base {
  /**
   * @notice Tests it reverts when the root length in bytes is not 32
   * @param _root The message's root
   * @param _encodedData The encoded data
   */
  function test_revertIfDataNotRootLength(bytes memory _root, bytes memory _encodedData) public {
    vm.assume(_root.length != ROOT_LENGTH);
    vm.expectRevert(SygmaHubConnector.SygmaHubConnector_DataLengthIsNot32.selector);
    vm.prank(user);
    sygmaHubConnector.forTest_sendMessage(_root, _encodedData);
  }

  /**
   * @notice Tests it calls deposit` on the sygma bridge
   * @param _root The message's root
   * @param _sygmaDomainId The sygma domain id
   * @param _feeData The fee data
   * @param _depositNonce The deposit nonce
   * @param _handlerResponse The handler response
   */
  function test_callDeposit(
    bytes32 _root,
    uint8 _sygmaDomainId,
    bytes memory _feeData,
    uint64 _depositNonce,
    bytes memory _handlerResponse
  ) public {
    // Parse the deposit data
    bytes memory _depositData = sygmaHubConnector.parseDepositData(_root, _l2Connector);
    // Encode the sigma domain id (destination) and the fee data
    bytes memory _encodedData = abi.encode(_sygmaDomainId, _feeData);
    // Expect `deposit` to be called on the sygmabridge
    _mockAndExpect(
      _amb,
      abi.encodeWithSelector(
        IBridge.deposit.selector,
        _sygmaDomainId,
        sygmaHubConnector.PERMISSIONLESS_HANDLER_ID(),
        _depositData,
        _feeData
      ),
      abi.encode(_depositNonce, _handlerResponse)
    );

    vm.prank(user);
    sygmaHubConnector.forTest_sendMessage(abi.encodePacked(_root), _encodedData);
  }
}

contract Unit_Connector_SygmaHubConnector_VerifySender is Base {
  /**
   * @notice Tests it returns false if the origin sender is not the mirror connector
   * @param _originSender The address of the origin sender
   */
  function test_returnFalseIfOriginSenderNotMirror(address _originSender) public {
    vm.assume(_originSender != _l2Connector);
    assertEq(sygmaHubConnector.forTest_verifySender(_originSender), false);
  }

  function test_returnTrueIfOriginSenderIsMirror() public {
    /**
     * @notice Tests it returns true if the origin sender is the mirror connector
     */
    assertEq(sygmaHubConnector.forTest_verifySender(_l2Connector), true);
  }
}
