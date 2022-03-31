// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// ============ Internal Imports ============
import {IUpdaterManager} from "../interfaces/IUpdaterManager.sol";
import {Home} from "./Home.sol";
// ============ External Imports ============
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

/**
 * @title UpdaterManager
 * @author Illusory Systems Inc.
 * @notice MVP / centralized version of contract
 * that will manage Updater bonding, slashing,
 * selection and rotation
 */
contract UpdaterManager is IUpdaterManager, Ownable {
  // ============ Internal Storage ============

  // address of home contract
  address internal home;

  // ============ Private Storage ============

  // address of the current updater
  address private _updater;

  // ============ Events ============

  /**
   * @notice Emitted when a new home is set
   * @param home The address of the new home contract
   */
  event NewHome(address home);

  /**
   * @notice Emitted when slashUpdater is called
   */
  event FakeSlashed(address reporter);

  // ============ Modifiers ============

  /**
   * @notice Require that the function is called
   * by the Home contract
   */
  modifier onlyHome() {
    require(msg.sender == home, "!home");
    _;
  }

  // ============ Constructor ============

  constructor(address _updaterAddress) payable Ownable() {
    _updater = _updaterAddress;
  }

  // ============ External Functions ============

  /**
   * @notice Set the address of the a new home contract
   * @dev only callable by trusted owner
   * @param _home The address of the new home contract
   */
  function setHome(address _home) external onlyOwner {
    require(Address.isContract(_home), "!contract home");
    home = _home;

    emit NewHome(_home);
  }

  /**
   * @notice Set the address of a new updater
   * @dev only callable by trusted owner
   * @param _updaterAddress The address of the new updater
   */
  function setUpdater(address _updaterAddress) external onlyOwner {
    _updater = _updaterAddress;
    Home(home).setUpdater(_updaterAddress);
  }

  /**
   * @notice Slashes the updater
   * @dev Currently does nothing, functionality will be implemented later
   * when updater bonding and rotation are also implemented
   * @param _reporter The address of the entity that reported the updater fraud
   */
  function slashUpdater(address payable _reporter) external override onlyHome {
    emit FakeSlashed(_reporter);
  }

  /**
   * @notice Get address of current updater
   * @return the updater address
   */
  function updater() external view override returns (address) {
    return _updater;
  }
}
