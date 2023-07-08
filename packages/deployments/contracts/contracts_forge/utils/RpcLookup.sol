// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

library RpcLookup {
  function getRpcEnvName(uint256 _chainId) public pure returns (string memory) {
    // Mainnets
    if (_chainId == 1) {
      return "MAINNET_ETH_PROVIDER_URL";
    }

    if (_chainId == 10) {
      return "OPTIMISM_MAINNET_PROVIDER_URL";
    }

    if (_chainId == 56) {
      return "BNB_PROVIDER_URL";
    }

    if (_chainId == 100) {
      return "XDAI_PROVIDER_URL";
    }

    if (_chainId == 137) {
      return "MATIC_PROVIDER_URL";
    }

    if (_chainId == 42161) {
      return "ARB1_PROVIDER_URL";
    }

    // Testnets
    if (_chainId == 5) {
      return "GOERLI_ETH_PROVIDER_URL";
    }

    if (_chainId == 420) {
      return "OPTI_GOERLI_ETH_PROVIDER_URL";
    }

    if (_chainId == 80001) {
      return "POLYGON_MUMBAI_PROVIDER_URL";
    }

    if (_chainId == 421613) {
      return "ARBITRUM_GOERLI_ETH_PROVIDER_URL";
    }

    require(false, "!rpc env var for chain");
  }

  /**
   * @notice Returns the network name used when storing deployments
   * @param _chainId The chain id to lookup
   */
  function getNetworkName(uint256 _chainId) public pure returns (string memory) {
    // Mainnets
    if (_chainId == 1) {
      return "mainnet";
    }

    if (_chainId == 10) {
      return "optimism";
    }

    if (_chainId == 56) {
      return "bnb";
    }

    if (_chainId == 100) {
      return "xdai";
    }

    if (_chainId == 137) {
      return "matic";
    }

    if (_chainId == 42161) {
      return "arbitrum-one";
    }

    // Testnets
    if (_chainId == 5) {
      return "goerli";
    }

    if (_chainId == 420) {
      return "optimism-goerli";
    }

    if (_chainId == 80001) {
      return "mumbai";
    }

    if (_chainId == 421613) {
      return "arbitrum-goerli";
    }

    require(false, "!network name for chain");
  }
}
