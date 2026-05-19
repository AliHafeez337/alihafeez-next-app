import styles from './ScrollIcon.module.scss';

export default function ScrollIcon() {
  return (
    <a href="#about" className={styles.scroll} aria-label="Scroll to about section">
      <span className={styles.label}>Scroll</span>
      <svg
        className={styles.arrow}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 5v14M5 12l7 7 7-7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
