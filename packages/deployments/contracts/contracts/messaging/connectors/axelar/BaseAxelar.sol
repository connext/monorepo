// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";
import {StringToAddress, AddressToString} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/utils/AddressString.sol";

import {GasCap} from "../GasCap.sol";

abstract contract BaseAxelar is GasCap, AxelarExecutable {
  using StringToAddress for string;
  using AddressToString for address;

  // ============ Internal Storage ============
  IAxelarGasService public immutable gasService;

  // Mirror chain id
  string public MIRROR_CHAIN_ID;

  // ============ Constructor ============
  constructor(
    address _amb,
    uint256 _gasCap, // max fee on destination chain
    address _gasReceiver,
    string memory _mirrorChainId
  ) GasCap(_gasCap) AxelarExecutable(_amb) {
    // sanity checks
    require(bytes(_mirrorChainId).length != 0, "!mirrorChainId");

    // set immutable propertioes
    gasService = IAxelarGasService(_gasReceiver);
    MIRROR_CHAIN_ID = _mirrorChainId;
  }

  // ============ Public Fns ============
  function _execute(
    string calldata _sourceChain,
    string calldata _sourceAddress,
    bytes calldata _payload
  ) internal override {
    require(keccak256(abi.encodePacked(_sourceChain)) == keccak256(abi.encodePacked(MIRROR_CHAIN_ID)), "!source chain");
    _processMessageFrom(_sourceAddress.toAddress(), _payload);
  }

  // ============ Private fns ============
  // DO NOT override _processMessage, should revert from `Connector` class. All messages must use the _processMessageFrom function
  /**
   * @notice This function is called to handle incoming messages. Should store the latest
   * root generated on the l2 domain.
   */
  function _processMessageFrom(address sender, bytes memory _data) internal virtual;

  /**
   * @dev Sends `outboundRoot` to root manager on the mirror chain
   */
  function _sendMessage(address _mirrorConnector, bytes memory _data, bytes memory _encodedData) internal {
    // Should always be sending a merkle root
    require(_data.length == 32, "!data length");

    // Should not include any gas info
    require(_encodedData.length == 0, "!data length");

    // Get the max fee supplied
    uint256 supplied = _getGas(msg.value); // fee paid on origin chain, up to cap

    string memory mirrorConnectorStr = _mirrorConnector.toString();

    // Get the min fees
    gasService.payNativeGasForContractCall{value: supplied}(
      address(this),
      MIRROR_CHAIN_ID,
      mirrorConnectorStr,
      _data,
      msg.sender
    );

    gateway.callContract(
      MIRROR_CHAIN_ID,
      mirrorConnectorStr, // Target contract on destination
      _data // Call data for interaction
    );
  }
}
