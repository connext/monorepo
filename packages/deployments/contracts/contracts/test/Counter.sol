// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "../interfaces/IExecutor.sol";

import "../lib/LibCrossDomainProperty.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

contract Counter {
  bool public shouldRevert;
  uint256 public count = 0;
  IExecutor public executor;

  constructor() {
    shouldRevert = false;
  }

  function setShouldRevert(bool value) public {
    shouldRevert = value;
  }

  function setExecutor(address _executor) public {
    executor = IExecutor(_executor);
  }

  function increment() public {
    require(!shouldRevert, "increment: shouldRevert is true");
    count += 1;
  }

  function incrementAndSend(
    address assetId,
    address recipient,
    uint256 amount
  ) public payable {
    if (assetId == address(0)) {
      require(msg.value == amount, "incrementAndSend: INVALID_ETH_AMOUNT");
    } else {
      require(msg.value == 0, "incrementAndSend: ETH_WITH_ERC");
      SafeERC20Upgradeable.safeTransferFrom(IERC20Upgradeable(assetId), msg.sender, address(this), amount);
    }
    increment();

    transferAsset(assetId, payable(recipient), amount);
  }

  function attack() public payable {
    require(msg.value >= 0.1 ether);
    executor.execute(
      bytes32(uint256(11111)),
      0.1 ether,
      payable(address(this)),
      address(0),
      LibCrossDomainProperty.EMPTY_BYTES,
      ""
    );
  }

  fallback() external payable {
    if (address(executor).balance >= 0.1 ether) {
      executor.execute(
        bytes32(uint256(11111)),
        0.1 ether,
        payable(address(this)),
        address(0),
        LibCrossDomainProperty.EMPTY_BYTES,
        ""
      );
    }
  }

  function transferAsset(
    address assetId,
    address payable recipient,
    uint256 amount
  ) internal {
    assetId == address(0)
      ? AddressUpgradeable.sendValue(recipient, amount)
      : SafeERC20Upgradeable.safeTransfer(IERC20Upgradeable(assetId), recipient, amount);
  }
}
