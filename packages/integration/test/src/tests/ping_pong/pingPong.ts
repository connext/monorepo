import { GenerateWallet } from "../actions/OnChainTransaction";
import { Step } from "../../lib/Step";
import { Task } from "../../lib/Task";
import { TestManager, Test } from "../../lib/Test";

const createWalletAction = new GenerateWallet(() => console.log("final"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const createWalletCheckBalanceStep = new Step([createWalletAction]);
const FundWallets: Task = new Task("FundWallets", [createWalletCheckBalanceStep]);
export const PingPongTest = new Test("pingpong", [FundWallets]);

const TestMgmt = new TestManager([PingPongTest]);
TestMgmt.addTest(PingPongTest);
TestMgmt.startTests();
