import styles from "./Pagination.module.scss";

/**
 * Pagination component that allows users to navigate through pages of content.
 *
 * This component displays a set of page buttons, including navigation buttons
 * for first, previous, next, and last pages. It also shows buttons for each page number
 * based on the total number of pages. The current page and total number of pages are
 * managed by the parent component, and a callback function is used to handle page changes.
 *
 * @component
 * @example
 * const [currentPage, setCurrentPage] = React.useState(1);
 * const totalPages = 10;
 *
 * const handlePageChange = (page) => {
 *   setCurrentPage(page);
 * };
 *
 * return (
 *   <Pagination
 *     currentPage={currentPage}
 *     totalPages={totalPages}
 *     onPageChange={handlePageChange}
 *   />
 * );
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalPages - The total number of pages available.
 * @param {Function} props.onPageChange - Callback function to handle page changes.
 * @param {number} props.onPageChange.page - The page number to navigate to.
 * @returns {React.Element} The Pagination component.
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        className={styles.pageButton}
        aria-label={
          currentPage === 1
            ? "Already on the first page"
            : "Go to the first page"
        }
      >
        &laquo;
      </button>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageButton}
        aria-label={
          currentPage === 1
            ? "Already on the first page"
            : "Go to the previous page"
        }
      >
        &lt;
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageClick(index + 1)}
          className={`${styles.pageButton} ${
            currentPage === index + 1 ? styles.active : ""
          }`}
          aria-label={`Go to page ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
        aria-label={
          currentPage === totalPages
            ? "Already on the last page"
            : "Go to the next page"
        }
      >
        &gt;
      </button>
      <button
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
        aria-label={
          currentPage === totalPages
            ? "Already on the last page"
            : "Go to the last page"
        }
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
