## SDK Integration

The Connext Chain Abstraction SDK makes the process of creating the data for the swap very simple.

### Installation

For installing the SDK, use **Node.js v18**. You can install the SDK with the following command.

```bash npm2yarn
npm install @connext/chain-abstraction
```

### Usage

The SDK covers three major functions:

- `getPoolFeeForUniV3`
- `getXCallCallData`
- `prepareSwapAndXCall`

#### `getPoolFeeForUniV3`

The function `getPoolFeeForUniV3` returns the poolFee of the UniV3 pool for a given token pair which would be used in the UniV3 router execution. The poolFee is the fee that is charged by the pool for trading the tokens.

```ts
export const getPoolFeeForUniV3 = async (
  domainId: string,
  rpc: string,
  token0: string,
  token1: string,
):
```

The function takes four parameters:

- `domainId`: The target domain ID.
- `rpc`: The RPC endpoint for a given domain.
- `token0`: The first token address.
- `token1`: The second token address.

The function returns a `Promise` that resolves to a string representing the poolFee of the UniV3 pool.

##### Example

```ts
// asset address
const POLYGON_WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
const POLYGON_USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
// Domain details
const POLYGON_DOMAIN_ID = "1886350457";
const POLYGON_RPC_URL = "https://polygon.llamarpc.com";

const poolFee = await getPoolFeeForUniV3(POLYGON_DOMAIN_ID, POLYGON_RPC_URL, POLYGON_WETH, POLYGON_USDC);

console.log(poolFee);
```

#### `getXCallCallData`

The `getXCallCallData` function generates calldata to be passed into `xcall`. This is the "outer" calldata that contains encoded "inner" calldata for a swap and a forward call to a target contract on the destination domain.

```ts
export const getXCallCallData = async (
  domainId: string,
  target: XReceiveTarget,
  swapper: Swapper,
  params: DestinationCallDataParams,
):
```

It takes four parameters.

- `domainId`: A string representing the destination domain ID.
- `target`: A string representing the name of the `xReceive` contract on the destination.
- `swapper`: A string representing which swapper should be used. It can be `UniV2`, `UniV3`, or `OneInch`.
- `params`: An object containing the following fields.

  ```ts
  {
    fallback: string;
    swapForwarderData: {
      toAsset: string;
      swapData: {
        amountOutMin: string;
      } | {
        amountOutMin: string;
        poolFee: string;
      };
      forwardCallData: {
        cTokenAddress: string;
        underlying: string;
        minter: string;
      } | {} | {};
    }
  }
  ```

  - `fallback`: The fallback address to send funds if the forward call fails on the destination domain.
  - `swapForwarderData`: An object with the following fields.
    - `toAsset`: Address of the token to swap into on the destination domain.
    - `swapData`: Calldata that the swapper contract on the destination domain will use to perform the swap.
    - `forwardCallData`: Calldata that the xReceive target on the destination domain will use in the forward call.

Function returns the encoded calldata as a string.

##### Example

```ts
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
const midasProtocolTarget = "0x5d7663c5483A46e7794b652aF8f155775E4F390C";

// Params for calldata generation
const POLYGON_DOMAIN_ID = "1886350457";
const POLYGON_RPC_URL = "https://polygon.llamarpc.com";
const target = XReceiveTarget.MidasProtocol;
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
    forwardCallData: {
      cTokenAddress: POLYGON_CTOKEN_WETH,
      underlying: POLYGON_WETH,
      minter: signerAddress,
    },
  },
};
const callDataForMidasProtocolTarget = await getXCallCallData(POLYGON_DOMAIN_ID, target, swapper, params);
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

const txRequest = await prepareSwapAndXCall(swapAndXCallParams, signerAddress);
if (txRequest) {
  const tx = await signer.sendTransaction({ ...txRequest });
  console.log(`SwapAndXCall tx mined. tx: ${tx.hash}`);
  await tx.wait();
}
```

#### `prepareSwapAndXCall`

The `prepareSwapAndXCall` function prepares `SwapAndXCall` inputs and encodes the calldata. It returns a `providers.TransactionRequest` object to be sent to the RPC provider.

```ts
export const prepareSwapAndXCall = async (
  params: SwapAndXCallParams,
  signerAddress: string,
):
```

It takes two parameters:

- `signerAddress` (required): The address of the signer to send a transaction from.
- `params`: An object containing the following fields:

  - `originDomain` (required): The origin domain ID.
  - `destinationDomain` (required): The destination domain ID.
  - `fromAsset` (required): The address of the asset to swap from.
  - `toAsset` (required): The address of the asset to swap to.
  - `amountIn` (required): The number of fromAsset tokens.
  - `to` (required): The address to send the asset and call with the calldata on the destination.
  - `delegate` (optional): The fallback address on the destination domain which defaults to `to`.
  - `slippage` (optional): Maximum acceptable slippage in BPS which defaults to 300. For example, a value of 300 means 3% slippage.
  - `route` (optional): The address of the swapper contract and the data to call the swapper contract with.
  - `callData` (optional): The calldata to execute (can be empty: "0x").
  - `relayerFeeInNativeAsset` (optional): The fee amount in native asset.
  - `relayerFeeInTransactingAsset` (optional): The fee amount in the transacting asset.

    ```
    {
        originDomain: string,
        destinationDomain: string,
        fromAsset: string,
        toAsset: string,
        amountIn: string,
        to: string,
        relayerFeeInNativeAsset: string | undefined,
        relayerFeeInTransactingAsset: string | undefined,
        delegate: string | undefined,
        slippage: string | undefined,
        route: {
            swapper: string,
            swapData: string,
          } | undefined,
        callData: string | undefined,
    }
    ```

The function returns a Promise that resolves to a `providers.TransactionRequest` object to be sent to the RPC provider.

##### Example

```ts
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
```
