// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {LibArbitrumL2} from "@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL2.sol";
import {IArbSys} from "@openzeppelin/contracts/vendor/arbitrum/IArbSys.sol";

import {ArbitrumL2Amb} from "../../interfaces/ambs/arbitrum/ArbitrumL2Amb.sol";

import {SpokeConnector} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

contract ArbitrumSpokeConnector is SpokeConnector {
  // ============ Events ============

  event AliasedSenderUpdated(address previous, address current);

  // ============ Public Storage ============

  /**
   * @notice Aliased address of mirror connector. This value should be calculated and set
   * when the `_mirrorConnector` address is set.
   * @dev See: https://developer.arbitrum.io/arbos/l1-to-l2-messaging#address-aliasing
   */
  address public aliasedSender;

  // ============ Modifiers ============

  /**
   * @notice Errors if the msg.sender is not the aliased sender
   */
  modifier onlyAliased() {
    require(msg.sender == aliasedSender, "!aliasedSender");
    _;
  }

  // ============ Constructor ============

  constructor(
    uint32 _domain,
    uint32 _mirrorDomain,
    address _amb,
    address _rootManager,
    address _mirrorConnector,
    uint256 _processGas,
    uint256 _reserveGas,
    uint256 _delayBlocks,
    address _merkle,
    address _watcherManager
  )
    SpokeConnector(
      _domain,
      _mirrorDomain,
      _amb,
      _rootManager,
      _mirrorConnector,
      _processGas,
      _reserveGas,
      _delayBlocks,
      _merkle,
      _watcherManager
    )
  {
    _setAliasedSender(_mirrorConnector);
  }

  // ============ Public Functions ============

  /**
   * @notice Processes a message received by an AMB
   * @dev This is called by AMBs to process messages originating from mirror connector
   */
  function processMessage(bytes memory _data) external override onlyAliased {
    _processMessage(_data);
    emit MessageProcessed(_data, msg.sender);
  }

  // ============ Private Functions ============

  function _verifySender(address _expected) internal view override returns (bool) {
    return _expected == LibArbitrumL2.crossChainSender(AMB);
  }

  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should always be dispatching the aggregate root
    require(_data.length == 32, "!length");
    // Should not include specialized calldata
    require(_encodedData.length == 0, "!data length");
    // Get the calldata
    bytes memory _calldata = abi.encodeWithSelector(Connector.processMessage.selector, _data);
    // Send to L1
    ArbitrumL2Amb(AMB).sendTxToL1(mirrorConnector, _calldata);
  }

  function _processMessage(bytes memory _data) internal override {
    // only callable by mirror connector
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // update the aggregate root on the domain
    receiveAggregateRoot(bytes32(_data));
  }

  function _setMirrorConnector(address _mirrorConnector) internal override {
    _setAliasedSender(_mirrorConnector);
    emit MirrorConnectorUpdated(mirrorConnector, _mirrorConnector);
    mirrorConnector = _mirrorConnector;
  }

  function _setAliasedSender(address _mirrorConnector) internal {
    // Calculate the alias address.
    address _alias = IArbSys(AMB).mapL1SenderContractAddressToL2Alias(_mirrorConnector, address(0));
    emit AliasedSenderUpdated(aliasedSender, _alias);
    // Update our aliased sender (used in `processMessage` override).
    aliasedSender = _alias;
  }
}
