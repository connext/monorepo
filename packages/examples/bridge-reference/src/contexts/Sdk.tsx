import { SdkBase, SdkPool, SdkRouter, SdkUtils } from "@connext/sdk-core";
import { useContext } from "react";

import { createCtx } from "../utils/context";

type SDK = {
  sdkBase: SdkBase;
  sdkUtils: SdkUtils;
  sdkRouter: SdkRouter;
  sdkPool: SdkPool;
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
