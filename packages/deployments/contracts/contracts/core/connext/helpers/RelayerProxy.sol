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

  event FundsReceived(uint256 amount, uint256 balance);

  event FundsDeducted(uint256 amount, uint256 balance);

  event RelayerAdded(address relayer);

  event RelayerRemoved(address relayer);

  event ConnextChanged(address updated, address previous);
  event SpokeConnectorChanged(address updated, address previous);
  event RelayerChanged(address updated, address previous);
  event FeeCollectorChanged(address updated, address previous);

  // ============ Constructor ============

  /**
   * @notice
   * @param _connext The address of the Connext on this domain.
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

  function addRelayer(address _relayer) external onlyOwner definedAddress(_relayer) {
    _addRelayer(_relayer);
  }

  function removeRelayer(address _relayer) external onlyOwner definedAddress(_relayer) {
    _removeRelayer(_relayer);
  }

  function setConnext(address _connext) external onlyOwner definedAddress(_connext) {
    _setConnext(_connext);
  }

  function setSpokeConnector(address _spokeConnector) external onlyOwner definedAddress(_spokeConnector) {
    _setSpokeConnector(_spokeConnector);
  }

  function setGelatoRelayer(address _gelatoRelayer) external onlyOwner definedAddress(_gelatoRelayer) {
    _setGelatoRelayer(_gelatoRelayer);
  }

  function setFeeCollector(address _feeCollector) external onlyOwner definedAddress(_feeCollector) {
    _setFeeCollector(_feeCollector);
  }

  function withdraw() external onlyOwner nonReentrant {
    uint256 balance = address(this).balance;
    Address.sendValue(payable(msg.sender), balance);
    emit FundsDeducted(balance, address(this).balance);
  }

  // ============ External Functions ============

  function execute(ExecuteArgs calldata _args, uint256 _fee)
    external
    onlyRelayer
    nonReentrant
    returns (bytes32 transferId)
  {
    transferId = connext.execute(_args);
    transferRelayerFee(_fee);
  }

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
    address oldConnext = address(connext);
    require(_connext != oldConnext, "!change");
    emit ConnextChanged(_connext, oldConnext);
    connext = IConnext(_connext);
  }

  function _setSpokeConnector(address _spokeConnector) internal {
    address oldSpokeConnector = address(spokeConnector);
    require(_spokeConnector != oldSpokeConnector, "!change");
    emit SpokeConnectorChanged(_spokeConnector, oldSpokeConnector);

    spokeConnector = ISpokeConnector(_spokeConnector);
  }

  function _setGelatoRelayer(address _gelatoRelayer) internal {
    address previous = address(gelatoRelayer);
    require(_gelatoRelayer != previous, "!change");
    emit RelayerChanged(_gelatoRelayer, previous);

    gelatoRelayer = _gelatoRelayer;
  }

  function _setFeeCollector(address _feeCollector) internal {
    address previous = address(feeCollector);
    require(_feeCollector != previous, "!change");
    emit FeeCollectorChanged(_feeCollector, previous);

    feeCollector = _feeCollector;
  }
}
