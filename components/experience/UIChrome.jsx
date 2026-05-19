import { profile } from '@/content/profile';
import { useExperienceStore } from '@/store/useExperienceStore';
import styles from './UIChrome.module.scss';

const NAV = [
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'projects', label: 'PROJECTS', href: '#projects' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export default function UIChrome() {
  const section = useExperienceStore((s) => s.section);
  const isReady = useExperienceStore((s) => s.isReady);
  const audioEnabled = useExperienceStore((s) => s.audioEnabled);
  const setAudioEnabled = useExperienceStore((s) => s.setAudioEnabled);

  if (!isReady) return null;

  const activeNav =
    section === 'about'
      ? 'about'
      : section === 'projects'
        ? 'projects'
        : section === 'contact'
          ? 'contact'
          : null;

  return (
    <header className={styles.chrome}>
      <nav className={styles.nav} aria-label="Main">
        {NAV.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={activeNav === item.id ? styles.active : ''}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className={styles.actions}>
        <a
          href={profile.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          GET IN TOUCH
        </a>
        <button
          type="button"
          className={styles.sound}
          onClick={() => setAudioEnabled(!audioEnabled)}
          aria-label={audioEnabled ? 'Mute sound' : 'Enable sound'}
          aria-pressed={audioEnabled}
        >
          {audioEnabled ? '🔊' : '🔇'}
        </button>
      </div>
    </header>
  );
}
