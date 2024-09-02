"use client";

import styles from "./Product.module.scss";

const CheckoutButton: React.FC = () => {
  return (
    <button
      className={styles.checkoutButton}
      onClick={() => window.history.back()}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
