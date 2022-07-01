// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

/**
 * @title IBridgeRouter
 * @notice Contains the interface used by Connext contracts into Nomad's
 * BridgeRouter. The BridgeRouter is responsible for:
 * - formatting and dispatching outbound nomad messages
 * - custodying canonical and minting/burning local tokens
 * - formatting and handling inbound nomad messages
 */
interface IBridgeRouter {
  function send(
    address _token,
    uint256 _amount,
    uint32 _destination,
    bytes32 _recipient,
    bool /* _enableFast deprecated field, left argument for backwards compatibility */
  ) external;

  function xsend(
    address _token,
    uint256 _amount,
    uint32 _destination,
    bytes32 _externalId
  ) external;
}
