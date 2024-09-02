import { FaSearch } from "react-icons/fa";

import styles from "./Searchbar.module.scss";

/**
 * SearchBar component that provides a search input and a search button.
 *
 * This component allows users to input a search query, which is managed by the parent component.
 * It also includes a search button with an icon. The search query and change handler are passed
 * as props.
 *
 * @component
 * @example
 * const [query, setQuery] = React.useState('');
 *
 * const handleSearchChange = (newQuery) => {
 *   setQuery(newQuery);
 * };
 *
 * return (
 *   <SearchBar searchQuery={query} onSearchChange={handleSearchChange} />
 * );
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.searchQuery - The current search query value.
 * @param {Function} props.onSearchChange - Callback function to handle search query changes.
 * @param {string} props.onSearchChange.query - The new search query value.
 * @returns {React.Element} The SearchBar component.
 */

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
        className={styles.searchInput}
      />
      <button aria-label="Search" className={styles.searchButton}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
