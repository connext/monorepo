import React, { createContext, useReducer } from "react";

export function createCtx<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType,
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState;
  const ctx = createContext({
    state: initialState,
    dispatch: defaultDispatch,
  });

  function Provider(props: React.PropsWithChildren<unknown>) {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState);
    return <ctx.Provider value={{ state, dispatch }} {...props} />;
  }

  return [ctx, Provider] as const;
}
