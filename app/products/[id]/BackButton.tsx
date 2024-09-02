"use client";

import styles from "./Product.module.scss";

const BackButton = () => {
  return (
    <button className={styles.backButton} onClick={() => window.history.back()}>
      &larr; Back
    </button>
  );
};

export default BackButton;
