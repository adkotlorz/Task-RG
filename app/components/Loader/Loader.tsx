import React from "react";
import styles from "./Loader.module.scss";

const Loader: React.FC = () => (
  <div className={styles.loader}>
    <p className={styles.loaderText}>Loading...</p>
  </div>
);

export default Loader;
