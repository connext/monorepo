// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Connector} from "../Connector.sol";
import {ConnectorsLib, ROOT_LENGTH} from "../ConnectorsLib.sol";
import {GasCap} from "../GasCap.sol";
import {IBridge} from "../../../../contracts/messaging/interfaces/ambs/sygma/IBridge.sol";
import {ISygmaConnector} from "./interfaces/ISygmaConnector.sol";

/**
 * @title BaseSygma
 * @notice Contract containing common logic for Sygma connectors
 */
abstract contract BaseSygma is GasCap {
  /**
   * @notice The ID of the Sygma's permissionless handler
   */
  bytes32 public constant PERMISSIONLESS_HANDLER_ID =
    0x0000000000000000000000000000000000000000000000000000000000000000;
  /**
   * @notice The length of an address
   */
  uint8 public constant ADDRESS_LEN = 20;

  /**
   * @notice The zero address
   */
  address public constant ZERO_ADDRESS = 0x0000000000000000000000000000000000000000;

  /**
   * @notice The length of function signatures
   */
  uint16 public constant FUNCTION_SIG_LEN = 4;

  /**
   * @notice The signature of the receiveMessage function
   */
  bytes4 public constant FUNCTION_SIG = ISygmaConnector.receiveMessage.selector;

  /**
   * @notice The Sygma bridge contract
   */
  IBridge public immutable SYGMA_BRIDGE;

  /**
   * @notice The permissionless handler address
   */
  address public immutable PERMISSIONLESS_HANDLER;

  /**
   * @notice Creates a new BaseSygma instance
   * @param _amb The address of the amb on the domain this connector lives on
   * @param _permissionlessHandler The address of the permissionless handler
   * @param _gasCap The gas cap for the messages sent through the bridge
   */
  constructor(address _amb, address _permissionlessHandler, uint256 _gasCap) GasCap(_gasCap) {
    SYGMA_BRIDGE = IBridge(_amb);
    PERMISSIONLESS_HANDLER = _permissionlessHandler;
  }

  /**
   * @notice Parses the deposit data into the required format by Sygma
   * @param _root The aggregate root
   * @param _mirrorConnector The address of the mirror connector
   * @return _depositData The deposit data
   */
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
      FUNCTION_SIG,
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

  /**
   * @notice Slices a bytes input from a given position
   * @param input The input to slice
   * @param position The position to slice from
   * @return _slicedData The sliced data
   */
  function slice(bytes calldata input, uint256 position) public pure returns (bytes memory _slicedData) {
    _slicedData = input[position:];
  }
}
