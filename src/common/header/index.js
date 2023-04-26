import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../images/logo.svg"

const Header = () => {
   

  return (
    < >
      <div className={styles.header}>
      <img src={logo} alt="drop logo"/>
      <Link>Pricing</Link>
      <Link>Documentation</Link>
      <Link>Logout</Link>
      </div>
    </>
  );
};
export default Header;
