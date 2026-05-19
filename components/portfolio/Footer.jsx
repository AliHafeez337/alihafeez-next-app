import { profile } from '@/content/profile';
import styles from './Footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <a
        href={profile.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mono}
      >
        View my CV
      </a>
      <p className={styles.and}>&nbsp;and&nbsp;</p>
      <a
        href={profile.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.friends}
      >
        Let&apos;s be friends.
      </a>
      <p className={styles.copy}>© {year} {profile.name}</p>
    </footer>
  );
}
