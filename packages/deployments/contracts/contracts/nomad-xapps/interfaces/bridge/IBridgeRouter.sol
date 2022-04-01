// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

/**
 * @title IBridgeRouter
 */
interface IBridgeRouter {

  // ======== External: Send Token =========

  /**
   * @notice Send tokens to a recipient on a remote chain
   * @param _token The token address
   * @param _amount The token amount
   * @param _destination The destination domain
   * @param _recipient The recipient address
   * @param _enableFast True to enable fast liquidity
   */
  function send(
    address _token,
    uint256 _amount,
    uint32 _destination,
    bytes32 _recipient,
    bool _enableFast,
    bytes32 _externalHash
  ) external;


  // ======== External: Fast Liquidity =========

  /**
   * @notice Sets the transaction manager.
   * @dev Transacion manager and bridge router store references to each other
   * @param _connext the address of the transaction manager implementation
   */
  function setConnext(address _connext) external;

  // ======== External: Custom Tokens =========

  /**
   * @notice Enroll a custom token. This allows projects to work with
   * governance to specify a custom representation.
   * @param _domain the domain of the canonical Token to enroll
   * @param _id the bytes32 ID of the canonical of the Token to enroll
   * @param _custom the address of the custom implementation to use.
   */
  function enrollCustom(
    uint32 _domain,
    bytes32 _id,
    address _custom
  ) external;

  /**
   * @notice Migrate all tokens in a previous representation to the latest
   * custom representation. This works by looking up local mappings and then
   * burning old tokens and minting new tokens.
   * @dev This is explicitly opt-in to allow dapps to decide when and how to
   * upgrade to the new representation.
   * @param _oldRepr The address of the old token to migrate
   */
  function migrate(address _oldRepr) external;
}
