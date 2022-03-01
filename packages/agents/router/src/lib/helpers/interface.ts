import { Interface } from "ethers/lib/utils";
import {
  TransactionManager as TTransactionManager,
  ConnextPriceOracle as TConnextPriceOracle,
  ERC20 as TERC20,
} from "@connext/nxtp-contracts/typechain-types";

import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import PriceOracleArtifact from "@connext/nxtp-contracts/artifacts/contracts/ConnextPriceOracle.sol/ConnextPriceOracle.json";

export const getTxManagerInerface = () =>
  new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];

export const getPriceOracleInterface = () => new Interface(PriceOracleArtifact.abi) as TConnextPriceOracle["interface"];
