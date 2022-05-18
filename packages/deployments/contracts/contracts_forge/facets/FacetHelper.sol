// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {ITokenRegistry} from "../../contracts/nomad-xapps/interfaces/bridge/ITokenRegistry.sol";
import {LibConnextStorage, AppStorage} from "../../contracts/libraries/LibConnextStorage.sol";

import "../ForgeHelper.sol";

contract FacetHelper is ForgeHelper {
  address _tokenRegistry = address(6);

  function setDefaults() public {
    AppStorage storage s = LibConnextStorage.connextStorage();
    s.tokenRegistry = ITokenRegistry(_tokenRegistry);
  }
}
