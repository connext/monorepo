// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {GelatoRelayFeeCollector} from "@gelatonetwork/relay-context/contracts/GelatoRelayFeeCollector.sol";

import {ProposedOwnable} from "../../../shared/ProposedOwnable.sol";
import {IConnext, ExecuteArgs} from "../interfaces/IConnext.sol";

interface ISpokeConnector {
  struct Proof {
    bytes message;
    bytes32[32] path;
    uint256 index;
  }

  function proveAndProcess(
    Proof[] calldata _proofs,
    bytes32 _aggregateRoot,
    bytes32[32] calldata _aggregatePath,
    uint256 _aggregateIndex
  ) external;

  function send(bytes memory _encodedData) external payable;
}

/**
 * @title RelayerProxy
 * @author Connext Labs, Inc.
 * @notice This is a temporary contract that wraps fast path functions in the Connext interface so that they can be called by
 * Gelato's legacy relayer network. The contract stores native assets and pays them to the relayer on function call.
 */
contract RelayerProxy is ProposedOwnable, ReentrancyGuard, GelatoRelayFeeCollector {
  // ============ Properties ============
  address public gelatoRelayer;
  address public feeCollector;
  IConnext public connext;
  ISpokeConnector public spokeConnector;

  mapping(address => bool) public allowedRelayer;

  // ============ Modifier ============

  modifier onlyRelayer() {
    require(allowedRelayer[msg.sender], "!relayer");
    _;
  }

  modifier definedAddress(address _input) {
    require(_input != address(0), "empty");
    _;
  }

  // ============ Events ============

  /**
   * @notice Emitted when funds added to the contract
   * @param amount The amount added
   * @param balance The updated balance of the contract
   */
  event FundsReceived(uint256 amount, uint256 balance);

  /**
   * @notice Emitted when funds removed from the contract by admin
   * @param amount The amount removed
   * @param balance The updated balance of the contract
   */
  event FundsDeducted(uint256 amount, uint256 balance);

  /**
   * @notice Emitted when a new relayer is allowlisted by admin
   * @param relayer Address of the added relayer
   */
  event RelayerAdded(address relayer);

  /**
   * @notice Emitted when a relayer is removed from allowlist by admin
   * @param relayer Address of the removed relayer
   */
  event RelayerRemoved(address relayer);

  /**
   * @notice Emitted when Connext contract address is updated by admin
   * @param updated New Connext address in the contract
   * @param previous Old Connext address in the contract
   */
  event ConnextChanged(address updated, address previous);

  /**
   * @notice Emitted when SpokeConnector contract address is updated by admin
   * @param updated New SpokeConnector address in the contract
   * @param previous Old SpokeConnector address in the contract
   */
  event SpokeConnectorChanged(address updated, address previous);

  /**
   * @notice Emitted when GelatoRelayer address is updated by admin
   * @param updated New GelatoRelayer address in the contract
   * @param previous Old Gelatorelayer address in the contract
   */
  event GelatoRelayerChanged(address updated, address previous);

  /**
   * @notice Emitted when FeeCollectorChanged address is updated by admin
   * @param updated New FeeCollectorChanged address in the contract
   * @param previous Old FeeCollectorChanged address in the contract
   */
  event FeeCollectorChanged(address updated, address previous);

  // ============ Constructor ============

  /**
   * @notice Creates a new RelayerProxy instance.
   * @param _connext The address of the Connext on this domain.
   * @param _spokeConnector The address of the SpokeConnector on this domain.
   * @param _gelatoRelayer The address of the Gelato relayer on this domain.
   * @param _feeCollector The address of the Gelato Fee Collector on this domain.
   */
  constructor(
    address _connext,
    address _spokeConnector,
    address _gelatoRelayer,
    address _feeCollector
  ) ProposedOwnable() {
    _setOwner(msg.sender);
    _setConnext(_connext);
    _setSpokeConnector(_spokeConnector);
    _setGelatoRelayer(_gelatoRelayer);
    _setFeeCollector(_feeCollector);

    _addRelayer(_gelatoRelayer);
  }

  // ============ Admin Functions ============

  /**
   * @notice Adds a relayer address to the allowed relayers mapping.
   *
   * @param _relayer - Relayer address to add.
   */
  function addRelayer(address _relayer) external onlyOwner definedAddress(_relayer) {
    _addRelayer(_relayer);
  }

  /**
   * @notice Removes a relayer address from the allowed relayers mapping.
   *
   * @param _relayer - Relayer address to remove.
   */
  function removeRelayer(address _relayer) external onlyOwner definedAddress(_relayer) {
    _removeRelayer(_relayer);
  }

  /**
   * @notice Updates the Connext address on this contract.
   *
   * @param _connext - New Connext address.
   */
  function setConnext(address _connext) external onlyOwner definedAddress(_connext) {
    _setConnext(_connext);
  }

  /**
   * @notice Updates the SpokeConnector address on this contract.
   *
   * @param _spokeConnector - New SpokeConnector address.
   */
  function setSpokeConnector(address _spokeConnector) external onlyOwner definedAddress(_spokeConnector) {
    _setSpokeConnector(_spokeConnector);
  }

  /**
   * @notice Updates the Gelato relayer address on this contract.
   *
   * @param _gelatoRelayer - New Gelato relayer address.
   */
  function setGelatoRelayer(address _gelatoRelayer) external onlyOwner definedAddress(_gelatoRelayer) {
    _setGelatoRelayer(_gelatoRelayer);
  }

  /**
   * @notice Updates the Gelato Fee Collector address on this contract.
   *
   * @param _feeCollector - New Gelato Fee Collector address.
   */
  function setFeeCollector(address _feeCollector) external onlyOwner definedAddress(_feeCollector) {
    _setFeeCollector(_feeCollector);
  }

  /**
   * @notice Withdraws all funds stored on this contract to msg.sender.
   */
  function withdraw() external onlyOwner nonReentrant {
    uint256 balance = address(this).balance;
    Address.sendValue(payable(msg.sender), balance);
    emit FundsDeducted(balance, address(this).balance);
  }

  // ============ External Functions ============

  /**
   * @notice Wraps the call to execute() on Connext and pays either the caller or hardcoded relayer from this
   * contract's balance for completing the transaction.
   *
   * @param _args - ExecuteArgs arguments.
   * @param _fee - Fee to be paid to relayer.
   * @return transferId - The transfer ID of the crosschain transfer. Should match the xcall's transfer ID in order for
   * reconciliation to occur.
   */
  function execute(ExecuteArgs calldata _args, uint256 _fee)
    external
    onlyRelayer
    nonReentrant
    returns (bytes32 transferId)
  {
    transferId = connext.execute(_args);
    transferRelayerFee(_fee);
  }

  /**
   * @notice Wraps the call to proveAndProcess() on SpokeConnector and pays either the caller or hardcoded relayer
   * from this contract's balance for completing the transaction.
   *
   * @param _proofs Batch of Proofs containing messages for proving/processing.
   * @param _aggregateRoot The target aggregate root we want to prove inclusion for. This root must have
   * already been delivered to this spoke connector contract and surpassed the validation period.
   * @param _aggregatePath Merkle path of inclusion for the inbound root.
   * @param _aggregateIndex Index of the inbound root in the aggregator's merkle tree in the hub.
   * @param _fee - Fee to be paid to relayer.
   */
  function proveAndProcess(
    ISpokeConnector.Proof[] calldata _proofs,
    bytes32 _aggregateRoot,
    bytes32[32] calldata _aggregatePath,
    uint256 _aggregateIndex,
    uint256 _fee
  ) external onlyRelayer nonReentrant {
    spokeConnector.proveAndProcess(_proofs, _aggregateRoot, _aggregatePath, _aggregateIndex);
    transferRelayerFee(_fee);
  }

  /**
   * @notice Wraps the call to send() on SpokeConnector and pays either the caller or hardcoded relayer from this
   * contract's balance for completing the transaction.
   *
   * @param _encodedData - Data to be sent to Connext SpokeConnector
   * @param _messageFee - Fee to be paid to the SpokeConnector for connected AMBs that require fees.
   * @param _relayerFee - Fee to be paid to relayer.
   */
  function send(
    bytes memory _encodedData,
    uint256 _messageFee,
    uint256 _relayerFee
  ) external onlyRelayer nonReentrant {
    spokeConnector.send{value: _messageFee}(_encodedData);
    emit FundsDeducted(_messageFee, address(this).balance);
    transferRelayerFee(_relayerFee);
  }

  receive() external payable {
    emit FundsReceived(msg.value, address(this).balance);
  }

  // ============ Internal Functions ============

  /**
   * @notice helper function to transfer fees to either Gelato relayer via Fee Collector or to our
   * backup relayer (msg.sender).
   *
   * @param _fee - Fee to be paid to relayer.
   */
  function transferRelayerFee(uint256 _fee) internal {
    if (msg.sender == gelatoRelayer) {
      Address.sendValue(payable(feeCollector), _fee);
    } else {
      Address.sendValue(payable(msg.sender), _fee);
    }
    emit FundsDeducted(_fee, address(this).balance);
  }

  function _addRelayer(address _relayer) internal {
    require(!allowedRelayer[_relayer], "added");

    allowedRelayer[_relayer] = true;
    emit RelayerAdded(_relayer);
  }

  function _removeRelayer(address _relayer) internal {
    require(allowedRelayer[_relayer], "!added");

    allowedRelayer[_relayer] = false;
    emit RelayerRemoved(_relayer);
  }

  function _setConnext(address _connext) internal {
    emit ConnextChanged(_connext, address(connext));
    connext = IConnext(_connext);
  }

  function _setSpokeConnector(address _spokeConnector) internal {
    emit SpokeConnectorChanged(_spokeConnector, address(spokeConnector));
    spokeConnector = ISpokeConnector(_spokeConnector);
  }

  function _setGelatoRelayer(address _gelatoRelayer) internal {
    emit GelatoRelayerChanged(_gelatoRelayer, address(gelatoRelayer));
    gelatoRelayer = _gelatoRelayer;
  }

  function _setFeeCollector(address _feeCollector) internal {
    emit FeeCollectorChanged(_feeCollector, address(feeCollector));
    feeCollector = _feeCollector;
  }
}
