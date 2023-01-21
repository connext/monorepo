// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {ProposedOwnable} from "../../shared/ProposedOwnable.sol";
import {IXReceiver} from "../connext/interfaces/IXReceiver.sol";

interface IWrapper {
  function withdraw(uint256 wad) external;

  function transfer(address dst, uint256 wad) external returns (bool);
}

/**
 * @notice A utility contract for unwrapping native tokens at the destination.
 *
 * @dev The `xreceive` function of contract may fail in the following ways:
 * - unwrapping fails
 * - the wrong asset is delivered, and transferring that fails
 * - sending the native asset fails
 * - the caller is not connext
 * - the amount is zero
 * - balance of the contract != amount
 *
 * In the event of these failures, funds for the crosschain transfer will be sent
 * to this contract and will be held here. To rescue them, the owner of this contract
 * can call `sweep` or `unwrapAndSweep` to transfer assets from this contract to a
 * specified address.
 *
 * It is unlikely failures of these types will occur, so ownership of this contract
 * should be renounced after a suitable trial period on mainnet.
 *
 * @dev Ownership of this contract is governed using the same ProposedOwnable setup
 * that is prevalent throughout the system.
 */
contract Unwrapper is ProposedOwnable, IXReceiver {
  // ============ Libraries ============

  using SafeERC20 for IERC20;

  // ============ Events ============

  /**
   * @notice Emitted if the wrong wrapper asset is sent.
   * @param recipient - The target recipient address.
   * @param asset - The asset sent.
   */
  event WrongAsset(address recipient, address asset);

  /**
   * @notice Emitted when funds are sent from this contract
   * @param recipient - The target recipient address.
   * @param asset - The asset sent.
   * @param amount - The amount of the asset sent
   */
  event FundsDelivered(address recipient, address asset, uint256 amount);

  // ============ Properties ============

  /**
   * @notice Connext (diamond proxy) address, the only address permissioned to call `xReceive`.
   */
  address public immutable CONNEXT;

  /**
   * @notice The wrapper contract that this contract will always use for unwrapping native token.
   */
  IWrapper public immutable WRAPPER;

  // ============= Modifiers ==============

  /**
   * @notice Ensure caller is only the designated CONNEXT bridge address.
   */
  modifier onlyConnext() {
    require(msg.sender == CONNEXT, "unwrap: !connext");
    _;
  }

  // ============ Constructor ============

  /**
   * @dev The initial owner is set to the `msg.sender` of the contract.
   */
  constructor(address connext, address wrapper) ProposedOwnable() {
    _setOwner(msg.sender);
    WRAPPER = IWrapper(wrapper);
    CONNEXT = connext;
  }

  // ============ Admin Functions ============

  /**
   * @notice Sweeps the provided token from this address to a designated recipient.
   * @dev Only the owner of this contract can call this function.
   *
   * @dev Funds will end up on this contract IFF the external call on the Connext contract
   * fails and the transfer is reconciled. The `xreceive` function can fail in the following
   * cases:
   * - unwrapping fails
   * - transferring the asset fails
   * - `connext` is not the caller (should not sweep in this case)
   * - amount is zero (should not sweep in this case).
   *
   * It is left to the admin to determine the proper amounts to sweep.
   *
   * @param recipient The address to send the funds to
   * @param asset The asset to send from the contract to recipient
   * @param amount Amount of asset to sweep from contract
   */
  function sweep(
    address recipient,
    address asset,
    uint256 amount
  ) public onlyOwner {
    // Sanity check: amount is non-zero (otherwise, what are we unwrapping?).
    require(amount != 0, "sweep: !amount");

    // Send funds to recipient
    _sweep(recipient, asset, amount);
  }

  /**
   * @notice Unwraps and sweeps the provided token from this address to a designated recipient.
   * @dev Only the owner of this contract can call this function.
   *
   * @dev Funds will end up on this contract IFF the external call on the Connext contract
   * fails and the transfer is reconciled. The `xreceive` function can fail in the following
   * cases:
   * - unwrapping fails
   * - transferring the asset fails
   * - `connext` is not the caller (should not sweep in this case)
   * - amount is zero (should not sweep in this case).
   *
   * It is left to the admin to determine the proper amounts to sweep.
   *
   * @param recipient The address to send the funds to
   * @param amount Amount of asset to sweep from contract
   */
  function unwrapAndSweep(address recipient, uint256 amount) public onlyOwner {
    // Sanity check: amount is non-zero (otherwise, what are we unwrapping?).
    require(amount != 0, "unwrapAndSweep: !amount");

    // Withdraw from wrapper
    WRAPPER.withdraw(amount);

    // Send funds to recipient
    _sweep(recipient, address(0), amount);
  }

  // ============ Public Functions ============

  /**
   * @notice xReceive implementation for receiving cross-chain calls from Connext.
   * @dev We mostly ignore `originSender` argument: this could be a contract or EOA, but our
   * recipient should be specified in our `callData`! We only fallback to using `originSender` IFF
   * recipient argument is missing.
   * @dev If unwrapping (i.e. `withdraw`) fails, will emit UnwrappingFailed event! We will attempt
   * to transfer the wrapped tokens to the
   *
   * @param amount - The amount to transfer. Should NOT be 0, or this call will revert.
   * @param asset - This *should be* the wrapper contract address, an ERC20 token approved by the
   * Connext bridge. IFF this does NOT match the WRAPPER contract address stored in this contract,
   * we'll try to `IERC20.transfer` the assets to the intended recipient.
   * @param callData - Should be a tuple of just `(address)`. The address is the intended
   * recipient of the unwrapped native tokens. Whether it's ether or wether (i.e. whether it's
   * wrapped native tokens or native tokens) depends on whether we succeeded in the unwrapping
   * process.
   */
  function xReceive(
    bytes32, // transferId
    uint256 amount,
    address asset,
    address, // originSender
    uint32, // origin domain
    bytes memory callData
  ) external onlyConnext returns (bytes memory) {
    // Sanity check: amount is non-zero (otherwise, what are we unwrapping?).
    require(amount != 0, "unwrap: !amount");

    // Get the target recipient, which should be in the callData.
    // NOTE: If recipient is the zero address, funds will be burned!
    address recipient = abi.decode(callData, (address));

    // Sanity check: asset we've received matches our target wrapper.
    if (asset != address(WRAPPER)) {
      emit WrongAsset(recipient, asset);
      // If the delivered asset does not match our target wrapper, we try sending it anyway.
      _sweep(recipient, asset, amount);
      return bytes("");
    }

    // We've received wrapped native tokens; withdraw native tokens from the wrapper contract.
    WRAPPER.withdraw(amount);

    // Send to recipient
    _sweep(recipient, address(0), amount);
  }

  /**
   * @notice Fallback function so this contract can receive the funds from WETH
   */
  receive() external payable {}

  // ============ Internal Functions ============

  /**
   * @notice Sweeps the provided token from this address to a designated recipient.
   * @dev Emits the `FundsDelivered` event
   *
   * @param recipient The address to send the funds to
   * @param asset The asset (or address(0) for native) to send from the contract to recipient
   * @param amount Amount of asset to sweep from contract
   */
  function _sweep(
    address recipient,
    address asset,
    uint256 amount
  ) internal {
    if (asset == address(0)) {
      Address.sendValue(payable(recipient), amount);
    } else {
      IERC20(asset).transfer(recipient, amount);
    }
    emit FundsDelivered(recipient, asset, amount);
  }
}
