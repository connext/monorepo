// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

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
  // ============ Events ============
  event MirrorConnectorUpdated(address previous, address current);

  event MirrorGasUpdated(uint256 previous, uint256 current);

  // ============ Public storage ============
  /**
   * @notice The domain of the corresponding messaging (i.e. Connector) contract.
   */
  uint32 public immutable MIRROR_DOMAIN;

  /**
   * @notice Connector on L2 for L1 connectors, and vice versa.
   */
  address public mirrorConnector;

  /**
   * @notice Gas costs forwarded to the `processMessage` call on the mirror domain
   */
  uint256 public mirrorGas;

  /**
   * @notice Creates a new HubConnector instance
   * @dev The connectors are deployed such that there is one on each side of an AMB (i.e.
   * for optimism, there is one connector on optimism and one connector on mainnet)
   * @param _domain The domain this connector lives on
   * @param _mirrorDomain The spoke domain
   * @param _amb The address of the amb on the domain this connector lives on
   * @param _rootManager The address of the RootManager on mainnet
   * @param _mirrorConnector The address of the spoke connector
   * @param _mirrorGas The gas costs required to process a message on mirror
   */
  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _mirrorGas
  ) Connector(_domain, _amb, _rootManager) {
    // set immutables
    MIRROR_DOMAIN = _mirrorDomain;

    // set mutables if defined
    if (_mirrorConnector != address(0)) {
      _setMirrorConnector(_mirrorConnector);
    }

    if (_mirrorGas != 0) {
      _setMirrorGas(_mirrorGas);
    }
  }

  // ============ Admin fns ============
  /**
   * @notice Sets the address of the l2Connector for this domain
   */
  function setMirrorConnector(address _mirrorConnector) public onlyOwner {
    _setMirrorConnector(_mirrorConnector);
  }

  /**
   * @notice Sets the address of the l2Connector for this domain
   */
  function setMirrorGas(uint256 _mirrorGas) public onlyOwner {
    _setMirrorGas(_mirrorGas);
  }

  // ============ Private fns ============
  function _setMirrorConnector(address _mirrorConnector) internal {
    emit MirrorConnectorUpdated(mirrorConnector, _mirrorConnector);
    mirrorConnector = _mirrorConnector;
  }

  function _setMirrorGas(uint256 _mirrorGas) internal {
    emit MirrorGasUpdated(mirrorGas, _mirrorGas);
    mirrorGas = _mirrorGas;
  }
}
