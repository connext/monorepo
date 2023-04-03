// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "forge-std/Test.sol";
import "forge-std/console.sol";

abstract contract ForgeHelper is Test {
  using stdStorage for StdStorage;
  address public constant NATIVE_ASSET = address(0);
  bytes32 internal nextAddressSeed = keccak256(abi.encodePacked("address"));

  /// @notice          compute the future address where a contract will be deployed, based on the deployer nonce and address
  ///                  see https://ethereum.stackexchange.com/questions/24248/how-to-calculate-an-ethereum-contracts-address-during-its-creation-using-the-so
  /// @dev             this works for standard CREATE deployment
  /// @param  _origin  the deployer address
  /// @param  _nonce   the deployer nonce for which the corresponding address is computed (use vm.getNonce(msg.sender))
  /// @return _address the deployment address
  function addressFrom(address _origin, uint256 _nonce) internal pure returns (address _address) {
    bytes memory _data;
    if (_nonce == 0x00) _data = abi.encodePacked(bytes1(0xd6), bytes1(0x94), _origin, bytes1(0x80));
    else if (_nonce <= 0x7f) _data = abi.encodePacked(bytes1(0xd6), bytes1(0x94), _origin, uint8(_nonce));
    else if (_nonce <= 0xff) _data = abi.encodePacked(bytes1(0xd7), bytes1(0x94), _origin, bytes1(0x81), uint8(_nonce));
    else if (_nonce <= 0xffff)
      _data = abi.encodePacked(bytes1(0xd8), bytes1(0x94), _origin, bytes1(0x82), uint16(_nonce));
    else if (_nonce <= 0xffffff)
      _data = abi.encodePacked(bytes1(0xd9), bytes1(0x94), _origin, bytes1(0x83), uint24(_nonce));
    else _data = abi.encodePacked(bytes1(0xda), bytes1(0x94), _origin, bytes1(0x84), uint32(_nonce));

    bytes32 _hash = keccak256(_data);
    assembly {
      mstore(0, _hash)
      _address := mload(0)
    }
  }

  function newAddress() internal returns (address) {
    address payable nextAddress = payable(address(uint160(uint256(nextAddressSeed))));
    nextAddressSeed = keccak256(abi.encodePacked(nextAddressSeed));
    return nextAddress;
  }

  function label(address addy, string memory name) internal returns (address) {
      vm.label(addy, name);
      return addy;
  }
}
