// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity 0.8.17;

/**
    @title Interface to be used with contracts that want per function access control.
    @author ChainSafe Systems.
 */
interface IAccessControlSegregator {
  /**
        @notice Returns boolean value if account has access to function.
        @param sig Function identifier.
        @param account Address of account.
        @return Boolean value depending if account has access.
    */
  function hasAccess(bytes4 sig, address account) external view returns (bool);
}
