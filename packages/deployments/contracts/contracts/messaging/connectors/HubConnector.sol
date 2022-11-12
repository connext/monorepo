// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "./Connector.sol";

/**
 * @title HubConnector
 * @author Connext Labs, Inc.
 * @notice This contract implements the messaging functions needed on the hub-side of a given AMB.
 * The HubConnector has a limited set of functionality compared to the SpokeConnector, namely that
 * it contains no logic to store or prove messages.
 *
 * @dev This contract should be deployed on the hub-side of an AMB (i.e. on L1), and contracts
 * which extend this should implement the virtual functions defined in the BaseConnector class
 */
abstract contract HubConnector is Connector {
  /**
   * @notice Creates a new HubConnector instance
   * @dev The connectors are deployed such that there is one on each side of an AMB (i.e.
   * for optimism, there is one connector on optimism and one connector on mainnet)
   * @param _domain The domain this connector lives on
   * @param _mirrorDomain The spoke domain
   * @param _amb The address of the amb on the domain this connector lives on
   * @param _rootManager The address of the RootManager on mainnet
   * @param _mirrorConnector The address of the spoke connector
   */
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector
  ) Connector(_domain, _mirrorDomain, _amb, _rootManager, _mirrorConnector) {}

  // ============ Public fns ============
  /**
   * @notice Sends a message over the amb
   * @dev This is called by the root manager *only* on mainnet to propagate the aggregate root
   */
  function sendMessage(bytes memory _data, bytes memory _encodedData) external payable onlyRootManager {
    _sendMessage(_data, _encodedData);
    emit MessageSent(_data, _encodedData, msg.sender);
  }
}
