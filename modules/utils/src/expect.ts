import chai from "chai";
import promised from "chai-as-promised";
import subset from "chai-subset";


let chaiPlugin = chai.use(subset);
chaiPlugin = chaiPlugin.use(promised);

export const expect = chaiPlugin.expect;
