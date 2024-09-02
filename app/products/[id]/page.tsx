import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./Product.module.scss";
import CheckoutButton from "./CheckoutButton";
import BackButton from "./BackButton";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: string;
  promotion: boolean;
  active: boolean;
}

// Funkcja do pobierania danych serwera
const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(
    `https://642ec14a8ca0fe3352d7fe14.mockapi.io/api/v1/products/${id}`
  );
  if (!response.ok) {
    throw new Error("Product not found");
  }
  return response.json();
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  try {
    const product = await fetchProduct(params.id);

    return (
      <div className={styles.productPage}>
        <BackButton />
        <h1>{product.name}</h1>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          priority
        />
        <p>{product.description}</p>
        <div className={styles.rating}>
          {"★".repeat(Math.max(0, Math.min(5, parseInt(product.rating, 10))))}
          {"☆".repeat(Math.max(0, 5 - parseInt(product.rating, 10)))}
        </div>
        <p>Promo: {product.promotion ? "Yes" : "No"}</p>
        <p>Active: {product.active ? "Yes" : "No"}</p>
        <CheckoutButton />
      </div>
    );
  } catch (error) {
    notFound(); // Obsługuje błąd, jeśli produkt nie zostanie znaleziony
  }
};

export default ProductPage;
