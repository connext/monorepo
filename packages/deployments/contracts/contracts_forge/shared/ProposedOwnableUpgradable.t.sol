// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import {ProposedOwnableUpgradeable} from "../../contracts/shared/ProposedOwnableUpgradeable.sol";

import "../utils/ForgeHelper.sol";
import "../utils/Mock.sol";

contract OwnableHelper is Initializable, ProposedOwnableUpgradeable {
  function initialize() public initializer {
    __ProposedOwnable_init();
  }
}

contract Proxy is ERC1967Proxy {
  constructor(address _logic, bytes memory _data) ERC1967Proxy(_logic, _data) {}

  function upgradeTo(address newImpl) public {
    _upgradeTo(newImpl);
  }

  function implementation() public returns (address) {
    return _implementation();
  }
}

contract ProposedOwnableUpgradeableTest is ForgeHelper {
  OwnableHelper upgradeable;
  Proxy proxy;

  function setUp() public {
    OwnableHelper impl = new OwnableHelper();

    proxy = new Proxy(address(impl), abi.encodeWithSelector(OwnableHelper.initialize.selector, bytes("")));

    upgradeable = OwnableHelper(payable(address(proxy)));
  }

  function test_ProposedOwnableUpgradeable__initialize_works() public {
    assertEq(upgradeable.owner(), address(this));
  }

  function test_ProposedOwnableUpgradeable__upgrade_works() public {
    OwnableHelper impl = new OwnableHelper();
    proxy.upgradeTo(address(impl));
    assertEq(proxy.implementation(), address(impl));
    assertEq(upgradeable.owner(), address(this));
  }
}
