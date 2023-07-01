// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IWormholeRelayer} from "../../interfaces/ambs/wormhole/IWormholeRelayer.sol";

import {GasCap} from "../GasCap.sol";

abstract contract BaseWormhole is GasCap {
  // ============ Storage ============
  /**
   * @notice The wormhole id for the mirror network
   */
  uint16 public immutable MIRROR_WORMHOLE_ID;

  mapping(bytes32 => bool) public processedWhMessages;

  // ============ Constructor ============
  constructor(uint256 _gasCap, uint16 _mirrorWormholeChainId) GasCap(_gasCap) {
    MIRROR_WORMHOLE_ID = _mirrorWormholeChainId;
  }

  /**
   * @dev calculcate gas to call `receiveWormholeMessages` on target chain
   * https://github.com/wormhole-foundation/wormhole/blob/main/ethereum/contracts/relayer/deliveryProvider/DeliveryProvider.sol
   */
  function quoteEVMDeliveryPrice(uint256 _gasLimit, address _amb) public view returns (uint256 cost) {
    (cost, ) = IWormholeRelayer(_amb).quoteEVMDeliveryPrice(MIRROR_WORMHOLE_ID, 0, _gasLimit);
  }

  // ============ Private fns ============
  /**
   * @dev Asserts the sender of a cross domain message
   */
  function _verifySender(address _mirrorConnector, address _expected) internal pure returns (bool) {
    return _mirrorConnector == _expected;
  }

  // DO NOT override _processMessage, should revert from `Connector` class. All messages must use the _processMessageFrom function
  /**
   * @notice This function is called to handle incoming messages. Should store the latest
   * root generated on the l2 domain.
   */
  function _processMessageFrom(address sender, bytes memory _data) internal virtual;

  /**
   * @notice Performs sanity checks specific to receiving wormhole messages.
   * @dev Checks the sender is the AMB, the chain is the mirror, and replay.
   */
  function _wormholeSanityChecks(uint16 _sourceChain, address _amb, bytes32 _deliveryHash) internal {
    require(_sourceChain == MIRROR_WORMHOLE_ID, "!source chain");
    require(msg.sender == _amb, "!relayer");

    // Check that the VAA hasn't already been processed (replay protection)
    require(!processedWhMessages[_deliveryHash], "already processed");

    // Add the VAA to processed messages so it can't be replayed
    // you can alternatively rely on the replay protection
    // of something like transferWithPayload from the Token Bridge module
    processedWhMessages[_deliveryHash] = true;
  }

  /**
   * @dev send message via wormhole.
   * https://book.wormhole.com/technical/evm/relayer.html#sending-messages
   */
  function _sendMessage(
    address _amb,
    address _mirrorConnector,
    address _refund,
    bytes memory _data,
    bytes memory _encodedData
  ) internal {
    // Should always be sending a merkle root
    require(_data.length == 32, "!data length");

    //calculate cost to deliver message
    uint256 gasLimit = _getGasFromEncoded(_encodedData);
    uint256 deliveryCost = quoteEVMDeliveryPrice(gasLimit, _amb);
    require(deliveryCost == msg.value, "!msg.value");

    // publish delivery request
    IWormholeRelayer(_amb).sendPayloadToEvm{value: deliveryCost}(
      MIRROR_WORMHOLE_ID,
      _mirrorConnector,
      _data,
      0,
      gasLimit,
      MIRROR_WORMHOLE_ID, // refundChain
      _refund // refundAddress
    );
  }

  function fromWormholeFormat(bytes32 whFormatAddress) internal pure returns (address) {
    require(uint256(whFormatAddress) >> 160 == 0, "!evm address");
    return address(uint160(uint256(whFormatAddress)));
  }

  /**
   * @notice Using Wormhole relayer (AMB), the gas is provided to `sendMessage` as an encoded uint
   */
  function _getGasFromEncoded(bytes memory _encodedData) internal view returns (uint256 _gas) {
    // Should include gssas info in specialized calldata
    require(_encodedData.length == 32, "!encoded data length");

    // Get the gas, if it is more than the cap use the cap
    _gas = _getGas(abi.decode(_encodedData, (uint256)));
  }
}
