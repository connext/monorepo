// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @notice Handles accounting for "orphaned" tokens on destination xapps. Orphaned, in this case, means
 * tokens that were delivered via a Connext transfer but were unable to be processed or handled as intended
 * in the `xReceive` method on the destination xapp (e.g. unexpected or incorrect token delivered, corrupted
 * or incorrect `callData`, or external dependency failure, etc.).
 *
 * Once tokens (ERC20 OR native tokens, both are supported!) have been orphaned here, the designated
 * 'parent' (i.e. the rightful owner of the funds) can come pick them up at their discretion.
 *
 * NOTE: If the rightful owner is a bunk address or a non-EOA that's unable to call `saveOrphans`, the
 * orphaned funds may be lost forever.
 *
 * @dev This contract should be inherited by the `IXReceiver` implementer!
 */
abstract contract Orphanage {
  // ============ Events ============

  event OrphanedTokens(address indexed token, uint256 indexed amount, address indexed parent, bytes reason);
  event OrphanedNativeTokens(uint256 indexed amount, address indexed parent, bytes reason);
  event SavedOrphans(address indexed token, uint256 indexed amount, address indexed parent);

  // ============ Properties ============

  /**
   * @notice If any ERC20 tokens get stuck in this contract due to xReceive failure, this
   * mapping secures who they belong to, so that owner can rescue their funds at a later time.
   * @dev owner => token => amount
   */
  mapping(address => mapping(address => uint256)) public orphanedTokens;

  /**
   * @notice If any native tokens (e.g. ETH) get stuck in this contract due to xReceive failure, this
   * mapping secures who they belong to, so that owner can rescue their funds at a later time.
   * @dev owner => amount
   */
  mapping(address => uint256) public orphanedNativeTokens;

  // ================ Getters ================

  /**
   * @notice Check whether you abandoned any orphaned ETH or ERC20 here.
   * @param token - Address of the ERC20 token whose orphanage we want to check; if address(0), we will
   * check the native token orphanage.
   */
  function checkOrphans(address token) public view returns (uint256) {
    return token == address(0) ? orphanedNativeTokens[msg.sender] : orphanedTokens[msg.sender][token];
  }

  /**
   * @notice Check whether you abandoned any orphaned ETH or ERC20 here.
   * @param token - Address of the ERC20 token whose orphanage we want to check; if address(0), we will
   * check the native token orphanage.
   * @param parent - Address of the neglecting parent.
   */
  function checkOrphansFor(address token, address parent) public view returns (uint256) {
    return token == address(0) ? orphanedNativeTokens[parent] : orphanedTokens[parent][token];
  }

  // ============ Public Functions ============

  /**
   * @notice Call this method to pick up your abandoned kids.
   * @param token - Address of the ERC20 tokens who have been orphaned here under the msg.sender's
   * account. If address(0) is specified, we withdraw the native tokens under the msg.sender's account.
   */
  function saveOrphans(address token) external {
    uint256 orphans = checkOrphans(token);
    require(orphans != 0, "orphanage: !orphans");

    if (token == address(0)) {
      // 0 out the caller's account.
      orphanedNativeTokens[msg.sender] = 0;
      // Send the poor orphaned ETH to a loving home.
      bool sent = payable(msg.sender).send(orphans);
      require(sent, "orphanage: !sent");
    } else {
      // 0 out the caller's account.
      orphanedTokens[msg.sender][token] = 0;
      // Transfer the poor orphaned tokens to a loving home.
      IERC20(token).transfer(msg.sender, orphans);
    }

    // Hooray!
    emit SavedOrphans(token, orphans, msg.sender);
  }

  // ======== Private Functions =========

  /**
   * @notice Called by the inheriting contract as a fallback operation when some part of the
   * xReceive process fails, and we're unable to deliver the transferred tokens to the recipient.
   * @dev We do NOT check whether any tokens were actually received here! Ensuring that the
   * specified tokens were ACTUALLY received and that a summing error does not occur is the
   * responsibility of the implementing contract!
   *
   * @param token - The ERC20 token that's being orphaned. Set to address(0) if it's a native token.
   * @param amount - Number of orphans we're taking in.
   * @param parent - The "parent" that's abandoned the orphans (and is thus permissioned to later
   * come rescue them).
   * @param reason - The informational reason indicating what failed, should usually be an error
   * message. Used for emitting an event.
   */
  function orphan(
    address token,
    uint256 amount,
    address parent,
    bytes memory reason
  ) internal {
    // Sanity check: reasonable amount.
    require(amount != 0, "orphanage: !orphans");
    // Sanity check: parent exists (I guess the analogy kind of falls flat here).
    require(parent != address(0), "orphanage: !parent");

    if (token == address(0)) {
      orphanedNativeTokens[parent] += amount;
      emit OrphanedNativeTokens(amount, parent, reason);
    } else {
      orphanedTokens[parent][token] += amount;
      emit OrphanedTokens(token, amount, parent, reason);
    }
  }
}
