/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import ErrorRoute from "./ErrorRoute";
import RepoDetails from "./RepoDetails/RepoDetails";
import ApiHandler from "./Api/ApiHandler";
import { RepositoryListContextDispatch, RepositoryListContextProvider } from "./ContextApi";
import { RepositoryReducerActionKey } from "./Reducer";
import SideBar from "./SideBar/SideBar";
import style from "./App.module.css";

function App() {
  const contextDispatch = useContext(RepositoryListContextDispatch);
  const contextProvider = useContext(RepositoryListContextProvider);

  const { loading } = contextProvider;


  useEffect(() => {
    fetchRepositoryList();
  }, []);

  const fetchRepositoryList = async () => {
    contextDispatch({
      type: RepositoryReducerActionKey.SET_LOADING,
      payload: true,
    });
    const response = await ApiHandler.get(
      "https://api.github.com/orgs/godaddy/repos"
    );
    if (response.status === 200) {
      contextDispatch({
        type: RepositoryReducerActionKey.SET_REPOSITORY,
        payload: response.data || [],
      });
    }
    contextDispatch({
      type: RepositoryReducerActionKey.SET_LOADING,
      payload: false,
    });
  };

  return (
    <main className={style.mainContainer}>
      <BrowserRouter>
        <SideBar />
        <div className={style.routeContainer}>
          <Routes>
            <Route index path="/" element={<></>} />
            <Route
              path="/repo/:repoId"
              Component={(props) => <RepoDetails {...props} />}
            />
            <Route path="*" element={<ErrorRoute />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;
