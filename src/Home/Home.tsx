import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import ApiHandler from "../Api/ApiHandler";
import { RepositoryListContextProvider } from "../ContextApi";
import style from "./Home.module.css";
import { Link } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const contextReducer = useContext(RepositoryListContextProvider);
  const { repositoryList } = contextReducer;

  useEffect(() => {
    console.log({ repositoryList });
  }, []);

  const handleRepoClick = (name: string) => {
    navigate(`/repo/${name}`, { state: { repoId: name } });
  };

  const renderRepoCard = (repo: any) => {
    return (
      <div key={repo.id} onClick={() => handleRepoClick(repo.name)} className={style.repoCard}>
        /{repo.name}
      </div>
    );
  };

  return (
    <aside className={style.repoListContainer}>
      <h3>Repositories</h3>
      {repositoryList.map((repo) => renderRepoCard(repo))}
    </aside>
  );
};

export default Home;
