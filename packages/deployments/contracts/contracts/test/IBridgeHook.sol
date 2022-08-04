// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.15;

interface IBridgeHook {
  /**
   * @notice Handles an incoming bridge transfer with some tokens and extra
   * data. Takes any necessary actions for the hook's purposes.
   *
   * This function is intended to allow arbitrary post-bridge actions with
   * tokens, at a user's discretion. E.g. recollateralize a CDP, exchange for
   * other tokens, emit an event, etc.
   *
   * @dev This hook is called AFTER tokens have been transferred to the hook
   * contract. If this hook errors, the bridge WILL NOT revert, and the hook
   * contract will own those tokens. Hook contracts MUST have a recovery plan
   * in place for these situations.
   *
   * @param _origin The domain of the chain from which the transfer originated
   * @param _sender The identifier of the caller which sent the tokens over the bridge
   * @param _tokenDomain The canonical deployment domain of the token
   * @param _tokenAddress The identifier for the token on its canonical domain
   * @param _localToken The local address of the token (its canonical
   *                    address if it is local to this domain, otherwise its
   *                    the address of its local representation).
   * @param _amount The amount of token received over the bridge
   * @param _extraData Extra user-specified data passed in to the origin chain
   */
  function onReceive(
    uint32 _origin,
    bytes32 _sender,
    uint32 _tokenDomain,
    bytes32 _tokenAddress,
    address _localToken,
    uint256 _amount,
    bytes memory _extraData
  ) external;
}
