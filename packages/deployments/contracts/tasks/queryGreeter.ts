import { Contract } from "ethers";
import { task } from "hardhat/config";

export default task("query-greeter", "Query a greeter contract")
  .addParam("greeter", "Greeter Contract Address")
  .setAction(async ({ greeter }, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const greeterABI = [
      {
        type: "constructor",
        stateMutability: "nonpayable",
        inputs: [{ type: "string", name: "_greeting", internalType: "string" }],
      },
      {
        type: "event",
        name: "SetGreeting",
        inputs: [
          { type: "address", name: "sender", internalType: "address", indexed: false },
          { type: "address", name: "origin", internalType: "address", indexed: false },
          { type: "address", name: "xorigin", internalType: "address", indexed: false },
        ],
        anonymous: false,
      },
      {
        type: "function",
        stateMutability: "view",
        outputs: [{ type: "string", name: "", internalType: "string" }],
        name: "greet",
        inputs: [],
      },
      {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "setGreeting",
        inputs: [{ type: "string", name: "_greeting", internalType: "string" }],
      },
    ];

    const Greeter = new Contract(greeter as string, greeterABI, deployer);
    const greet_string = await Greeter.greet();
    console.log({ greet_string });
  });
