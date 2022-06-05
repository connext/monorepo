import { fork } from "child_process";
import { join } from "path";

fork(join(__dirname, "/transfersPoller"));
fork(join(__dirname, "/routersPoller"));
