// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
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

  function DOMAIN() external view returns (uint32);

  function proveAndProcess(
    Proof[] calldata _proofs,
    bytes32 _aggregateRoot,
    bytes32[32] calldata _aggregatePath,
    uint256 _aggregateIndex
  ) external;

  function send(bytes memory _encodedData) external payable;

  function proposeAggregateRoot(bytes32 _aggregateRoot, uint256 _rootTimestamp) external;

  function finalize(bytes32 _proposedAggregateRoot, uint256 _rootTimestamp, uint256 _endOfDispute) external;

  function allowlistedProposers(address _proposer) external view returns (bool);
}

interface IKeep3rV2 {
  function isKeeper(address _keeper) external returns (bool _isKeeper);

  function worked(address _keeper) external;
}

/**
 * @title RelayerProxy
 * @author Connext Labs, Inc.
 * @notice This is a temporary contract that wraps fast path functions in the Connext interface so that they can be called by
 * Gelato's legacy relayer network. The contract stores native assets and pays them to the relayer on function call.
 */
contract RelayerProxy is ProposedOwnable, ReentrancyGuard, GelatoRelayFeeCollector {
  using ECDSA for bytes32;
  // ============ Properties ============
  address public gelatoRelayer;
  address public feeCollector;
  IKeep3rV2 public keep3r;
  IConnext public connext;
  ISpokeConnector public spokeConnector;
  uint32 public domain;

  /**
   * @notice Delay for the proposeAggregateRoot function
   * @dev Can be updated by admin
   */
  uint256 public proposeAggregateRootCooldown;

  /**
   * @notice Timestamp of when last aggregate was proposed
   */
  uint256 public lastProposeAggregateRootAt;

  /**
   * @notice Delay for the finalize function
   */
  uint256 public finalizeCooldown;

  /**
   * @notice Timestamp of the last time the finalize job was worked.
   */
  uint256 public lastFinalizeAt;

  mapping(address => bool) public allowedRelayer;

  // ============ Modifier ============

  modifier onlyRelayer() {
    if (!allowedRelayer[msg.sender]) {
      revert RelayerProxy__onlyRelayer_notRelayer();
    }
    _;
  }

  modifier definedAddress(address _input) {
    if (_input == address(0)) {
      revert RelayerProxy__definedAddress_empty();
    }
    _;
  }

  // Modifier in charge of verifying if the caller is a registered keeper as well as
  // rewarding them with an amount of KP3R equal to their gas spent + premium.
  modifier validateAndPayWithCredits(address _keeper) {
    if (!keep3r.isKeeper(_keeper)) {
      revert RelayerProxy__validateAndPayWithCredits_notKeep3r();
    }
    _;
    keep3r.worked(_keeper); // Pays the keeper for the work.
  }

  modifier onlyProposeCooledDown() {
    if (block.timestamp < lastProposeAggregateRootAt + proposeAggregateRootCooldown) {
      revert RelayerProxy__proposeAggregateRootCooledDown_notCooledDown();
    }
    _;
    lastProposeAggregateRootAt = block.timestamp;
  }

  modifier onlyFinalizeCooledDown() {
    if (block.timestamp < lastFinalizeAt + finalizeCooldown) {
      revert RelayerProxy__finalizeCooledDown_notCooledDown();
    }
    _;
    lastFinalizeAt = block.timestamp;
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
   * @param token The token address
   * @param amount The amount removed
   * @param balance The updated balance of the contract
   */
  event FundsDeducted(address token, uint256 amount, uint256 balance);

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

  /**
   * @notice Emitted when Keep3r address is updated by admin
   * @param updated New Keep3r address in the contract
   * @param previous Old Keep3r address in the contract
   */
  event Keep3rChanged(address updated, address previous);

  /**
   * @notice Emitted when the cooldown period for proposeAggregateRoot is updated
   * @param proposeAggregateRootCooldown New cooldown period
   * @param oldProposeAggregateRootCooldown Old cooldown period
   */
  event ProposeAggregateRootCooldownChanged(
    uint256 proposeAggregateRootCooldown,
    uint256 oldProposeAggregateRootCooldown
  );

  /**
   * @notice Emitted when the cooldown period for finalize is updated
   * @param finalizeCooldown New cooldown period
   * @param oldFinalizeCooldown Old cooldown period
   */
  event FinalizeCooldownChanged(uint256 finalizeCooldown, uint256 oldFinalizeCooldown);

  // ============ Error ============
  error RelayerProxy__addRelayer_relayerAdded();
  error RelayerProxy__removeRelayer_relayerNotAdded();
  error RelayerProxy__onlyRelayer_notRelayer();
  error RelayerProxy__definedAddress_empty();
  error RelayerProxy__isWorkableBySender_notWorkable();
  error RelayerProxy__validateAndPayWithCredits_notKeep3r();
  error RelayerProxy__validateProposeSignature_notProposer(address signer);
  error RelayerProxy__proposeAggregateRootCooledDown_notCooledDown();
  error RelayerProxy__finalizeCooledDown_notCooledDown();

  // ============ Structs ============

  /**
   * Struct containing the construstor arguments of a RelayerProxy
   * @param connext The address of the Connext on this domain.
   * @param spokeConnector The address of the SpokeConnector on this domain.
   * @param gelatoRelayer The address of the Gelato relayer on this domain.
   * @param feeCollector The address of the Gelato Fee Collector on this domain.
   * @param keep3r The address of the Keep3r on this domain.
   * @param proposeAggregateRootCooldown The delay for the propose function.
   * @param finalizeCooldown The delay for the finalize function.
   */
  struct ConstructorParams {
    address connext;
    address spokeConnector;
    address gelatoRelayer;
    address feeCollector;
    address keep3r;
    uint256 proposeAggregateRootCooldown;
    uint256 finalizeCooldown;
  }

  // ============ Constructor ============

  /**
   * @notice Creates a new RelayerProxy instance.
   */
  constructor(ConstructorParams memory _params) ProposedOwnable() {
    _setOwner(msg.sender);
    _setConnext(_params.connext);
    _setSpokeConnector(_params.spokeConnector);
    _setGelatoRelayer(_params.gelatoRelayer);
    _setFeeCollector(_params.feeCollector);
    _setKeep3r(_params.keep3r);
    _setProposeAggregateRootCooldown(_params.proposeAggregateRootCooldown);
    _setFinalizeCooldown(_params.finalizeCooldown);

    _addRelayer(_params.gelatoRelayer);

    domain = ISpokeConnector(_params.spokeConnector).DOMAIN();
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
   * @notice Updates the Keep3r contract address on this contract.
   *
   * @param _keep3r - New Keep3r contract address.
   */
  function setKeep3r(address _keep3r) external onlyOwner definedAddress(_keep3r) {
    _setKeep3r(_keep3r);
  }

  /**
   * @notice Updates the propose cooldown.
   * @param _proposeCooldown The new cooldown in seconds.
   */
  function setProposeAggregateRootCooldown(uint256 _proposeCooldown) external onlyOwner {
    _setProposeAggregateRootCooldown(_proposeCooldown);
  }

  /**
   * @notice Updates the finalize cooldown.
   * @param _finalizeCooldown The new cooldown in seconds.
   */
  function setFinalizeCooldown(uint256 _finalizeCooldown) external onlyOwner {
    _setFinalizeCooldown(_finalizeCooldown);
  }

  /**
   * @notice Updates the propose cooldown period on this contract.
   *
   * @param _proposeAggregateRootCooldown - Delay for propose.
   */
  function _setProposeAggregateRootCooldown(uint256 _proposeAggregateRootCooldown) internal {
    emit ProposeAggregateRootCooldownChanged(_proposeAggregateRootCooldown, proposeAggregateRootCooldown);
    proposeAggregateRootCooldown = _proposeAggregateRootCooldown;
  }

  /**
   * @notice Updates the finalize cooldown period on this contract.
   *
   * @param _finalizeCooldown - Delay for finalize.
   */
  function _setFinalizeCooldown(uint256 _finalizeCooldown) internal {
    emit FinalizeCooldownChanged(_finalizeCooldown, finalizeCooldown);
    finalizeCooldown = _finalizeCooldown;
  }

  /**
   * @notice Withdraws tokens stored on this contract to msg.sender.
   */
  function withdraw(address _token) external onlyOwner nonReentrant {
    uint256 balance = _token == address(0) ? address(this).balance : IERC20(_token).balanceOf(address(this));

    if (_token == address(0)) {
      Address.sendValue(payable(msg.sender), balance);
    } else {
      IERC20(_token).transfer(msg.sender, balance);
    }

    emit FundsDeducted(_token, balance, balance);
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
  function execute(
    ExecuteArgs calldata _args,
    uint256 _fee
  ) external onlyRelayer nonReentrant returns (bytes32 transferId) {
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
  function send(bytes memory _encodedData, uint256 _messageFee, uint256 _relayerFee) external onlyRelayer nonReentrant {
    spokeConnector.send{value: _messageFee}(_encodedData);
    emit FundsDeducted(address(0), _messageFee, address(this).balance);
    transferRelayerFee(_relayerFee);
  }

  /**
   * @notice Wraps the call to proposeAggregateRoot() on SpokeConnector and pays either the caller or hardcoded relayer
   * @dev _rootTimestamp is required for off-chain agents to be able to know which root they should fetch from the root manager contract
   *                     in order to compare it with the one being proposed. The off-chain agents should also ensure the proposed root is
   *                     not an old one.
   * @param _aggregateRoot The aggregate root to propose.
   * @param _rootTimestamp Block.timestamp at which the root was finalized in the root manager contract.
   * @param _signature Signature from the approved proposer.
   * @param _fee - Fee to be paid to relayer.
   */
  function proposeAggregateRoot(
    bytes32 _aggregateRoot,
    uint256 _rootTimestamp,
    bytes memory _signature,
    uint256 _fee
  ) external onlyRelayer onlyProposeCooledDown nonReentrant {
    // Validate the signer
    _validateProposeSignature(_aggregateRoot, _rootTimestamp, lastProposeAggregateRootAt, _signature);

    spokeConnector.proposeAggregateRoot(_aggregateRoot, _rootTimestamp);

    transferRelayerFee(_fee);
  }

  /**
   * @notice Wraps the `finalize` function on root manager
   * @param _proposedAggregateRoot The aggregate root currently proposed
   * @param _rootTimestamp         Block.timestamp at which the root was finalized in the root manager contract.
   * @param _endOfDispute          The block in which the dispute period for proposed root finalizes
   */
  function finalize(
    bytes32 _proposedAggregateRoot,
    uint256 _rootTimestamp,
    uint256 _endOfDispute
  ) external onlyFinalizeCooledDown nonReentrant {
    // Finalized the proposed aggregate root
    spokeConnector.finalize(_proposedAggregateRoot, _rootTimestamp, _endOfDispute);
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
    if (_fee == 0) {
      return;
    }
    if (msg.sender == gelatoRelayer) {
      Address.sendValue(payable(feeCollector), _fee);
    } else {
      Address.sendValue(payable(msg.sender), _fee);
    }
    emit FundsDeducted(address(0), _fee, address(this).balance);
  }

  function _addRelayer(address _relayer) internal {
    if (allowedRelayer[_relayer]) {
      revert RelayerProxy__addRelayer_relayerAdded();
    }

    allowedRelayer[_relayer] = true;
    emit RelayerAdded(_relayer);
  }

  function _removeRelayer(address _relayer) internal {
    if (!allowedRelayer[_relayer]) {
      revert RelayerProxy__removeRelayer_relayerNotAdded();
    }

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

  function _setKeep3r(address _keep3r) internal {
    emit Keep3rChanged(_keep3r, address(keep3r));
    keep3r = IKeep3rV2(_keep3r);
  }

  function _validateProposeSignature(
    bytes32 _aggregateRoot,
    uint256 _rootTimestamp,
    uint256 _lastProposeAggregateRootAt,
    bytes memory _signature
  ) internal view {
    // Get the payload
    // To prevent signature replay, added `lastProposeAggregateRootAt` and `domain`.
    // `lastProposeAggregateRootAt` will be strictly increased after proposed, so same signature can't be used again.
    // Also domain will prevent the replay from other chains.
    bytes32 payload = keccak256(abi.encodePacked(_aggregateRoot, _rootTimestamp, _lastProposeAggregateRootAt, domain));
    // Recover signer
    address signer = payload.toEthSignedMessageHash().recover(_signature);
    if (!spokeConnector.allowlistedProposers(signer)) {
      revert RelayerProxy__validateProposeSignature_notProposer(signer);
    }
  }
}
