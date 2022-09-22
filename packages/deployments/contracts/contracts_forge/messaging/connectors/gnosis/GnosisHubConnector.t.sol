// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

import "../../../utils/ConnectorHelper.sol";

contract GnosisHubConnectorTest is ConnectorHelper {
  function setup() public {}

  // ============ GnosisHubConnector.verifySender ============
  function test_GnosisHubConnector__verifySender_shouldWorkIfTrue() public {}

  function test_GnosisHubConnector__verifySender_shouldWorkIfFalse() public {}

  function test_GnosisHubConnector__verifySender_shouldFailIfCallerNotAmb() public {}

  // ============ GnosisHubConnector._sendMessage ============
  function test_GnosisHubConnector__sendMessage_shouldWork() public {}

  function test_GnosisHubConnector__sendMessage_shouldFailIfDataLengthNot32() public {}

  // ============ GnosisHubConnector._processMessage ============
  function test_GnosisHubConnectr__processMessage_shouldWork() public {}

  function test_GnosisHubConnectr__processMessage_shouldFailIfSenderNotVerified() public {}

  function test_GnosisHubConnectr__processMessage_shouldFailIfSourceChainIdMismatch() public {}

  function test_GnosisHubConnectr__processMessage_shouldFailIfDataLengthNot32() public {}
}
