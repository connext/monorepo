// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {GnosisAmb} from "../../interfaces/ambs/GnosisAmb.sol";

import {SpokeConnector, ProposedOwnable} from "../SpokeConnector.sol";
import {Connector} from "../Connector.sol";

import {GnosisBase} from "./GnosisBase.sol";

contract GnosisSpokeConnector is SpokeConnector, GnosisBase {
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
    address _watcherManager,
    uint256 _gasCap, // gas to be provided on L1 execution
    uint256 _mirrorChainId
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
    GnosisBase(_gasCap, _mirrorChainId)
  {}

  /**
   * @notice Should not be able to renounce ownership
   */
  function renounceOwnership() public virtual override(SpokeConnector, ProposedOwnable) onlyOwner {}

  // ============ Private fns ============
  /**
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(address _expected) internal view override returns (bool) {
    return _verifySender(AMB, _expected, GnosisAmb(AMB).destinationChainId());
  }

  /**
   * @dev Messaging uses this function to send data to mainnet via amb
   * @param _encodedData Should be encoding of gas to be provided in execution of the method call on
   * the mirror domain
   */
  function _sendMessage(bytes memory _data, bytes memory _encodedData) internal override {
    // Should always be dispatching the outbound root
    require(_data.length == 32, "!length");

    // Should include gas info in specialized calldata
    require(_encodedData.length == 32, "!data length");

    // send the message to the l1 connector by calling `processMessage`
    GnosisAmb(AMB).requireToPassMessage(
      mirrorConnector,
      abi.encodeWithSelector(Connector.processMessage.selector, _data),
      _getGasFromEncoded(_encodedData)
    );
  }

  /**
   * @dev AMB calls this function to store aggregate root that is sent up by the root manager
   */
  function _processMessage(bytes memory _data) internal override {
    // get the data (should be the aggregate root)
    require(_data.length == 32, "!length");
    // ensure the l1 connector sent the message
    require(_verifySender(mirrorConnector), "!mirrorConnector");
    // ensure it is headed to this domain
    require(GnosisAmb(AMB).sourceChainId() == block.chainid, "!sourceChain");
    // update the aggregate root on the domain
    receiveAggregateRoot(bytes32(_data));
  }
}
