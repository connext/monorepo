// Wrapper StableMath
pragma solidity ^0.8.4;

import "./pools/stable/StableMath.sol";

contract StableSwap is StableMath {
    address immutable owner;
    uint256 public amplificationParameter;

    constructor(uint256 _amplificationParameter) {
        owner = msg.sender;
        _require(_amplificationParameter >= _MIN_AMP, Errors.MIN_AMP);
        _require(_amplificationParameter <= _MAX_AMP, Errors.MAX_AMP);

        amplificationParameter = _amplificationParameter;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function updateAmplificationParameter(uint256 _amplificationParameter)
        public
        onlyOwner
    {
        amplificationParameter = _amplificationParameter;
    }

    function getAmplificationParameter() external view returns (uint256) {
        return amplificationParameter;
    }

    // Swap

    function onSwapGivenIn(
        uint256 amount,
        uint256[] memory balances,
        uint256 indexIn,
        uint256 indexOut
    ) external view virtual returns (uint256) {
        uint256 amountOut =
            StableMath._calcOutGivenIn(
                amplificationParameter,
                balances,
                indexIn,
                indexOut,
                amount
            );

        return amountOut;
    }

    function onSwapGivenOut(
        uint256 amount,
        uint256[] memory balances,
        uint256 indexIn,
        uint256 indexOut
    ) external view virtual returns (uint256) {
        uint256 amountIn =
            StableMath._calcInGivenOut(
                amplificationParameter,
                balances,
                indexIn,
                indexOut,
                amount
            );

        return amountIn;
    }
}
