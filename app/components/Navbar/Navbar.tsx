import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import SearchBar from "../Searchbar/Searchbar";
import Link from "next/link";

interface NavbarProps {
  onFilterChange: (filter: "promotion" | "active", value: boolean) => void;
  onSearchChange: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFilterChange, onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filter: "promotion" | "active"
  ) => {
    onFilterChange(filter, e.target.checked);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.topSection}>
        <div className={styles.logo}>
          <Link href={"/"}>Logo</Link>
        </div>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <div className={styles.actions}>
          <button className={styles.loginButton} aria-label="Log In">
            Log In
          </button>
        </div>
      </div>

      <div className={styles.inputs}>
        <label aria-label="Currently active offers filter">
          <input
            type="checkbox"
            id="activeFilter"
            onChange={(e) => handleFilterChange(e, "active")}
          />
          <div className={styles.customCheckbox}></div>
          Active
        </label>
        <label aria-label="Promotional offers filter">
          <input
            type="checkbox"
            id="promotionFilter"
            onChange={(e) => handleFilterChange(e, "promotion")}
          />
          <div className={styles.customCheckbox}></div>
          Promo
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
