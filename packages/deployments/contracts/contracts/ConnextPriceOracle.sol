// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./PriceOracle.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/IERC20Extended.sol";
import "./interfaces/IPriceOracle.sol";

interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  // getRoundData and latestRoundData should both raise "No data present"
  // if they do not have data to report, instead of returning unset values
  // which could be misinterpreted as actual reported values.
  function getRoundData(uint80 _roundId)
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );

  function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );
}

contract ConnextPriceOracle is PriceOracle {
  using SafeMath for uint256;
  using SafeERC20 for IERC20Extended;

  address public admin;
  address public wrapped;
  address public v1PriceOracle;

  /// @notice Chainlink Aggregators
  mapping(address => AggregatorV3Interface) public aggregators;

  struct PriceInfo {
    address token; // Address of token contract, TOKEN
    address baseToken; // Address of base token contract, BASETOKEN
    address lpToken; // Address of TOKEN-BASETOKEN pair contract
    bool active; // Active status of price record 0
  }

  mapping(address => PriceInfo) public priceRecords;
  mapping(address => uint256) public assetPrices;

  event NewAdmin(address oldAdmin, address newAdmin);
  event PriceRecordUpdated(address token, address baseToken, address lpToken, bool _active);
  event DirectPriceUpdated(address token, uint256 oldPrice, uint256 newPrice);
  event AggregatorUpdated(address tokenAddress, address source);
  event V1PriceOracleUpdated(address oldAddress, address newAddress);

  modifier onlyAdmin() {
    require(msg.sender == admin, "caller is not the admin");
    _;
  }

  constructor(address _wrapped) {
    wrapped = _wrapped;
    admin = msg.sender;
  }

  function getTokenPrice(address _tokenAddress) public view override returns (uint256) {
    address tokenAddress = _tokenAddress;
    if (_tokenAddress == address(0)) {
      tokenAddress = wrapped;
    }
    uint256 tokenPrice = assetPrices[tokenAddress];
    if (tokenPrice == 0) {
      tokenPrice = getPriceFromOracle(tokenAddress);
    }
    if (tokenPrice == 0) {
      tokenPrice = getPriceFromDex(tokenAddress);
    }
    if (tokenPrice == 0 && v1PriceOracle != address(0)) {
      tokenPrice = IPriceOracle(v1PriceOracle).getTokenPrice(tokenAddress);
    }
    return tokenPrice;
  }

  function getPriceFromDex(address _tokenAddress) public view returns (uint256) {
    PriceInfo storage priceInfo = priceRecords[_tokenAddress];
    if (priceInfo.active) {
      uint256 rawTokenAmount = IERC20Extended(priceInfo.token).balanceOf(priceInfo.lpToken);
      uint256 tokenDecimalDelta = 18 - uint256(IERC20Extended(priceInfo.token).decimals());
      uint256 tokenAmount = rawTokenAmount.mul(10**tokenDecimalDelta);
      uint256 rawBaseTokenAmount = IERC20Extended(priceInfo.baseToken).balanceOf(priceInfo.lpToken);
      uint256 baseTokenDecimalDelta = 18 - uint256(IERC20Extended(priceInfo.baseToken).decimals());
      uint256 baseTokenAmount = rawBaseTokenAmount.mul(10**baseTokenDecimalDelta);
      uint256 baseTokenPrice = getTokenPrice(priceInfo.baseToken);
      uint256 tokenPrice = baseTokenPrice.mul(baseTokenAmount).div(tokenAmount);

      return tokenPrice;
    } else {
      return 0;
    }
  }

  function getPriceFromOracle(address _tokenAddress) public view returns (uint256) {
    uint256 chainLinkPrice = getPriceFromChainlink(_tokenAddress);
    return chainLinkPrice;
  }

  function getPriceFromChainlink(address _tokenAddress) public view returns (uint256) {
    AggregatorV3Interface aggregator = aggregators[_tokenAddress];
    if (address(aggregator) != address(0)) {
      (, int256 answer, , , ) = aggregator.latestRoundData();

      // It's fine for price to be 0. We have two price feeds.
      if (answer == 0) {
        return 0;
      }

      // Extend the decimals to 1e18.
      uint256 retVal = uint256(answer);
      uint256 price = retVal.mul(10**(18 - uint256(aggregator.decimals())));

      return price;
    }
  }

  function setDexPriceInfo(
    address _token,
    address _baseToken,
    address _lpToken,
    bool _active
  ) external onlyAdmin {
    PriceInfo storage priceInfo = priceRecords[_token];
    uint256 baseTokenPrice = getTokenPrice(_baseToken);
    require(baseTokenPrice > 0, "invalid base token");
    priceInfo.token = _token;
    priceInfo.baseToken = _baseToken;
    priceInfo.lpToken = _lpToken;
    priceInfo.active = _active;
    emit PriceRecordUpdated(_token, _baseToken, _lpToken, _active);
  }

  function setDirectPrice(address _token, uint256 _price) external onlyAdmin {
    emit DirectPriceUpdated(_token, assetPrices[_token], _price);
    assetPrices[_token] = _price;
  }

  function setV1PriceOracle(address _v1PriceOracle) external onlyAdmin {
    emit V1PriceOracleUpdated(v1PriceOracle, _v1PriceOracle);
    v1PriceOracle = _v1PriceOracle;
  }

  function setAdmin(address newAdmin) external onlyAdmin {
    address oldAdmin = admin;
    admin = newAdmin;

    emit NewAdmin(oldAdmin, newAdmin);
  }

  function setAggregators(address[] calldata tokenAddresses, address[] calldata sources) external onlyAdmin {
    for (uint256 i = 0; i < tokenAddresses.length; i++) {
      aggregators[tokenAddresses[i]] = AggregatorV3Interface(sources[i]);
      emit AggregatorUpdated(tokenAddresses[i], sources[i]);
    }
  }
}
