import * as fs from "fs";

import {
  signRouterPathPayload as _signRouterPathPayload,
  recoverRouterPathPayload as _recoverRouterPathPayload,
} from "@connext/nxtp-utils";

export const signRouterPathPayload = _signRouterPathPayload;
export const recoverRouterPathPayload = _recoverRouterPathPayload;

export const existsSync = fs.existsSync;

export const readFileSync = fs.readFileSync;
