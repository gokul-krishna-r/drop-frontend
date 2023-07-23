import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../images/logo.svg"

const Header = () => {
   

    const onLogOut=(() => {
        const token = localStorage.removeItem("tokenid");
        return token
      });

  return (
    < >
      <div className={styles.header}>
      <img src={logo} alt="drop logo"/>
      <div>
        <Link to={"/documentation"}>Documentation</Link>
        <Link to={"/login"} onClick={onLogOut}>Logout</Link>
      </div>
      </div>
    </>
  );
};
export default Header;
