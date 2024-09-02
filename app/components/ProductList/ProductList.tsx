import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import styles from "./ProductList.module.scss";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: string;
  promotion: boolean;
  active: boolean;
}

interface ProductListProps {
  searchQuery: string;
  filters: {
    promotion?: boolean;
    active?: boolean;
  };
}

const ProductList: React.FC<ProductListProps> = ({ searchQuery, filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://642ec14a8ca0fe3352d7fe14.mockapi.io/api/v1/products"
        );
        const productsData = response.data.map((item: any) => ({
          ...item,
          rating: parseInt(item.rating, 10),
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.promotion !== undefined) {
      updatedProducts = updatedProducts.filter((product) =>
        filters.promotion ? product.promotion : true
      );
    }

    if (filters.active !== undefined) {
      updatedProducts = updatedProducts.filter((product) =>
        filters.active ? product.active : true
      );
    }

    setFilteredProducts(updatedProducts);

    const totalPages = Math.ceil(updatedProducts.length / productsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage === 0) {
      setCurrentPage(1);
    }
  }, [searchQuery, filters, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className={styles.productList}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            const ariaLabel = product.active ? "Show details" : "Unavailable";
            const rating = Math.max(
              0,
              Math.min(5, parseInt(product.rating, 10))
            );
            const emptyStars = Math.max(0, 5 - rating);

            return (
              <div
                key={product.id}
                className={`${styles.productCard} ${
                  !product.active ? styles.unavailable : ""
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                  width={200}
                  loading="lazy"
                  height={200}
                />
                <div className={styles.productDetails}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className={styles.rating}>
                    {"★".repeat(rating)}
                    {"☆".repeat(emptyStars)}
                  </div>
                  <Link href={`/products/${product.id}`} passHref>
                    <button
                      aria-label={ariaLabel}
                      className={styles.detailsButton}
                      disabled={!product.active}
                    >
                      {product.active ? "Show details" : "Unavailable"}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
