import React, { createContext, useReducer } from "react";
import { defautRepositoryReducer, RepositoryReducer } from "./Reducer";

export const RepositoryListContextProvider = createContext<
  typeof defautRepositoryReducer
>(defautRepositoryReducer);
export const RepositoryListContextDispatch = createContext<any>(null);

export const RepositoryListContext = ({ children }: any) => {
  const [reducer, dispatch] = useReducer(
    RepositoryReducer,
    defautRepositoryReducer
  );
  return (
    <RepositoryListContextProvider.Provider value={reducer}>
      <RepositoryListContextDispatch.Provider value={dispatch}>
        {children}
      </RepositoryListContextDispatch.Provider>
    </RepositoryListContextProvider.Provider>
  );
};
