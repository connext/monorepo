import { ParentToChildMessageStatus, ParentTransactionReceipt } from "@arbitrum/sdk";
import { providers, Wallet } from "ethers";
import { task } from "hardhat/config";

import {
  Env,
  getMessagingProtocolConfig,
  getProviderFromHardhatConfig,
  mustGetEnv,
  ProtocolNetwork,
} from "../../src/utils";

type TaskArgs = {
  tx: string;
  spoke: string;
  force?: string; // bool string
  networkType?: ProtocolNetwork;
  env?: Env;
};

const redeemFromArbitrum = async (
  hash: string,
  signer: Wallet,
  force: boolean,
  hubProvider: providers.JsonRpcProvider,
  spokeProvider: providers.JsonRpcProvider,
) => {
  // Get the message receipt from arbitrum sdk
  const receipt = new ParentTransactionReceipt(await hubProvider.getTransactionReceipt(hash));
  console.log("got l1 -> l2 message receipt on l1", receipt.transactionHash);

  // get the mesesage (assume only one arb message in receipt)
  const [message] = await receipt.getParentToChildMessages(signer.connect(spokeProvider));
  const { status } = await message.waitForStatus();
  console.log("got l1 -> l2 message", message);

  // check to see if it needs redemption
  if (status != ParentToChildMessageStatus.FUNDS_DEPOSITED_ON_CHILD) {
    throw new Error(`Not ready to redeem, or was auto-redeemed. Status: ${status}`);
  }

  // check to see if an auto-redeem was attempted
  const autoRedeem = await message.getAutoRedeemAttempt();
  console.log("auto-redeem attempt", autoRedeem);

  // redeep message
  console.log("redeeming message...");
  const response = await message.redeem(!force ? {} : { gasLimit: 1_000_000 });
  console.log("redeem tx", response.hash);
  const redeemReceipt = await response.waitForRedeem();
  console.log("redeem tx mined", redeemReceipt);
};

export default task("redeem", "Process a transaction on a spoke for L1 -> L2 messages")
  .addParam("tx", "The hash of the L1 tx that sent the L1 -> L2 message")
  .addParam("spoke", "The chainId for the spoke")
  .addOptionalParam("force", "Whether the redeem tx should be forced (bypass estimate gas)")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ tx, force: _force, spoke: _spoke, networkType: _networkType, env: _env }: TaskArgs) => {
    const deployer = Wallet.fromMnemonic(process.env.MNEMONIC!);

    const env = mustGetEnv(_env);
    const spoke = +_spoke;
    const networkType = _networkType ?? ProtocolNetwork.TESTNET;
    const force = _force === "true";
    console.log("networkType: ", networkType);
    console.log("env:", env);
    console.log("tx", tx);
    console.log("force", force);
    console.log("spoke", spoke);
    console.log("deployer", deployer.address);

    // get config
    const protocolConfig = getMessagingProtocolConfig(networkType);

    // Right now this only works on arbitrum, error if that is not the correct network
    if (spoke !== 421613) {
      throw new Error(`Only arbitrum-goerli supported, requesting redeem for spoke ${spoke}`);
    }
    // get the l2 provider
    const l2Provider = getProviderFromHardhatConfig(spoke);
    // get the l1 provider
    const l1Provider = getProviderFromHardhatConfig(protocolConfig.hub.chain);

    await redeemFromArbitrum(tx, deployer, force, l1Provider, l2Provider);
  });
