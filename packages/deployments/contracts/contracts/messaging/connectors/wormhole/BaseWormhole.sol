// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IWormholeRelayer} from "../../interfaces/ambs/wormhole/IWormholeRelayer.sol";

import {GasCap} from "../GasCap.sol";

abstract contract BaseWormhole is GasCap {
  // ============ Events ============

  event RefundAddressUpdated(address indexed previous, address indexed updated);

  // ============ Storage ============
  /**
   * @notice The wormhole id for the mirror network
   */
  uint16 public immutable MIRROR_WORMHOLE_ID;

  /**
   * @notice The address on this chain any refunds from wormhole fees will be
   * sent to
   */
  address public refundAddress;

  /**
   * @notice Mapping of processed messages from wormhole.
   * @dev Used for replay protection.
   */
  mapping(bytes32 => bool) public processedWhMessages;

  // ============ Constructor ============
  constructor(uint256 _gasCap, uint16 _mirrorWormholeChainId) GasCap(_gasCap) {
    MIRROR_WORMHOLE_ID = _mirrorWormholeChainId;
    _setRefundAddress(msg.sender);
  }

  // ============ Admin fns ============
  /**
   * @notice Allows the owner to set a new address to collect excess wormhole fees.
   * @param _updated The updated refund address
   */
  function setRefundAddress(address _updated) public onlyOwner {
    _setRefundAddress(_updated);
  }

  // ============ Public fns ============

  /**
   * @dev calculcate gas to call `receiveWormholeMessages` on target chain
   * https://github.com/wormhole-foundation/wormhole/blob/main/ethereum/contracts/relayer/deliveryProvider/DeliveryProvider.sol
   */
  function quoteEVMDeliveryPrice(uint256 _gasLimit, address _amb) public view returns (uint256 _cost) {
    // First Get the gas, if it is more than the cap use the cap
    // And calculcate delievery price with gasCap
    (_cost, ) = IWormholeRelayer(_amb).quoteEVMDeliveryPrice(MIRROR_WORMHOLE_ID, 0, _getGas(_gasLimit));
  }

  // ============ Private fns ============

  function _setRefundAddress(address _updated) internal {
    require(_updated != refundAddress, "!changed");
    emit RefundAddressUpdated(refundAddress, _updated);
    refundAddress = _updated;
  }

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
  function _processMessageFrom(address _sender, bytes memory _data) internal virtual;

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
    bytes memory _data,
    bytes memory _encodedData
  ) internal {
    // Should always be sending a merkle root
    require(_data.length == 32, "!data length");

    // Should include gas limit info in specialized calldata
    require(_encodedData.length == 32, "!encoded data length");

    //calculate cost to deliver message
    uint256 gasLimit = abi.decode(_encodedData, (uint256));
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
      refundAddress // refundAddress
    );
  }

  /**
   * @notice Converts from wormhole 32 byte identifier format to evm address
   */
  function _fromWormholeFormat(bytes32 _whFormatAddress) internal pure returns (address) {
    require(uint256(_whFormatAddress) >> 160 == 0, "!evm address");
    return address(uint160(uint256(_whFormatAddress)));
  }
}
