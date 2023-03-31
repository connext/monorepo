import { L1ToL2MessageStatus, L1TransactionReceipt } from "@arbitrum/sdk";
import { Contract, providers, Wallet } from "ethers";
import { task } from "hardhat/config";

import {
  Env,
  getMessagingProtocolConfig,
  getProviderFromHardhatConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../../src/utils";
import { getSpokeConnector } from "../../src/cli/helpers";
import { getContract } from "../../src/cli/helpers";
import { IPolygonZkEVMBridge__factory } from "../../src";

type TaskArgs = {
  spoke: string;
  networkType?: ProtocolNetwork;
  env?: Env;
};

const apiUrl = "https://bridge-api.public.zkevm-test.net";

export const getDeposits = (
  address: string,
  limit = 100,
  offset = 0,
): Promise<{
  deposits: any[];
  total: number;
}> => {
  return fetch(`${apiUrl}/bridges/${address}?limit=${limit}&offset=${offset}`)
    .then((response) => response.json()) // one extra step
    .then((data) => {
      return {
        deposits: data.deposits !== undefined ? data.deposits : [],
        total: data.total_cnt !== undefined ? data.total_cnt : 0,
      };
    })
    .catch((error) => console.error(error));
};

export interface MerkleProof {
  mainExitRoot: string;
  merkleProof: string[];
  rollupExitRoot: string;
}

export const getMerkleProof = (depositCount: string, networkId: number): Promise<MerkleProof> => {
  return fetch(`${apiUrl}/merkle-proof?deposit_cnt=${depositCount}&net_id=${networkId}`)
    .then((response) => response.json()) // one extra step
    .then((data) => {
      return data.proof;
    })
    .catch((error) => console.error(error));
};

const claimFromPolygonZk = async (
  l1Connector: Contract,
  l2Connector: Contract,
  l1BridgeContract: Contract,
  l2BridgeContract: Contract,
) => {
  // // Get all deposits to Spoke Connector
  const spokeDeposits = await getDeposits(l2Connector.address);
  const claimableSpokeDeposits = spokeDeposits.deposits.filter((d) => d.ready_for_claim && d.claim_tx_hash === "");
  for (const deposit of claimableSpokeDeposits) {
    const proof = await getMerkleProof(deposit.deposit_cnt, deposit.network_id);
    console.log(deposit, proof);

    console.log("Claiming L1 -> L2 message", deposit.tx_hash, deposit.metadata);

    const tx = await l2BridgeContract.claimMessage(
      proof.merkle_proof,
      deposit.deposit_cnt,
      proof.main_exit_root,
      proof.rollup_exit_root,
      deposit.orig_net,
      deposit.orig_addr,
      deposit.dest_net,
      deposit.dest_addr,
      deposit.amount,
      deposit.metadata,
    );
    console.log(tx);
    const receipt = await tx.wait();
    console.log("tx mined", receipt);
  }

  // // Get all deposits to Spoke Connector
  const hubDeposits = await getDeposits(l1Connector.address);
  const claimableHubDeposits = hubDeposits.deposits.filter((d) => d.ready_for_claim && d.claim_tx_hash === "");
  for (const deposit of claimableHubDeposits) {
    const proof = await getMerkleProof(deposit.deposit_cnt, deposit.network_id);
    console.log(deposit, proof);

    console.log("Claiming L2 -> L1 message", deposit.tx_hash, deposit.metadata);

    const tx = await l1BridgeContract.claimMessage(
      proof.merkle_proof,
      deposit.deposit_cnt,
      proof.main_exit_root,
      proof.rollup_exit_root,
      deposit.orig_net,
      deposit.orig_addr,
      deposit.dest_net,
      deposit.dest_addr,
      deposit.amount,
      deposit.metadata,
    );
    console.log(tx);
    const receipt = await tx.wait();
    console.log("tx mined", receipt);
  }
};

export default task("claim-polygonzk", "Claim messages on both of L1 and L2")
  .addParam("spoke", "The chainId for the spoke")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ spoke: _spoke, networkType: _networkType, env: _env }: TaskArgs) => {
    const deployer = Wallet.fromMnemonic(process.env.MNEMONIC!);

    const env = mustGetEnv(_env);
    const spoke = +_spoke;
    const networkType = _networkType ?? ProtocolNetwork.TESTNET;
    console.log("networkType: ", networkType);
    console.log("env:", env);
    console.log("spoke", spoke);
    console.log("deployer", deployer.address);

    // get config
    const protocolConfig = getMessagingProtocolConfig(networkType);

    // Right now this only works on arbitrum, error if that is not the correct network
    if (spoke !== 1442) {
      throw new Error(`Only polygonzk-evm supported, requesting claim for spoke ${spoke}`);
    }
    // get the l2 provider
    const l2Connector = getContract("PolygonZkSpokeConnector", String(spoke), env == "staging", deployer).contract;
    // get the l1 provider
    const l1Connector = getContract(
      "PolygonZkHubConnector",
      String(protocolConfig.hub),
      env == "staging",
      deployer,
    ).contract;

    const l2BridgeContract = IPolygonZkEVMBridge__factory.connect(
      protocolConfig.configs[spoke].ambs.spoke,
      deployer.connect(getProviderFromHardhatConfig(spoke)),
    );
    const l1BridgeContract = IPolygonZkEVMBridge__factory.connect(
      protocolConfig.configs[spoke].ambs.hub,
      deployer.connect(getProviderFromHardhatConfig(protocolConfig.hub)),
    );

    await claimFromPolygonZk(l1Connector, l2Connector, l1BridgeContract, l2BridgeContract);
  });
