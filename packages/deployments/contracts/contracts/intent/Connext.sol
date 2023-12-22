// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import {IConnext} from "./interfaces/IConnext.sol";

contract Connext is IConnext {

    function xcall(
        uint32 _destination,
        address _to,
        address _asset,
        uint256 _amount,
        bytes calldata _callData
    ) external payable nonXCallReentrant returns (bytes32) {
        /**
        * XCall steps:
        * 1. Param validation + sanity checks
        * 2. Generate transferId
        * 3. Transfer tokens & fees to contract
        * 4. Look up asset in registry and get settlement strategy
        * 5. DelegateCall settlement module
        * 6. Create message and send --> TODO what if messages are settlement-dependent?
        * 7. Emit xcall event
        */
    }
}