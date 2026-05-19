import { useEffect } from 'react';
import { useExperienceStore } from '@/store/useExperienceStore';
import styles from './Preloader.module.scss';

export default function Preloader() {
  const loadProgress = useExperienceStore((s) => s.loadProgress);
  const isReady = useExperienceStore((s) => s.isReady);
  const setLoadProgress = useExperienceStore((s) => s.setLoadProgress);
  const setReady = useExperienceStore((s) => s.setReady);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setLoadProgress(100);
        setTimeout(() => setReady(true), 400);
      } else {
        setLoadProgress(Math.min(99, Math.floor(p)));
      }
    }, 120);
    return () => clearInterval(id);
  }, [setLoadProgress, setReady]);

  if (isReady) return null;

  return (
    <div className={styles.preloader} aria-live="polite" aria-busy="true">
      <p className={styles.name}>Ali Hafeez</p>
      <div className={styles.logo} aria-hidden="true">
        <svg viewBox="0 0 64 64" width="72" height="72">
          <path
            fill="currentColor"
            d="M32 8 L56 20 V44 L32 56 L8 44 V20 Z"
            opacity="0.2"
          />
          <text
            x="32"
            y="38"
            textAnchor="middle"
            fill="currentColor"
            fontSize="18"
            fontFamily="monospace"
          >
            {'</>'}
          </text>
        </svg>
      </div>
      <div className={styles.bar}>
        <span style={{ width: `${loadProgress}%` }} />
      </div>
      <p className={styles.percent}>{loadProgress}%</p>
    </div>
  );
}
