import { PolyjuiceWallet, PolyjuiceJsonRpcProvider } from "@polyjuice-provider/ethers";
import { Contract, ContractFactory, Signer } from "ethers";
import { Deployment, DeploymentsExtension, DeploymentSubmission, DeployOptions } from "hardhat-deploy/types";

import { setupTestRouter } from "../src/tasks/nervos/setupTestRouter";
import * as ASSETS from "../typechain";

const TEST_ROUTERS = [
    "0x9ADA6aa06eF36977569Dc5b38237809c7DF5082a", // live testnet router
    "0x0EC26F03e3dBA9bb5162D28fD5a3378A25f168d1", // rahul test router
    "0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6", // ci/shared router
    "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", // local router
];

const nervosProviderConfig = {
    web3Url: "https://godwoken-testnet-web3-rpc.ckbapp.dev",
    chainId: 71393,
};

const chainId = nervosProviderConfig.chainId;

const rpc = new PolyjuiceJsonRpcProvider(nervosProviderConfig, nervosProviderConfig.web3Url);
const deployerWallet = new PolyjuiceWallet("0xd9066ff9f753a1898709b568119055660a77d9aae4d7a4ad677b8fb3d2a571e5", nervosProviderConfig, rpc) as Signer;

export type PartialDeploymentsExtension = {
    _deployments: Map<string, Deployment>;

    get: DeploymentsExtension["get"],
    save: DeploymentsExtension["save"],

    getContractAt: (name: string, address: string) => Promise<Contract>
}

const deployments: PartialDeploymentsExtension = {
    _deployments: new Map<string, Deployment>(),

    async get(name: string): Promise<Deployment> {
        const deployment = this._deployments.get(name);
        
        if (!deployment) {
            throw new Error(`Missing ${name} deployment.`);
        }

        return deployment;
    },

    async save(name: string, deployment: DeploymentSubmission) {
        this._deployments.set(name, {
            abi: deployment.abi,
            address: deployment.address,
        });
    },

    async getContractAt(name: string, address: string) {
        const staticFactory = (ASSETS as any)[`${name}__factory` as any];
        const contract = staticFactory.connect(address, deployerWallet);

        return contract;
    },
};

async function deploy(name: string, options: DeployOptions) {
    const args = options.args || [];
    const staticFactory = (ASSETS as any)[`${name}__factory` as any];
    const factory: ContractFactory = new staticFactory(deployerWallet);
    const tx = factory.getDeployTransaction(...args);
    const receipt = await (await deployerWallet.sendTransaction(tx)).wait();
    const contract = staticFactory.connect(receipt.contractAddress, deployerWallet);

    deployments.save(name, {
        abi: staticFactory.abi,
        address: receipt.contractAddress,
    });

    if (options.log) {
        console.log(`${name} deployed at: ${contract.address}`);
    }
    
    return contract;
}

async function runDemo() {
    const deployer = await deployerWallet.getAddress();

    console.log("deployer: ", deployer);

    await deploy("TransactionManager", {
        from: deployer,
        args: [chainId],
        log: true,
    });

    console.log("Deploying multicall to configured chain");
    await deploy("Multicall", {
        from: deployer,
        log: true,
    });

    console.log("Deploying test token on non-mainnet chain");
    await deploy("TestERC20", {
      from: deployer,
      log: true,
    });

    console.log("Setting up test routers on chain", chainId);

    for (const router of TEST_ROUTERS) {
        await setupTestRouter(router, {}, deployments);
        await new Promise(r => setTimeout(r, 20000));
    }
}

(async () => {
    await runDemo();
})();
