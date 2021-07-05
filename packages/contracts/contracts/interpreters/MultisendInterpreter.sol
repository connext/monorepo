// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../interfaces/IMultisendInterpreter.sol";
import "../lib/LibAsset.sol";
import "../lib/LibERC20.sol";
import "@gnosis.pm/safe-contracts/contracts/libraries/MultiSendCallOnly.sol";

/// @title MultisendInterpreter
/// @author Connext <support@connext.network>
/// @notice This contract uses the @gnosis.pm MultiSendCallOnly helper function
///         to safely execute any calldata included in crosschain transfers.
/// @dev Should always be handled with a try-catch in nxtp to prevent funds
///      funds from being indefinitely locked.

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
