import { Contract, Wallet } from "ethers";
import { task } from "hardhat/config";
import { axiosGet } from "@connext/nxtp-utils";

import {
  Env,
  getMessagingProtocolConfig,
  getProviderFromHardhatConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../../src/utils";
import { getContract } from "../../src/cli/helpers";
import { IPolygonZkEVMBridge__factory } from "../../src";

type TaskArgs = {
  spoke: string;
  networkType?: ProtocolNetwork;
  env?: Env;
};

export const getDeposits = async (apiUrl: string, address: string, limit = 100, offset = 0) => {
  try {
    const res = await axiosGet(`${apiUrl}/bridges/${address}?limit=${limit}&offset=${offset}`);
    return {
      deposits: res.data.deposits !== undefined ? res.data.deposits : [],
      total: res.data.total_cnt !== undefined ? res.data.total_cnt : 0,
    };
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

export const getMerkleProof = async (apiUrl: string, depositCount: string, networkId: number) => {
  try {
    const res = await axiosGet(`${apiUrl}/merkle-proof?deposit_cnt=${depositCount}&net_id=${networkId}`);
    return res.data.proof;
  } catch (e: any) {
    console.log(e);
    return null;
  }
};

const claimFromPolygonZk = async (
  l1Connector: Contract,
  l2Connector: Contract,
  l1BridgeContract: Contract,
  l2BridgeContract: Contract,
  apiUrl: string,
) => {
  // // Get all deposits
  const spokeDeposits = await getDeposits(apiUrl, l2Connector.address);
  const hubDeposits = await getDeposits(apiUrl, l1Connector.address);
  const claimableDeposits = (spokeDeposits?.deposits || [])
    .concat(hubDeposits?.deposits || [])
    .filter((d: any) => d.ready_for_claim && d.claim_tx_hash === "");

  for (const deposit of claimableDeposits) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const proof = await getMerkleProof(apiUrl, deposit.deposit_cnt, deposit.network_id);
    if (!proof) {
      continue;
    }

    console.log("Claiming message", deposit.orig_net, deposit.dest_net, deposit.tx_hash, deposit.metadata);

    const tx = await (deposit.dest_net == 1 ? l2BridgeContract : l1BridgeContract).claimMessage(
      proof.merkle_proof,
      proof.rollup_merkle_proof,
      deposit.global_index,
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
    const deployer = Wallet.fromMnemonic(process.env.MNEMONIC ?? process.env.MAINNET_MNEMONIC!);

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
    if (spoke !== 1442 && spoke !== 1101) {
      throw new Error(`Only polygonzk-evm supported, requesting claim for spoke ${spoke}`);
    }

    const apiUrl = spoke === 1101 ? "https://bridge-api.zkevm-rpc.com" : "https://bridge-api.public.zkevm-test.net";
    // get the l2 provider
    const l2Connector = getContract("PolygonZkSpokeConnector", String(spoke), env == "staging", deployer).contract;
    // get the l1 provider
    const l1Connector = getContract(
      "PolygonZkHubConnector",
      String(protocolConfig.hub.chain),
      env == "staging",
      deployer,
    ).contract;

    const l2BridgeContract = IPolygonZkEVMBridge__factory.connect(
      protocolConfig.configs[spoke].ambs.spoke,
      deployer.connect(getProviderFromHardhatConfig(spoke)),
    );
    const l1BridgeContract = IPolygonZkEVMBridge__factory.connect(
      protocolConfig.configs[spoke].ambs.hub,
      deployer.connect(getProviderFromHardhatConfig(protocolConfig.hub.chain)),
    );

    await claimFromPolygonZk(l1Connector, l2Connector, l1BridgeContract, l2BridgeContract, apiUrl);
  });
