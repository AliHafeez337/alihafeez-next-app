import styles from './Cursor.module.scss';

export default function Cursor() {
  return (
    <div className={styles.cursor} aria-hidden="true">
      <div id="cursor-dot" className={styles.dot} />
      <div id="cursor-ring" className={styles.ring} />
    </div>
  );
}
