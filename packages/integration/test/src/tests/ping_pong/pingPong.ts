import { GenerateAgentWallet } from "../actions/GenerateAgentWallet";
import { Step } from "../../lib/Step";
import { Task } from "../../lib/Task";
import { TestManager, Test } from "../../lib/Test";

const createWalletNewAction = (howMany: number) => {
  const actionClasses = [];
  for (let i = 0; i < howMany; i++) {
    actionClasses.push(new GenerateAgentWallet());
  }
  return actionClasses;
};

const [routerWallet, userWallet] = createWalletNewAction(2);

const createAccounts = new Step([routerWallet, userWallet]);

const FundWallets: Task = new Task("FundWallets", [createAccounts]);

export const PingPongTest = new Test("pingpong", [FundWallets]);

const TestMgmt = new TestManager([PingPongTest]);

TestMgmt.startTests();
