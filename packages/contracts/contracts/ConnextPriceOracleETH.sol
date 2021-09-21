// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./PriceOracle.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./interfaces/IERC20Extended.sol";

interface IStdReference {
    /// A structure returned whenever someone requests for standard reference data.
    struct ReferenceData {
        uint256 rate; // base/quote exchange rate, multiplied by 1e18.
        uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
        uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
    }

    /// Returns the price data for the given base/quote pair. Revert if not available.
    function getReferenceData(string memory _base, string memory _quote) external view returns (ReferenceData memory);

    /// Similar to getReferenceData, but with multiple base/quote pairs at once.
    function getReferenceDataBulk(string[] memory _bases, string[] memory _quotes) external view returns (ReferenceData[] memory);
}

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);
    function description() external view returns (string memory);
    function version() external view returns (uint256);

    // getRoundData and latestRoundData should both raise "No data present"
    // if they do not have data to report, instead of returning unset values
    // which could be misinterpreted as actual reported values.
    function getRoundData(uint80 _roundId) external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );

    function latestRoundData() external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
}

contract ConnextPriceOracleETH is PriceOracle {
    using SafeMath for uint256;
    using SafeERC20 for IERC20Extended;
    address public admin;

    IStdReference ref;

    uint256 public maxPriceDiff = 0.1e18;

    address public wrapped = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    /// @notice Chainlink Aggregators
    mapping(address => AggregatorV3Interface) public aggregators;    

    struct PriceInfo {
        address token;              // Address of token contract, TOKEN
        address baseToken;          // Address of base token contract, BASETOKEN
        address lpToken;            // Address of TOKEN-BASETOKEN pair contract
        bool active;                // Active status of price record 0 
    }

    mapping(address => PriceInfo) public priceRecords;
    
    event NewAdmin(address oldAdmin, address newAdmin);
    event PriceRecordUpdated(address token, address baseToken, address lpToken, bool _active);
    event AggregatorUpdated(address tokenAddress, address source);
    event MaxPriceDiffUpdated(uint maxDiff);

    constructor(IStdReference _ref) {
        ref = _ref;
        admin = msg.sender;
    }

    function getTokenPrice(address _tokenAddress) public view override returns (uint256) {
        address tokenAddress = _tokenAddress;
        if (_tokenAddress == address(0)) {
            tokenAddress = wrapped;
        }
        uint256 tokenPrice = getPriceFromOracle(tokenAddress);
        if (tokenPrice == 0) {
            tokenPrice = getPriceFromDex(tokenAddress);
        } 
        return tokenPrice;
    }

    function getPriceFromDex(address _tokenAddress) public view returns (uint256) {
        PriceInfo storage priceInfo = priceRecords[_tokenAddress];
        if (priceInfo.active) {
            uint256 rawTokenAmount = IERC20Extended(priceInfo.token).balanceOf(priceInfo.lpToken);
            uint256 tokenDecimalDelta = 18-uint256(IERC20Extended(priceInfo.token).decimals());
            uint256 tokenAmount = rawTokenAmount.mul(10**tokenDecimalDelta);
            uint256 rawBaseTokenAmount = IERC20Extended(priceInfo.baseToken).balanceOf(priceInfo.lpToken);
            uint256 baseTokenDecimalDelta = 18-uint256(IERC20Extended(priceInfo.baseToken).decimals());
            uint256 baseTokenAmount = rawBaseTokenAmount.mul(10**baseTokenDecimalDelta);
            uint256 baseTokenPrice = getPriceFromOracle(priceInfo.baseToken);
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
            ( , int answer, , , ) = aggregator.latestRoundData();

            // It's fine for price to be 0. We have two price feeds.
            if (answer == 0) {
                return 0;
            }

            // Extend the decimals to 1e18.
            uint retVal = uint(answer);
            uint price = retVal.mul(10**(18 - uint(aggregator.decimals())));

            return price;            
        }
        return 0;        
    }

    function getPriceFromBand(address _tokenAddress) public view returns (uint256) {
        IERC20Extended token = IERC20Extended(_tokenAddress);
        string memory tokenSymbol = token.symbol();
        if (compareStrings(tokenSymbol, "WETH")) {
            IStdReference.ReferenceData memory data = ref.getReferenceData("ETH", "USD");
            return data.rate;
        } 
        try ref.getReferenceData(token.symbol(), "USD") returns (IStdReference.ReferenceData memory data){
            uint256 price = data.rate;
            uint256 decimalDelta = 18-uint256(token.decimals());
            return price.mul(10**decimalDelta);            
        } catch {
            return 0;
        }        
    }

    function checkPriceDiff(uint256 price1, uint256 price2) internal view {
        uint256 min = price1 < price2 ? price1 : price2;
        uint256 max = price1 < price2 ? price2 : price1;

        // priceCap = min * (1 + maxPriceDiff)
        uint256 onePlusMaxDiffMantissa = maxPriceDiff.add(1);
        uint256 priceCap = min.mul(onePlusMaxDiffMantissa);
        require(priceCap > max, "too much diff between price feeds");
    }    

    function setDexPriceInfo(address _token, address _baseToken, address _lpToken, bool _active) public {
        require(msg.sender == admin, "only admin can set DEX price");
        PriceInfo storage priceInfo = priceRecords[_token];
        uint256 baseTokenPrice = getPriceFromOracle(_baseToken);
        require(baseTokenPrice > 0, "invalid base token");
        priceInfo.token = _token;
        priceInfo.baseToken = _baseToken;
        priceInfo.lpToken = _lpToken;
        priceInfo.active = _active;
        emit PriceRecordUpdated(_token, _baseToken, _lpToken, _active);
    }

    function setAdmin(address newAdmin) external {
        require(msg.sender == admin, "only admin can set new admin");
        address oldAdmin = admin;
        admin = newAdmin;

        emit NewAdmin(oldAdmin, newAdmin);
    }

    function setAggregators(address[] calldata tokenAddresses, address[] calldata sources) external {
        require(msg.sender == admin, "only the admin may set the aggregators");
        for (uint i = 0; i < tokenAddresses.length; i++) {
            aggregators[tokenAddresses[i]] = AggregatorV3Interface(sources[i]);
            emit AggregatorUpdated(tokenAddresses[i], sources[i]);
        }
    } 

    function setMaxPriceDiff(uint256 _maxPriceDiff) external {
        require(msg.sender == admin, "only the admin may set the max price diff");
        maxPriceDiff = _maxPriceDiff;
        emit MaxPriceDiffUpdated(_maxPriceDiff);
    }      

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }    


}