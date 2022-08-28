import { NxtpSdkBase, NxtpSdkPool, NxtpSdkRouter, NxtpSdkStableSwap, NxtpSdkUtils } from "@connext/nxtp-sdk";
import { useContext } from "react";

import { createCtx } from "../utils/context";

type SDK = {
  nxtpSdkBase: NxtpSdkBase;
  nxtpSdkUtils: NxtpSdkUtils;
  nxtpSdkRouter: NxtpSdkRouter;
  nxtpSdkStableSwap: NxtpSdkStableSwap;
  nxtpSdkPool: NxtpSdkPool;
};

interface IAppState {
  sdk?: SDK;
}

const initialState: IAppState = {
  sdk: undefined,
};

type AppState = typeof initialState;
type Action = { type: "set"; payload: SDK };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "set":
      return { ...state, sdk: action.payload };
    default:
      throw new Error();
  }
}

const [ctx, SdkProvider] = createCtx(reducer, initialState);

function useSdk() {
  const context = useContext(ctx);

  if (context === undefined) {
    throw new Error("useSdk must be used within a SdkProvider");
  }

  return context;
}

export { SdkProvider, useSdk };
