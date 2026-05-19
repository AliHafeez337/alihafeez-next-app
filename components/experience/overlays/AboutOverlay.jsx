import { profile } from '@/content/profile';
import { useExperienceStore } from '@/store/useExperienceStore';
import styles from './Overlays.module.scss';

export default function AboutOverlay() {
  const section = useExperienceStore((s) => s.section);
  const scrollProgress = useExperienceStore((s) => s.scrollProgress);
  const isReady = useExperienceStore((s) => s.isReady);
  const visible =
    isReady &&
    (section === 'about' || section === 'transition') &&
    scrollProgress > 0.3;

  const scanPct = Math.round(
    Math.max(0, Math.min(100, ((scrollProgress - 0.35) / 0.2) * 100))
  );

  return (
    <div
      className={`${styles.overlay} ${styles.about} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <div className={styles.tooltip} style={{ top: '18%', left: '8%' }}>
        <strong>{profile.name}</strong>
        <span className={styles.loc}>📍 {profile.location}</span>
      </div>
      <div className={styles.tooltip} style={{ top: '42%', left: '6%', maxWidth: '320px' }}>
        <p>{profile.bio}</p>
      </div>
      <div className={styles.tooltip} style={{ top: '28%', right: '8%', maxWidth: '280px' }}>
        <strong>Skills</strong>
        <ul>
          {profile.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        {scanPct > 0 && scanPct < 100 && (
          <span className={styles.scan}>Scan {scanPct}%</span>
        )}
      </div>
    </div>
  );
}
