import { config } from "dotenv";
import { Wallet, providers, Contract, BigNumber, constants } from "ethers";
import { prepareSwapAndXCall } from "../src";
config();

const WETH_ABI = [
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const testPrepareSwapAndXCall = async () => {
  const rpcURL = "https://polygon.llamarpc.com";
  const signer = new Wallet(process.env.PRIVATE_KEY ?? "", new providers.JsonRpcProvider(rpcURL));
  const signerAddress = signer.address;

  const POLYGON_WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
  const POLYGON_USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
  const SWAP_AND_XCALL_ADDRESS = "0x697075f4A3Ce358d125281134e98d594D8Bb472e";
  const amountIn = BigNumber.from("1000000000000000");

  const fromAsset = POLYGON_WETH;
  const swapAndXCallParams = {
    originDomain: "1886350457",
    destinationDomain: "6450786",
    fromAsset, // WETH
    toAsset: POLYGON_USDC, // USDC
    amountIn: amountIn.toString(),
    to: signerAddress,
    relayerFeeInTransactingAsset: "100000", // 0.1 USDC
  };

  const wethContract = new Contract(POLYGON_WETH, WETH_ABI, signer);
  const gasPrice = "500000000000";
  const allowance = await wethContract.allowance(signerAddress, SWAP_AND_XCALL_ADDRESS);
  if (amountIn.gt(allowance)) {
    console.log(`Approving... amountIn: ${amountIn.toString()}, allowance: ${allowance.toString()}`);
    const tx = await wethContract.approve(SWAP_AND_XCALL_ADDRESS, amountIn, { gasPrice });
    console.log(`Approve tx mined... tx: ${tx.hash}`);
    await tx.wait();
  }

  const txRequest = await prepareSwapAndXCall(swapAndXCallParams, signerAddress);
  if (txRequest) {
    const tx = await signer.sendTransaction({ ...txRequest, gasPrice });
    console.log(`SwapAndXCall tx mined. tx: ${tx.hash}`);
    await tx.wait();
  }
};

const testPrepareSwapAndXCallInNative = async () => {
  const rpcURL = "https://polygon.llamarpc.com";
  const signer = new Wallet(process.env.PRIVATE_KEY ?? "", new providers.JsonRpcProvider(rpcURL));
  const signerAddress = signer.address;

  const NATIVE = constants.AddressZero;
  const POLYGON_USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
  const SWAP_AND_XCALL_ADDRESS = "0x697075f4A3Ce358d125281134e98d594D8Bb472e";
  const amountIn = BigNumber.from("100000000000000000");

  const fromAsset = NATIVE;
  const swapAndXCallParams = {
    originDomain: "1886350457",
    destinationDomain: "6450786",
    fromAsset, // MATIC
    toAsset: POLYGON_USDC, // USDC
    amountIn: amountIn.toString(),
    to: signerAddress,
    // relayerFeeInNativeAsset: "1000000000000000000", // 1 MATIC
    relayerFeeInTransactingAsset: "100000", // 0.1 USDC
  };

  const gasPrice = "500000000000";

  const txRequest = await prepareSwapAndXCall(swapAndXCallParams, signerAddress);
  if (txRequest) {
    const tx = await signer.sendTransaction({ ...txRequest, gasPrice });
    console.log(`SwapAndXCall tx mined. tx: ${tx.hash}`);
    await tx.wait();
  }
};
testPrepareSwapAndXCallInNative();
