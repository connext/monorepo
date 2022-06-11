import { OnChainTransaction } from "../actions/OnChainTransaction";
import { Step } from "../../lib/Step";
import { Task } from "../../lib/Task";
import { Test } from "../../lib/Test";

const createWalletAction = new OnChainTransaction(() => console.log("finished"));
const createWalletCheckBalanceStep = new Step([createWalletAction]);
const FundWallets: Task = new Task("FundWallets", [createWalletCheckBalanceStep]);
export const PingPongTest = new Test("pingpong", [FundWallets]);







