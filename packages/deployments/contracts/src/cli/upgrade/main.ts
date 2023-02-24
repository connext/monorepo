import { providers } from "ethers";
import { getDiamondUpgradeProposal } from "./propose";

getDiamondUpgradeProposal(420, new providers.JsonRpcProvider(""), "staging");
