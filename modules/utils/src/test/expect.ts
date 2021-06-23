import chai from "chai";
import promised from "chai-as-promised";
import subset from "chai-subset";
import { waffleChai } from "@ethereum-waffle/chai";

let chaiPlugin = chai.use(subset);
chaiPlugin = chaiPlugin.use(promised);
chaiPlugin = chaiPlugin.use(waffleChai);

export const expect = chaiPlugin.expect;
