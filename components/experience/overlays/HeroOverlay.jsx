import { profile } from '@/content/profile';
import { useExperienceStore } from '@/store/useExperienceStore';
import styles from './Overlays.module.scss';

export default function HeroOverlay() {
  const section = useExperienceStore((s) => s.section);
  const isReady = useExperienceStore((s) => s.isReady);
  const visible = isReady && (section === 'hero' || section === 'transition');

  return (
    <div
      className={`${styles.overlay} ${styles.hero} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <h1 className={styles.name}>{profile.name}</h1>
      <p className={styles.badge}>{profile.tagline}</p>
      <p className={styles.scrollHint}>
        <span>Scroll</span>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </p>
    </div>
  );
}
