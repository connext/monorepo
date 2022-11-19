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
  address public immutable GELATO_RELAYER = 0xaBcC9b596420A9E9172FD5938620E265a0f9Df92;

  mapping(address => bool) public allowedRelayer;

  // ============ Modifier ============

  modifier onlyRelayer() {
    require(allowedRelayer[msg.sender], "!relayer");
    _;
  }

  // ============ Events ============

  event FundsReceived(uint256 amount, uint256 balance);

  event FundsDeducted(uint256 amount, uint256 balance);

  event RelayerAdded(address relayer);

  event RelayerRemoved(address relayer);

  event Setup(address connext, address spokeConnector);
  event ConnextChanged(address connext, address oldConnext);
  event SpokeConnectorChanged(address spokeConnector, address oldSpokeConnector);

  // ============ Properties ============

  IConnext public connext;
  ISpokeConnector public spokeConnector;

  // ============ Constructor ============

  /**
   * @notice
   * @param _connext The address of the Connext on this domain.
   */
  constructor(address _connext, address _spokeConnector) ProposedOwnable() {
    _setOwner(msg.sender);
    allowedRelayer[GELATO_RELAYER] = true; // Gelato relayer is allowed by default

    require(_connext != address(0), "!zero connext");
    require(_spokeConnector != address(0), "!zero spoke connector");

    connext = IConnext(_connext);
    spokeConnector = ISpokeConnector(_spokeConnector);
    emit Setup(_connext, _spokeConnector);
  }

  // ============ Admin Functions ============

  function addRelayer(address _relayer) external onlyOwner {
    require(_relayer != address(0), "!zero relayer");
    require(!allowedRelayer[_relayer], "already added");

    allowedRelayer[_relayer] = true;
    emit RelayerAdded(_relayer);
  }

  function removeRelayer(address _relayer) external onlyOwner {
    require(_relayer != address(0), "!zero relayer");
    require(allowedRelayer[_relayer], "relayer not added");

    allowedRelayer[_relayer] = false;
    emit RelayerRemoved(_relayer);
  }

  function setConnext(address _connext) external onlyOwner {
    require(_connext != address(0), "!zero connext");
    address oldConnext = address(connext);

    connext = IConnext(_connext);
    emit ConnextChanged(_connext, oldConnext);
  }

  function setSpokeConnector(address _spokeConnector) external onlyOwner {
    require(_spokeConnector != address(0), "!zero spoke connector");
    address oldSpokeConnector = address(spokeConnector);

    spokeConnector = ISpokeConnector(_spokeConnector);
    emit ConnextChanged(_spokeConnector, oldSpokeConnector);
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

  function transferFee(uint256 _fee) internal {
    if (msg.sender == GELATO_RELAYER) {
      address feeCollector = _getFeeCollector();
      Address.sendValue(payable(feeCollector), _fee);
    } else {
      Address.sendValue(payable(msg.sender), _fee);
    }
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
}
