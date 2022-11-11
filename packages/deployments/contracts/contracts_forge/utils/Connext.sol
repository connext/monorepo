// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
*
* Implementation of a diamond.
/******************************************************************************/

import {LibDiamond} from "../../contracts/core/connext/libraries/LibDiamond.sol";
import {IDiamondCut} from "../../contracts/core/connext/interfaces/IDiamondCut.sol";
import {AppStorage} from "../../contracts/core/connext/libraries/LibConnextStorage.sol";

contract Connext {
  AppStorage s;

  constructor(
    address _contractOwner,
    address _init,
    bytes memory _initCalldata,
    IDiamondCut.FacetCut[] memory _diamondCuts
  ) {
    LibDiamond.setContractOwner(_contractOwner);

    LibDiamond.diamondCut(_diamondCuts, _init, _initCalldata);
  }

  // Find facet for function that is called and execute the
  // function if a facet is found and return any value.
  fallback() external payable {
    LibDiamond.DiamondStorage storage ds;
    bytes32 position = LibDiamond.DIAMOND_STORAGE_POSITION;
    // get diamond storage
    assembly {
      ds.slot := position
    }
    // get facet from function selector
    address facet = ds.selectorToFacetAndPosition[msg.sig].facetAddress;
    require(facet != address(0), "Diamond: Function does not exist");
    // Execute external function from facet using delegatecall and return any value.
    assembly {
      // copy function selector and any arguments
      calldatacopy(0, 0, calldatasize())
      // execute function call using the facet
      let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
      // get any return value
      returndatacopy(0, 0, returndatasize())
      // return any return value or error back to the caller
      switch result
      case 0 {
        revert(0, returndatasize())
      }
      default {
        return(0, returndatasize())
      }
    }
  }

  function isInitialized() public view returns (bool) {
    return s.initialized;
  }

  receive() external payable {}
}
