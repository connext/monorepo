// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

// Import OZ Proxy contracts
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import {UpgradeableBeacon} from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import {BeaconProxy} from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import {Deployer} from "./Deployer.sol";

abstract contract ProxyDeployer is Deployer {
  function deployBeacon(address impl) public returns (address) {
    UpgradeableBeacon beacon = new UpgradeableBeacon(impl);
    address beaconAddress = address(beacon);
    vm.label(address(beaconAddress), "Upgradeable Beacon");
    return beaconAddress;
  }

  function deployBeaconProxy(address _beacon, bytes memory data) public returns (address) {
    BeaconProxy beaconProxy = new BeaconProxy(_beacon, data);
    address proxyAddress = address(beaconProxy);
    vm.label(proxyAddress, "Beacon Proxy");
    return proxyAddress;
  }

  function deployErc1967Proxy(address implementation, bytes memory data) public returns (address) {
    ERC1967Proxy erc1967 = new ERC1967Proxy(implementation, data);
    address proxyAddress = address(erc1967);
    vm.label(proxyAddress, "ERC1967 Proxy");
    return proxyAddress;
  }

  function deployUupsProxy(address implementation, address admin, bytes memory data) public returns (address) {
    TransparentUpgradeableProxy uups = new TransparentUpgradeableProxy(implementation, admin, data);
    address proxyAddress = address(uups);
    vm.label(proxyAddress, "UUPS Proxy");
    return proxyAddress;
  }

  function upgradeBeaconProxy(address _beacon, address implementation) public {
    UpgradeableBeacon(_beacon).upgradeTo(implementation);
  }

  function upgradeUupsProxy(address payable proxy, address implementation, bytes memory data) public {
    TransparentUpgradeableProxy uups = TransparentUpgradeableProxy(proxy);
    if (data.length > 0) {
      uups.upgradeToAndCall(implementation, data);
    } else {
      uups.upgradeTo(implementation);
    }
  }
}
