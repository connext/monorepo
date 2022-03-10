import { Interface } from "ethers/lib/utils";
import {
  TransactionManager as TTransactionManager,
  ConnextPriceOracle as TConnextPriceOracle,
  TokenRegistry as TTokenRegistry,
  StableSwap as TStableSwap,
  ERC20 as TERC20,
} from "@connext/nxtp-contracts/typechain-types";

import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import PriceOracleArtifact from "@connext/nxtp-contracts/artifacts/contracts/ConnextPriceOracle.sol/ConnextPriceOracle.json";
import StableSwapArtifact from "@connext/nxtp-contracts/artifacts/contracts/StableSwap.sol/StableSwap.json";
import TokenRegistryArtifact from "@connext/nxtp-contracts/artifacts/contracts/nomad-xapps/contracts/bridge/TokenRegistry.sol/TokenRegistry.json";

export const getTxManagerInterface = () =>
  new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];

export const getTokenRegistryInterface = () => new Interface(TokenRegistryArtifact.abi) as TTokenRegistry["interface"];

export const getPriceOracleInterface = () => new Interface(PriceOracleArtifact.abi) as TConnextPriceOracle["interface"];

export const getStableSwapInterface = () => new Interface(StableSwapArtifact.abi) as TStableSwap["interface"];
