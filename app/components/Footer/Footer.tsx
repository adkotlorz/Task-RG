import styles from "./Footer.module.scss";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Lorem ipsum</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </div>
        <div className={styles.socialMedia}>
          <a
            aria-label="Go to facebook page"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            aria-label="Go to twitter page"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            aria-label="Go to instagram page"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>
          &copy; {new Date().getFullYear()} Lorem ipsum. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
