import styles from './BackgroundGrid.module.scss';

export default function BackgroundGrid() {
  return (
    <>
      <div className={styles.grid} aria-hidden="true">
        <div className={styles.glow} />
      </div>
    </>
  );
}
