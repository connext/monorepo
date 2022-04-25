// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

/**
 * @dev This is an auxiliary contract meant to be assigned as the admin of a {TransparentUpgradeableProxy}. For an
 * explanation of why you would want to use this see the documentation for {TransparentUpgradeableProxy}.
 */
contract ConnextProxyAdmin is ProxyAdmin {
  constructor(address owner) ProxyAdmin() {
    // We just need this for our hardhat tooling right now
  }
}
