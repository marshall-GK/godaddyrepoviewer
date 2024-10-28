import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { RepositoryListContextProvider } from "../ContextApi";
import style from "./RepoDetails.module.css";
import { BranchesOutlined, EyeFilled, LinkOutlined, StarFilled } from "@ant-design/icons";

const RepoDetails = (props: any) => {
  const [query, setQuery] = useState("");
  const [repoData, setRepoData] = useState<any>({});
  console.log(props);
  const location = useLocation();
  const contextReducer = useContext(RepositoryListContextProvider);
  const { repositoryList, loading } = contextReducer;

  const repoName = location.pathname
    .split("/repo/")
    .filter((item) => !!item)?.[0];

  useEffect(() => {
    if (repoName) {
      setQuery(repoName);
      console.log(repoName);
      if (repoName) {
        const data = repositoryList.filter(
          (item) => item.name === repoName
        )?.[0];
        console.log(data);
        setRepoData(data);
      }
    }
  }, [repoName]);

  const renderDetailsCount = () => {
    return (
      <ul className={style.detailsCount}>
        <li>
          <span>Fork <BranchesOutlined /></span>
          <span>{repoData?.forks_count}</span>
        </li>
        <li>
          <span>Open Issues <LinkOutlined /></span>
          <span>{repoData?.open_issues_count}</span>
        </li>
        <li>
          <span>Watchers <EyeFilled /></span>
          <span>{repoData?.watchers_count}</span>
        </li>
        <li>
          <span>Stars <StarFilled /></span>
          <span>{repoData?.stargazers_count}</span>
        </li>
      </ul>
    );
  };

  const renderDetailsDescription = () => {
    return <article className={style.description}>{repoData?.description}</article>
  }

  const renderOtherDetails = () => {
    return <section>
      <div>
        <div>Languages</div>
        <div>{repoData?.language}</div>
      </div>
    </section>
  }

  return (
    <section className={style.repoDetailsContainer}>
      <header>
        <h1>{repoData?.name} <sup>{repoData?.visibility}</sup></h1>
        {renderDetailsCount()}
      </header>
      <div className={style.infoContainer}>
        {renderDetailsDescription()}
        {renderOtherDetails()}
      </div>
    </section>
  );
};

export default RepoDetails;
