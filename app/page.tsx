"use client";

import styles from "./page.module.scss";

import React, { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";
import Head from "next/head";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<{
    promotion?: boolean;
    active?: boolean;
  }>({});

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (
    filter: "promotion" | "active",
    value: boolean
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
  };

  return (
    <>
      <Head>
        <title>HomePage - My App</title>
        <meta
          name="description"
          content="Welcome. It is just for SEO purpose"
        />
      </Head>
      <Navbar
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />
      <main className={styles.mainContent}>
        <ProductList searchQuery={searchQuery} filters={filters} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
