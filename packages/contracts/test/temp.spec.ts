import { Contract, providers } from "ethers";

import artifact from "../artifacts/contracts/test/TestERC20.sol/TestERC20.json";

describe.skip("Sample Script", function () {
  const BscUSDC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";

  const rpcUrl = "https://bsc-dataseed.binance.org";

  const rpcProvider = new providers.JsonRpcProvider(rpcUrl);
  const contract = new Contract(BscUSDC, artifact.abi, rpcProvider);

  it("use queryFilter", async () => {
    // https://www.bscscan.com/tx/0x980fa5dc27464b017f58175d541e6d9193841a74a076b82a943b24fce49a0f55
    const res = await contract.queryFilter({ address: "0x8894E0a0c962CB723c1976a4421c95949bE2D4E3" }, 8766448, 8766449);
    console.log(res);
  });
});
