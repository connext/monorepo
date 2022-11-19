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
}

contract RelayerProxy is ProposedOwnable, ReentrancyGuard, GelatoRelayFeeCollector {
  // ============ Properties ============
  address public gelatoRelayer;

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

  // ============ Properties ============

  IConnext public connext;
  ISpokeConnector public spokeConnector;

  // ============ Constructor ============

  /**
   * @notice
   * @param _connext The address of the Connext on this domain.
   */
  constructor(
    address _connext,
    address _spokeConnector,
    address _gelatoRelayer
  ) ProposedOwnable() {
    _setOwner(msg.sender);
    _setGelatoRelayer(_gelatoRelayer);
    _setSpokeConnector(_spokeConnector);
    _setConnext(_connext);
    _addRelayer(_gelatoRelayer);
  }

  // ============ Admin Functions ============

  function addRelayer(address _relayer) external onlyOwner {
    _addRelayer(_relayer);
  }

  function removeRelayer(address _relayer) external onlyOwner {
    _removeRelayer(_relayer);
  }

  function setConnext(address _connext) external onlyOwner {
    _setConnext(_connext);
  }

  function setSpokeConnector(address _spokeConnector) external onlyOwner {
    _setSpokeConnector(_spokeConnector);
  }

  function setGelatoRelayer(address _gelatoRelayer) external onlyOwner {
    _setGelatoRelayer(_gelatoRelayer);
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
    transferFee(_fee);
    emit FundsDeducted(_fee, address(this).balance);
  }

  function proveAndProcess(
    ISpokeConnector.Proof[] calldata _proofs,
    bytes32 _aggregateRoot,
    bytes32[32] calldata _aggregatePath,
    uint256 _aggregateIndex,
    uint256 _fee
  ) external onlyRelayer nonReentrant {
    spokeConnector.proveAndProcess(_proofs, _aggregateRoot, _aggregatePath, _aggregateIndex);
    transferFee(_fee);
    emit FundsDeducted(_fee, address(this).balance);
  }

  receive() external payable {
    emit FundsReceived(msg.value, address(this).balance);
  }

  // ============ Internal Functions ============

  function transferFee(uint256 _fee) internal {
    if (msg.sender == gelatoRelayer) {
      address feeCollector = _getFeeCollector();
      Address.sendValue(payable(feeCollector), _fee);
    } else {
      Address.sendValue(payable(msg.sender), _fee);
    }
  }

  function _addRelayer(address _relayer) internal definedAddress(_relayer) {
    require(!allowedRelayer[_relayer], "added");

    allowedRelayer[_relayer] = true;
    emit RelayerAdded(_relayer);
  }

  function _removeRelayer(address _relayer) internal definedAddress(_relayer) {
    require(allowedRelayer[_relayer], "!added");

    allowedRelayer[_relayer] = false;
    emit RelayerRemoved(_relayer);
  }

  function _setConnext(address _connext) internal definedAddress(_connext) {
    address oldConnext = address(connext);
    require(_connext != oldConnext, "!change");
    emit ConnextChanged(_connext, oldConnext);
    connext = IConnext(_connext);
  }

  function _setSpokeConnector(address _spokeConnector) internal definedAddress(_spokeConnector) {
    address oldSpokeConnector = address(spokeConnector);
    require(_spokeConnector != oldSpokeConnector, "!change");
    emit SpokeConnectorChanged(_spokeConnector, oldSpokeConnector);

    spokeConnector = ISpokeConnector(_spokeConnector);
  }

  function _setGelatoRelayer(address _gelatoRelayer) internal definedAddress(_gelatoRelayer) {
    address previous = address(gelatoRelayer);
    require(_gelatoRelayer != previous, "!change");
    emit RelayerChanged(_gelatoRelayer, previous);

    gelatoRelayer = _gelatoRelayer;
  }
}
