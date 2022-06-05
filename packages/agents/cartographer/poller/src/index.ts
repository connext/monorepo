import { fork } from "child_process";

fork("transfersPoller");
fork("routersPoller");
