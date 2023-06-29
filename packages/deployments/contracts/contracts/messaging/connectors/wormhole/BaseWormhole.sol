// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IWormholeRelayer} from "../../interfaces/ambs/wormhole/IWormholeRelayer.sol";
import {IWormholeReceiver} from "../../interfaces/ambs/wormhole/IWormholeReceiver.sol";

import {GasCap} from "../GasCap.sol";

abstract contract BaseWormhole is GasCap, IWormholeReceiver {
  // ============ Storage ============
  address public immutable relayerAddress;
  uint16 public immutable MIRROR_CHAIN_ID;
  mapping(bytes32 => bool) public processedWhMessages;

  // ============ Constructor ============
  constructor(address _relayer, uint256 _gasCap, uint16 _mirrorChainId) GasCap(_gasCap) {
    relayerAddress = _relayer;
    MIRROR_CHAIN_ID = _mirrorChainId;
  }

  // ============ Public Fns ============
  function receiveWormholeMessages(
    bytes memory payload,
    bytes[] memory additionalVaas,
    bytes32 sourceAddress,
    uint16 sourceChain,
    bytes32 deliveryHash
  ) public payable override {
    require(sourceChain == MIRROR_CHAIN_ID, "!source chain");
    require(msg.sender == relayerAddress, "!relayer");

    // Check that the VAA hasn't already been processed (replay protection)
    require(!processedWhMessages[deliveryHash], "already processed");

    // Add the VAA to processed messages so it can't be replayed
    // you can alternatively rely on the replay protection
    // of something like transferWithPayload from the Token Bridge module
    processedWhMessages[deliveryHash] = true;

    _processMessageFrom(fromWormholeFormat(sourceAddress), payload);
  }

  function quoteEVMDeliveryPrice(uint256 gasLimit) public view returns (uint256 cost) {
    (cost, ) = IWormholeRelayer(relayerAddress).quoteEVMDeliveryPrice(MIRROR_CHAIN_ID, 0, gasLimit);
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

  function _sendMessage(
    address _mirrorConnector,
    address _refund,
    bytes memory _data,
    bytes memory _encodedData
  ) internal {
    // Should always be sending a merkle root
    require(_data.length == 32, "!data length");

    //calculate cost to deliver message
    uint256 gasLimit = _getGasFromEncoded(_encodedData);
    uint256 deliveryCost = quoteEVMDeliveryPrice(gasLimit);
    require(deliveryCost == msg.value, "!msg.value");

    // publish delivery request
    IWormholeRelayer(relayerAddress).sendPayloadToEvm{value: deliveryCost}(
      MIRROR_CHAIN_ID,
      _mirrorConnector,
      _data,
      0,
      gasLimit,
      MIRROR_CHAIN_ID, // refundChain
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
    require(_encodedData.length == 32, "!data length");

    // Get the gas, if it is more than the cap use the cap
    _gas = _getGas(abi.decode(_encodedData, (uint256)));
  }
}
