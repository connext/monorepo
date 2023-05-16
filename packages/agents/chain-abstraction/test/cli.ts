import { config } from "dotenv";
import { Wallet, providers, Contract, BigNumber, constants } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils";
import {
  getBridgeAmountOut,
  getPoolFeeForUniV3,
  getSwapAmountOut,
  getXCallCallData,
  prepareSwapAndXCall,
} from "../src";
import { DestinationCallDataParams, Swapper } from "../src/types";
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

const testMidasProtocolTarget = async () => {
  const rpcURL = "https://bsc-dataseed.binance.org";
  const signer = new Wallet(process.env.PRIVATE_KEY ?? "", new providers.JsonRpcProvider(rpcURL));
  const signerAddress = signer.address;

  // ORIGIN SIDE
  const BNB_NATIVE = constants.AddressZero;
  const BNB_USDC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
  const amountIn = BigNumber.from("5000000000000000");
  const fromAsset = BNB_NATIVE;
  const toAsset = BNB_USDC;

  // DESTINATION SIDE
  const POLYGON_WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
  const POLYGON_USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
  const POLYGON_CTOKEN_WETH = "0xD809c769A04246855fee98423B180C7CCa6bF07c"; // https://app.midascapital.xyz/137/pool/5
  const midasProtocolTarget = "0xDF97CadbcCeE9cfdB12A3e9BB7663E6753A71a0C";

  // Params for calldata generation
  const POLYGON_DOMAIN_ID = "1886350457";
  const POLYGON_RPC_URL = "https://polygon.llamarpc.com";
  const swapper = Swapper.UniV3;
  const poolFee = await getPoolFeeForUniV3(POLYGON_DOMAIN_ID, POLYGON_RPC_URL, POLYGON_WETH, POLYGON_USDC);

  const params: DestinationCallDataParams = {
    fallback: signerAddress,
    swapForwarderData: {
      toAsset: POLYGON_WETH,
      swapData: {
        amountOutMin: "0",
        poolFee: poolFee,
      },
    },
  };

  const forwardCallData = defaultAbiCoder.encode(
    ["address", "address", "address"],
    [POLYGON_CTOKEN_WETH, POLYGON_WETH, signerAddress],
  );
  const callDataForMidasProtocolTarget = await getXCallCallData(POLYGON_DOMAIN_ID, swapper, forwardCallData, params);
  const swapAndXCallParams = {
    originDomain: "6450786",
    destinationDomain: "1886350457",
    fromAsset, // BNB
    toAsset, // USDC
    amountIn: amountIn.toString(),
    to: midasProtocolTarget,
    relayerFeeInNativeAsset: "1000000000000000", // 0.001 BNB
    callData: callDataForMidasProtocolTarget,
  };

  // estimate output amount
  const amountOutAfterXcall = await getSwapAmountOut(
    {
      domainId: "6450786",
      fromAsset,
      toAsset,
      amountIn: amountIn.toString(),
      rpc: rpcURL,
    },
    true,
  );
  console.log(`amountOut after xcall (bnb -> usdc): ${amountOutAfterXcall.toString()}`);

  const amountOutAfterExecute = await getSwapAmountOut(
    {
      domainId: "1886350457",
      fromAsset: POLYGON_USDC,
      toAsset: POLYGON_WETH,
      amountIn: BigNumber.from(amountOutAfterXcall).div(BigNumber.from(10).pow(12)).mul(9995).div(10000).toString(),
      rpc: POLYGON_RPC_URL,
      fee: poolFee,
    },
    false,
  );
  console.log(`amountOut after execute (usdc -> weth): ${amountOutAfterExecute.toString()}`);

  const amountOutDestination = await getBridgeAmountOut(
    {
      domainId: "6450786",
      fromAsset,
      toAsset,
      amountIn: amountIn.toString(),
      rpc: rpcURL,
    },
    {
      domainId: "1886350457",
      fromAsset: POLYGON_USDC,
      toAsset: POLYGON_WETH,
      amountIn: amountIn.toString(),
      rpc: POLYGON_RPC_URL,
    },
    18,
    6,
  );
  console.log(`amountOut on destination: ${amountOutDestination.toString()}`);

  const txRequest = await prepareSwapAndXCall(swapAndXCallParams, signerAddress);
  if (txRequest) {
    const tx = await signer.sendTransaction({ ...txRequest });
    console.log(`SwapAndXCall tx mined. tx: ${tx.hash}`);
    await tx.wait();
  }
};

testMidasProtocolTarget();
