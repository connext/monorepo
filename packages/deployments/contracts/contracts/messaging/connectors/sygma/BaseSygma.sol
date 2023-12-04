// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {GasCap} from "../GasCap.sol";
import {IBridge} from "../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";
import {Connector} from "../Connector.sol";

abstract contract BaseSygma is GasCap {
  bytes32 public constant PERMISSIONLESS_HANDLER_ID =
    0x0000000000000000000000000000000000000000000000000000000000000000;
  uint256 public constant ROOT_LENGTH = 32;
  uint8 public constant ADDRESS_LEN = 20;
  address public constant ZERO_ADDRESS = 0x0000000000000000000000000000000000000000;
  uint16 public constant FUNCTION_SIG_LEN = 4;
  bytes4 public constant FUNCTION_SIG = IConnector.receiveMessage.selector;
  IBridge public immutable SYGMA_BRIDGE;
  address public immutable PERMISSIONLESS_HANDLER;

  constructor(address _amb, address _permissionlessHandler, uint256 _gasCap) GasCap(_gasCap) {
    SYGMA_BRIDGE = IBridge(_amb);
    PERMISSIONLESS_HANDLER = _permissionlessHandler;
  }

  function parseDepositData(bytes32 _root, address _mirrorConnector) public view returns (bytes memory _depositData) {
    // Parse the message on the required format by Sygma
    bytes memory _message = abi.encode(ZERO_ADDRESS, _root);
    _message = this.slice(_message, ROOT_LENGTH);
    // Define the deposit data in the same way
    _depositData = abi.encodePacked(
      // uint256 maxFee
      gasCap,
      // uint16 len(executeFuncSignature)
      FUNCTION_SIG_LEN,
      // bytes executeFuncSignature
      IConnector.receiveMessage.selector,
      // uint8 len(executeContractAddress)
      ADDRESS_LEN,
      // bytes executeContractAddress
      _mirrorConnector,
      // uint8 len(executionDataDepositor)
      ADDRESS_LEN,
      // bytes executionDataDepositor
      address(this),
      // bytes executionDataDepositor
      _message
    );
  }

  function slice(bytes calldata input, uint256 position) public pure returns (bytes memory _slicedData) {
    _slicedData = input[position:];
  }

  function _checkDataLength(bytes memory _data) internal pure returns (bool _validLength) {
    _validLength = _data.length == ROOT_LENGTH;
  }
}

// TODO: move to a new file
interface IConnector {
  function receiveMessage(address _originSender, bytes32 _root) external;
}
