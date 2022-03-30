// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// ============ Internal Imports ============
import {Home} from "./Home.sol";
import {Replica} from "./Replica.sol";
import {TypeCasts} from "../libs/TypeCasts.sol";
// ============ External Imports ============
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title XAppConnectionManager
 * @author Illusory Systems Inc.
 * @notice Manages a registry of local Replica contracts
 * for remote Home domains. Accepts Watcher signatures
 * to un-enroll Replicas attached to fraudulent remote Homes
 */
contract XAppConnectionManager is Ownable {
  // ============ Public Storage ============

  // Home contract
  Home public home;
  // local Replica address => remote Home domain
  mapping(address => uint32) public replicaToDomain;
  // remote Home domain => local Replica address
  mapping(uint32 => address) public domainToReplica;
  // watcher address => replica remote domain => has/doesn't have permission
  mapping(address => mapping(uint32 => bool)) private watcherPermissions;

  // ============ Events ============

  /**
   * @notice Emitted when a new Replica is enrolled / added
   * @param domain the remote domain of the Home contract for the Replica
   * @param replica the address of the Replica
   */
  event ReplicaEnrolled(uint32 indexed domain, address replica);

  /**
   * @notice Emitted when a new Replica is un-enrolled / removed
   * @param domain the remote domain of the Home contract for the Replica
   * @param replica the address of the Replica
   */
  event ReplicaUnenrolled(uint32 indexed domain, address replica);

  /**
   * @notice Emitted when Watcher permissions are changed
   * @param domain the remote domain of the Home contract for the Replica
   * @param watcher the address of the Watcher
   * @param access TRUE if the Watcher was given permissions, FALSE if permissions were removed
   */
  event WatcherPermissionSet(uint32 indexed domain, address watcher, bool access);

  // ============ Modifiers ============

  modifier onlyReplica() {
    require(isReplica(msg.sender), "!replica");
    _;
  }

  // ============ Constructor ============

  // solhint-disable-next-line no-empty-blocks
  constructor() Ownable() {}

  // ============ External Functions ============

  /**
   * @notice Un-Enroll a replica contract
   * in the case that fraud was detected on the Home
   * @dev in the future, if fraud occurs on the Home contract,
   * the Watcher will submit their signature directly to the Home
   * and it can be relayed to all remote chains to un-enroll the Replicas
   * @param _domain the remote domain of the Home contract for the Replica
   * @param _updater the address of the Updater for the Home contract (also stored on Replica)
   * @param _signature signature of watcher on (domain, replica address, updater address)
   */
  function unenrollReplica(
    uint32 _domain,
    bytes32 _updater,
    bytes memory _signature
  ) external {
    // ensure that the replica is currently set
    address _replica = domainToReplica[_domain];
    require(_replica != address(0), "!replica exists");
    // ensure that the signature is on the proper updater
    require(Replica(_replica).updater() == TypeCasts.bytes32ToAddress(_updater), "!current updater");
    // get the watcher address from the signature
    // and ensure that the watcher has permission to un-enroll this replica
    address _watcher = _recoverWatcherFromSig(_domain, TypeCasts.addressToBytes32(_replica), _updater, _signature);
    require(watcherPermissions[_watcher][_domain], "!valid watcher");
    // remove the replica from mappings
    _unenrollReplica(_replica);
  }

  /**
   * @notice Set the address of the local Home contract
   * @param _home the address of the local Home contract
   */
  function setHome(address _home) external onlyOwner {
    home = Home(_home);
  }

  /**
   * @notice Allow Owner to enroll Replica contract
   * @param _replica the address of the Replica
   * @param _domain the remote domain of the Home contract for the Replica
   */
  function ownerEnrollReplica(address _replica, uint32 _domain) external onlyOwner {
    // un-enroll any existing replica
    _unenrollReplica(_replica);
    // add replica and domain to two-way mapping
    replicaToDomain[_replica] = _domain;
    domainToReplica[_domain] = _replica;
    emit ReplicaEnrolled(_domain, _replica);
  }

  /**
   * @notice Allow Owner to un-enroll Replica contract
   * @param _replica the address of the Replica
   */
  function ownerUnenrollReplica(address _replica) external onlyOwner {
    _unenrollReplica(_replica);
  }

  /**
   * @notice Allow Owner to set Watcher permissions for a Replica
   * @param _watcher the address of the Watcher
   * @param _domain the remote domain of the Home contract for the Replica
   * @param _access TRUE to give the Watcher permissions, FALSE to remove permissions
   */
  function setWatcherPermission(
    address _watcher,
    uint32 _domain,
    bool _access
  ) external onlyOwner {
    watcherPermissions[_watcher][_domain] = _access;
    emit WatcherPermissionSet(_domain, _watcher, _access);
  }

  /**
   * @notice Query local domain from Home
   * @return local domain
   */
  function localDomain() external view returns (uint32) {
    return home.localDomain();
  }

  /**
   * @notice Get access permissions for the watcher on the domain
   * @param _watcher the address of the watcher
   * @param _domain the domain to check for watcher permissions
   * @return TRUE iff _watcher has permission to un-enroll replicas on _domain
   */
  function watcherPermission(address _watcher, uint32 _domain) external view returns (bool) {
    return watcherPermissions[_watcher][_domain];
  }

  // ============ Public Functions ============

  /**
   * @notice Check whether _replica is enrolled
   * @param _replica the replica to check for enrollment
   * @return TRUE iff _replica is enrolled
   */
  function isReplica(address _replica) public view returns (bool) {
    return replicaToDomain[_replica] != 0;
  }

  // ============ Internal Functions ============

  /**
   * @notice Remove the replica from the two-way mappings
   * @param _replica replica to un-enroll
   */
  function _unenrollReplica(address _replica) internal {
    uint32 _currentDomain = replicaToDomain[_replica];
    domainToReplica[_currentDomain] = address(0);
    replicaToDomain[_replica] = 0;
    emit ReplicaUnenrolled(_currentDomain, _replica);
  }

  /**
   * @notice Get the Watcher address from the provided signature
   * @return address of watcher that signed
   */
  function _recoverWatcherFromSig(
    uint32 _domain,
    bytes32 _replica,
    bytes32 _updater,
    bytes memory _signature
  ) internal view returns (address) {
    bytes32 _homeDomainHash = Replica(TypeCasts.bytes32ToAddress(_replica)).homeDomainHash();
    bytes32 _digest = keccak256(abi.encodePacked(_homeDomainHash, _domain, _updater));
    _digest = ECDSA.toEthSignedMessageHash(_digest);
    return ECDSA.recover(_digest, _signature);
  }
}
