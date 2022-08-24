// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import {Connector} from "../../../../contracts/core/messaging/connectors/Connector.sol";
import {BSCL1Connector, BSCL2Connector, MultichainCall} from "../../../../contracts/core/messaging/connectors/BSCConnector.sol";

import "../../../utils/ConnectorHelper.sol";
import "../../../utils/Mock.sol";

contract BscConnectorTest is ConnectorHelper {
  using stdStorage for StdStorage;

  // ============ Storage ============
  address _executor = address(bytes20(keccak256("_executor")));

  // ============ Test set up ============
  function setUp() public {
    // Mock the call to retrieve the executor in the base BSC constructor
    vm.etch(_amb, new bytes(0x69));
    vm.mockCall(_amb, abi.encodeCall(MultichainCall.executor, ()), abi.encode(_executor));

    // Get the n+1 deployment address
    address _futureL2address = addressFrom(_owner, vm.getNonce(_owner) + 1);

    // Deploy
    vm.prank(_owner);
    _l1Connector = address(
      new BSCL1Connector(
        _l1Domain,
        _l2Domain,
        _amb,
        _rootManager,
        _futureL2address,
        _mirrorProcessGas,
        _processGas,
        _reserveGas
      )
    );

    vm.prank(_owner);
    _l2Connector = address(
      new BSCL2Connector(
        _l2Domain,
        _l1Domain,
        _amb,
        _rootManager,
        _l1Connector,
        _mirrorProcessGas,
        _processGas,
        _reserveGas
      )
    );

    // Sanity check
    require(_futureL2address == _l2Connector, "BSCConnector Test Setup fail: l2Connector address mispredicted");
  }

  // ============ Utils ============
  function test_BSCConnector_setMirrorConnector_setMirrorConnectorAndEmitEvent(address _newMirror) public {
    address _currentMirror = BSCL1Connector(_l1Connector).mirrorConnector();

    vm.expectEmit(false, false, false, true, _l1Connector);
    emit MirrorConnectorUpdated(_currentMirror, _newMirror);

    vm.prank(_owner);
    BSCL1Connector(_l1Connector).setMirrorConnector(_newMirror);

    // Check: mirror updated?
    assertEq(BSCL1Connector(_l1Connector).mirrorConnector(), _newMirror);
  }

  function test_BSCConnector_setMirrorConnector_revertIfNotOwner(address _nonOwner, address _newMirror) public {
    vm.assume(_nonOwner != _owner);

    vm.expectRevert(abi.encodeWithSignature("ProposedOwnable__onlyOwner_notOwner()"));
    vm.prank(_nonOwner);
    BSCL1Connector(_l1Connector).setMirrorConnector(_newMirror);
  }

  function test_BSCConnector_addSender_addSenderAndEmitEvent(address _newSender) public {
    // Check: new sender not whitelisted by default?
    assertFalse(BSCL1Connector(_l1Connector).whitelistedSenders(_newSender));

    vm.expectEmit(false, false, false, true, _l1Connector);
    emit SenderAdded(_newSender);

    vm.prank(_owner);
    BSCL1Connector(_l1Connector).addSender(_newSender);

    // Check: sender now whitelisted?
    assertTrue(BSCL1Connector(_l1Connector).whitelistedSenders(_newSender));
  }

  function test_BSCConnector_addSender_revertIfNotOwner(address _nonOwner, address _newSender) public {
    vm.assume(_nonOwner != _owner);

    vm.expectRevert(abi.encodeWithSignature("ProposedOwnable__onlyOwner_notOwner()"));
    vm.prank(_nonOwner);
    BSCL1Connector(_l1Connector).addSender(_newSender);
  }

  function test_BSCConnector_removeSender_removeSenderAndEmitEvent(address _senderToRemove) public {
    // Setup: set the address as whitelisted
    stdstore
      .target(_l1Connector)
      .sig(IConnector.whitelistedSenders.selector)
      .with_key(_senderToRemove)
      .depth(0)
      .checked_write(true);

    // Check: sender previously whitelisted?
    assertTrue(BSCL1Connector(_l1Connector).whitelistedSenders(_senderToRemove));

    vm.expectEmit(false, false, false, true, _l1Connector);
    emit SenderRemoved(_senderToRemove);

    vm.prank(_owner);
    BSCL1Connector(_l1Connector).removeSender(_senderToRemove);

    // Check: sender now removed?
    assertFalse(BSCL1Connector(_l1Connector).whitelistedSenders(_senderToRemove));
  }

  function test_BSCConnector_removeSender_revertIfNotOwner(address _nonOwner, address _senderToRemove) public {
    vm.assume(_nonOwner != _owner);

    // Setup: set the address as whitelisted
    stdstore
      .target(_l1Connector)
      .sig(IConnector.whitelistedSenders.selector)
      .with_key(_senderToRemove)
      .depth(0)
      .checked_write(true);

    vm.expectRevert(abi.encodeWithSignature("ProposedOwnable__onlyOwner_notOwner()"));
    vm.prank(_nonOwner);
    BSCL1Connector(_l1Connector).removeSender(_senderToRemove);
  }

  // ============ sendMessage ============
  function test_BSCL1_sendMessage_sendMessageAndEmitEvent(bytes memory _data) public {
    // Mock the call to anyCall
    vm.mockCall(
      _amb,
      abi.encodeCall(
        MultichainCall.anyCall,
        (
          _amb,
          _data,
          address(0), // fallback address
          56, // chain id
          0
        ) // fee on destination
      ),
      abi.encode()
    );

    // Check: correct event?
    vm.expectEmit(false, false, false, true, _l1Connector);
    emit MessageSent(_data, _rootManager);

    // Check: call to multichain anyCall?
    vm.expectCall(_amb, abi.encodeCall(MultichainCall.anyCall, (_amb, _data, address(0), 56, 0)));

    vm.prank(_rootManager);
    BSCL1Connector(_l1Connector).sendMessage(_data);
  }

  function test_BSCL2_sendMessage_sendMessageAndEmitEvent() public {}

  // test_BSCL1 revert if sender != root manager
  // id L2?

  // ============ processMessage ============

  // L1&L2 process message and set root
  // L1&L2 revert if sender != _amb
  // L1&L2 revert if msg length != 32

  // ============ verifySender ============
  // return true if sender and executor are amb and correct executor
  // return false if wrong executor
  // reverse if sender != amb
}
