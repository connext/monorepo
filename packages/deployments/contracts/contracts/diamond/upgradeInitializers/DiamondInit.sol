// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
*
* Implementation of a diamond.
/******************************************************************************/

import {LibDiamond} from "../libraries/LibDiamond.sol";
import { IDiamondLoupe } from "../interfaces/IDiamondLoupe.sol";
import { IDiamondCut } from "../interfaces/IDiamondCut.sol";
import { IERC173 } from "../interfaces/IERC173.sol";
import { IERC165 } from "../interfaces/IERC165.sol";

import {BaseConnextFacet} from "../facets/BaseConnextFacet.sol";

import {XAppConnectionManager} from "../../nomad-core/contracts/XAppConnectionManager.sol";
import {RelayerFeeRouter} from "../../nomad-xapps/contracts/relayer-fee-router/RelayerFeeRouter.sol";
import {ITokenRegistry} from "../../nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {Executor} from "../../interpreters/Executor.sol";
import {IWrapped} from "../../interfaces/IWrapped.sol";

// It is expected that this contract is customized if you want to deploy your diamond
// with data from a deployment script. Use the init function to initialize state variables
// of your diamond. Add parameters to the init funciton if you need to.

contract DiamondInit is BaseConnextFacet {
    // You can add parameters to this function in order to pass in
    // data to set your own state variables
    function init(
        uint256 _domain,
        address _xAppConnectionManager,
        address _tokenRegistry, // Nomad token registry
        address _wrappedNative,
        address _relayerFeeRouter
    ) external {
        // adding ERC165 data
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
        ds.supportedInterfaces[type(IERC173).interfaceId] = true;

        // add your own state variables
        // EIP-2535 specifies that the `diamondCut` function takes two optional
        // arguments: address _init and bytes calldata _calldata
        // These arguments are used to execute an arbitrary function using delegatecall
        // in order to set state variables in the diamond during deployment or an upgrade
        // More info here: https://eips.ethereum.org/EIPS/eip-2535#diamond-interface

        // __XAppConnectionClient_initialize
        s.xAppConnectionManager = XAppConnectionManager(_xAppConnectionManager);

        // __ProposedOwnable_init
        s._owner = msg.sender;

        // __ReentrancyGuard_init_unchained
        s._status = _NOT_ENTERED;

        // ConnextHandler
        s.domain = _domain;
        s.relayerFeeRouter = RelayerFeeRouter(_relayerFeeRouter);
        s.executor = new Executor(address(this));
        s.tokenRegistry = ITokenRegistry(_tokenRegistry);
        s.wrapper = IWrapped(_wrappedNative);
        s.LIQUIDITY_FEE_NUMERATOR = 9995;
        s.LIQUIDITY_FEE_DENOMINATOR = 10000;
        s.maxRoutersPerTransfer = 5;

    }
}
