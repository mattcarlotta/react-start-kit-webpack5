import React from "react";
import { nanoid } from "nanoid";
import logo from "~images/logo.svg";
import styles from "./Home.module.scss";

const Home = () => (
  <div className={styles.app}>
    <div className={styles.logoContainer}>
      <img className={styles.logoStyle} src={logo} alt="logo.svg" />
      <h1 className={styles.title}>React Starter Kit</h1>
      <h1 className={styles.title}>Edit ./components and save to reload.</h1>
      <p>{nanoid()}</p>
    </div>
  </div>
);

export default Home;
