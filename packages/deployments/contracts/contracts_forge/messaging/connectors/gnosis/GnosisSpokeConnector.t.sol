// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import "../../../utils/ConnectorHelper.sol";

contract GnosisSpokeConnectorTest is ConnectorHelper {
  function setup() public {}

  // ============ GnosisSpokeConnector.verifySender ============
  function test_GnosisSpokeConnector__verifySender_shouldWorkIfTrue() public {}

  function test_GnosisSpokeConnector__verifySender_shouldWorkIfFalse() public {}

  function test_GnosisSpokeConnector__verifySender_shouldFailIfCallerNotAmb() public {}

  // ============ GnosisSpokeConnector._sendMessage ============
  function test_GnosisSpokeConnector__sendMessage_shouldWork() public {}

  // ============ GnosisSpokeConnector._processMessage ============
  function test_GnosisSpokeConnector__processMessage_shouldWork() public {}

  function test_GnosisSpokeConnector__processMessage_shouldFailIfSenderNotVerified() public {}

  function test_GnosisSpokeConnector__processMessage_shouldFailIfSourceChainIdMismatch() public {}

  function test_GnosisSpokeConnector__processMessage_shouldFailIfDataLengthNot32() public {}
}
