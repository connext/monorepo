import { GenerateAgentWallet } from "../actions/GenerateAgentWallet";
import { Step } from "../../lib/Step";
import { Task } from "../../lib/Task";
import { TestManager, Test } from "../../lib/Test";
import { Action } from "../../lib/Action";


const createWalletNewAction = (howMany: number): Action[] => {
  const actionClasses = [];
  for (let i = 0; i < howMany; i++) {
    actionClasses.push(new GenerateAgentWallet());
  }
  return actionClasses;
};

//create router and user wallet
const [routerWallet, userWallet] = createWalletNewAction(2);

//add them sequentially to the step step could encompass
//creation
//fund with native token
//approve and tx test token

const createAccounts = new Step([routerWallet, userWallet]);

const FundWallets: Task = new Task("FundWallets", [createAccounts]);

export const PingPongTest = new Test("pingpong", [FundWallets]);

const TestMgmt = new TestManager([PingPongTest]);

TestMgmt.startTests();
