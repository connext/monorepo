// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.6.11;

// import "@summa-tx/memview-sol/contracts/TypedMemView.sol";
import "./TypedMemView.sol";

library TypeCasts {
  using TypedMemView for bytes;
  using TypedMemView for bytes29;

  function coerceBytes32(string memory _s) internal pure returns (bytes32 _b) {
    _b = bytes(_s).ref(0).index(0, uint8(bytes(_s).length));
  }

  // treat it as a null-terminated string of max 32 bytes
  function coerceString(bytes32 _buf) internal pure returns (string memory _newStr) {
    uint8 _slen = 0;
    while (_slen < 32 && _buf[_slen] != 0) {
      _slen++;
    }

    // solhint-disable-next-line no-inline-assembly
    assembly {
      _newStr := mload(0x40)
      mstore(0x40, add(_newStr, 0x40)) // may end up with extra
      mstore(_newStr, _slen)
      mstore(add(_newStr, 0x20), _buf)
    }
  }

  // alignment preserving cast
  function addressToBytes32(address _addr) internal pure returns (bytes32) {
    return bytes32(uint256(uint160(_addr)));
  }

  // alignment preserving cast
  function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
    return address(uint160(uint256(_buf)));
  }
}
