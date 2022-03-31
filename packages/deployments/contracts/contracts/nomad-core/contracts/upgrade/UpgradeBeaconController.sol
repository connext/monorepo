// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// ============ Internal Imports ============
import {UpgradeBeacon} from "./UpgradeBeacon.sol";
// ============ External Imports ============
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

/**
 * @title UpgradeBeaconController
 * @notice Set as the controller of UpgradeBeacon contract(s),
 * capable of changing their stored implementation address.
 * @dev This implementation is a minimal version inspired by 0age's implementation:
 * https://github.com/dharma-eng/dharma-smart-wallet/blob/master/contracts/upgradeability/DharmaUpgradeBeaconController.sol
 */
contract UpgradeBeaconController is Ownable {
  // ============ Events ============

  event BeaconUpgraded(address indexed beacon, address implementation);

  // ============ External Functions ============

  /**
   * @notice Modify the implementation stored in the UpgradeBeacon,
   * which will upgrade the implementation used by all
   * Proxy contracts using that UpgradeBeacon
   * @param _beacon Address of the UpgradeBeacon which will be updated
   * @param _implementation Address of the Implementation contract to upgrade the Beacon to
   */
  function upgrade(address _beacon, address _implementation) external onlyOwner {
    // Require that the beacon is a contract
    require(Address.isContract(_beacon), "beacon !contract");
    // Call into beacon and supply address of new implementation to update it.
    (bool _success, ) = _beacon.call(abi.encode(_implementation));
    // Revert with message on failure (i.e. if the beacon is somehow incorrect).
    if (!_success) {
      assembly {
        returndatacopy(0, 0, returndatasize())
        revert(0, returndatasize())
      }
    }
    emit BeaconUpgraded(_beacon, _implementation);
  }
}
