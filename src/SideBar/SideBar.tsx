// import { useState, useEffect } from "
import Home from "../Home/Home";
import style from './SideBar.module.css';

const SideBar = () => {
  return (
    <div className={style.sidebarContainer}>
      <Home />
    </div>
  );
};

export default SideBar;
