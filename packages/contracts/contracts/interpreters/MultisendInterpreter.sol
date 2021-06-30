// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../interfaces/IMultisendInterpreter.sol";
import "../lib/LibAsset.sol";
import "../lib/LibERC20.sol";
import "@gnosis.pm/safe-contracts/contracts/libraries/MultiSendCallOnly.sol";

contract MultisendInterpreter is IMultisendInterpreter {
  /// @dev Address of the deployed multisending helper contract
  address public immutable multisend;

  constructor(address _multisend) {
    multisend = _multisend;
  }

  function execute(
    address assetId,
    uint256 amount,
    bytes calldata callData
  ) external payable override {
    if (LibAsset.isEther(assetId)) {
      require(msg.value == amount, "execute: VALUE_MISMATCH");
      MultiSendCallOnly(multisend).multiSend{value: msg.value}(callData);
    } else {
      require(msg.value == 0, "execute: ETH_WITH_ERC_TRANSFER");
      require(LibERC20.approve(assetId, multisend, amount), "execute: APPROVE_FAILED");

      MultiSendCallOnly(multisend).multiSend(callData);
    }
  }
}
