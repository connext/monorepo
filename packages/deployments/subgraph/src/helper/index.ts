/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";

/// MARK - Helpers
// eslint-disable-next-line @typescript-eslint/ban-types
export function getChainId(): BigInt {
  // try to get chainId from the mapping
  let network = dataSource.network();
  // eslint-disable-next-line @typescript-eslint/ban-types
  let chainId: BigInt;
  if (network == "mainnet") {
    chainId = BigInt.fromI32(1);
  } else if (network == "ropsten") {
    chainId = BigInt.fromI32(3);
  } else if (network == "rinkeby") {
    chainId = BigInt.fromI32(4);
  } else if (network == "goerli") {
    chainId = BigInt.fromI32(5);
  } else if (network == "kovan") {
    chainId = BigInt.fromI32(42);
  } else if (network == "bsc") {
    chainId = BigInt.fromI32(56);
  } else if (network == "chapel") {
    chainId = BigInt.fromI32(97);
  } else if (network == "gnosis") {
    chainId = BigInt.fromI32(100);
  } else if (network == "matic") {
    chainId = BigInt.fromI32(137);
  } else if (network == "fantom") {
    chainId = BigInt.fromI32(250);
  } else if (network == "optimism-goerli") {
    chainId = BigInt.fromI32(420);
  } else if (network == "optimism") {
    chainId = BigInt.fromI32(10);
  } else if (network == "mbase") {
    chainId = BigInt.fromI32(1287);
  } else if (network == "arbitrum-one") {
    chainId = BigInt.fromI32(42161);
  } else if (network == "fuji") {
    chainId = BigInt.fromI32(43113);
  } else if (network == "avalanche") {
    chainId = BigInt.fromI32(43114);
  } else if (network == "mumbai") {
    chainId = BigInt.fromI32(80001);
  } else if (network == "arbitrum-rinkeby") {
    chainId = BigInt.fromI32(421611);
  } else if (network == "arbitrum-goerli") {
    chainId = BigInt.fromI32(421613);
  } else if (network == "zksync2-testnet") {
    chainId = BigInt.fromI32(280);
  } else if (network == "linea-goerli") {
    chainId = BigInt.fromI32(59140);
  } else if (network == "linea-mainnet") {
    chainId = BigInt.fromI32(59144);
  } else if (network == "polygon-zkevm-testnet") {
    chainId = BigInt.fromI32(1442);
  } else if (network == "polygon-zkevm") {
    chainId = BigInt.fromI32(1101);
  } else if (network == "base-testnet") {
    chainId = BigInt.fromI32(84531);
  } else if (network == "base") {
    chainId = BigInt.fromI32(8453);
  } else if (network == "zksync-era") {
    chainId = BigInt.fromI32(324);
  } else if (network == "xgon") {
    chainId = BigInt.fromI32(195);
  } else if (network == "mode-mainnet") {
    chainId = BigInt.fromI32(34443);
  } else if (network == "scroll") {
    chainId = BigInt.fromI32(534352);
  } else {
    throw new Error(`No chainName for network ${network}`);
  }

  return chainId;
}
