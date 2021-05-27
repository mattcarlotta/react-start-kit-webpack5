import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => (
  <div className={styles.notfoundContainer}>
    <div className={styles.notfound}>
      <h1>404 - Page Not Found!</h1>
      <Link to="/">Take Me Home</Link>
    </div>
  </div>
);

export default NotFound;
