import { utils, Wallet } from "ethers";
import { task } from "hardhat/config";
import { LineaSDK } from "@consensys/linea-sdk";

import { Env, getMessagingProtocolConfig, mustGetEnv, ProtocolNetwork } from "../../src/utils";

import { getProviderUrlFromHardhatConfig } from "../../src";

type TaskArgs = {
  hash: string;
  networkType?: ProtocolNetwork;
  env?: Env;
};

export default task("claim-linea", "Claim messages on both of L1 and L2")
  .addParam("hash", "The transaction hash of the message sent. network should be origin side.")
  .addOptionalParam("env", "Environment of contracts")
  .addOptionalParam("networkType", "Type of network of contracts")
  .setAction(async ({ hash, networkType: _networkType, env: _env }: TaskArgs, hre) => {
    const deployer = Wallet.fromMnemonic(process.env.MAINNET_MNEMONIC ?? process.env.MNEMONIC!);

    const env = mustGetEnv(_env);
    const networkType = _networkType ?? ProtocolNetwork.TESTNET;
    console.log("networkType: ", networkType);
    console.log("env:", env);
    console.log("transaction hash", hash);
    console.log("deployer", deployer.address);

    // get config
    const protocolConfig = getMessagingProtocolConfig(networkType);
    const hub = protocolConfig.hub;
    const chainId = hre.network.config.chainId!;

    // Right now this only works on arbitrum, error if that is not the correct network
    if (chainId != hub && protocolConfig.configs[chainId].prefix != "Linea") {
      throw new Error(`Only linea / linea goerli supported`);
    }

    const spoke = hub == 1 ? 59144 : 59140;
    const sdk = new LineaSDK({
      l1RpcUrl: getProviderUrlFromHardhatConfig(hub), // L1 rpc url
      l2RpcUrl: getProviderUrlFromHardhatConfig(spoke), // L2 rpc url
      l1SignerPrivateKey: deployer.privateKey ?? "", // L1 account private key (optional if you use mode = read-only)
      l2SignerPrivateKey: deployer.privateKey ?? "", // L2 account private key (optional if you use mode = read-only)
      network: hub == 1 ? "linea-mainnet" : "linea-goerli", // network you want to interact with (either linea-mainnet or linea-goerli)
      mode: "read-write", // contract wrapper class mode (read-only or read-write), read-only: only read contracts state, read-write: read contracts state and claim messages
    });

    // get L1/L2 contract
    const originContract = chainId == hub ? sdk.getL1Contract() : sdk.getL2Contract();

    // get Message Status
    const messages = await originContract.getMessagesByTransactionHash(hash);

    if (!messages?.length) {
      throw new Error(`${hash} has no message sent`);
    }
    console.log("message: ", messages[0]);

    const destContract = chainId == hub ? sdk.getL2Contract() : sdk.getL1Contract();

    //  returns on-chain message status by message hash
    const messageStatus = await destContract.getMessageStatus(messages[0].messageHash);
    console.log("message status: ", messageStatus);

    if (messageStatus === "CLAIMED") {
      console.log("message already claimed!! skipping...");
    } else if (messageStatus === "CLAIMABLE") {
      console.log("Claimable message status. ");
      let claimMessage = await destContract.claim(
        {
          // claims message by message
          ...messages[0],
          feeRecipient: deployer.address, // address that will receive fees. by default it is the message sender
        },
        {
          gasPrice: utils.parseUnits("3", "gwei"),
        },
      );
      console.log(claimMessage);
    } else {
      console.log("unknown message status. skipping...");
    }
  });
