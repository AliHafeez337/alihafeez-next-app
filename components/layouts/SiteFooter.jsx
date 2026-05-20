import KoalendarLink from '@/components/koalendar/KoalendarLink';
import { CONTACT } from '@/lib/chat/constants';
import styles from './Main_Layout.module.css';

const CV_URL =
  'https://drive.google.com/file/d/14y8cDraVvK34RX_5ro1USNXpa5AuoaUt/view';

export default function SiteFooter() {
  return (
    <nav className={styles.footerNav} aria-label="Site links">
      <a
        href={CV_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footerLink}
      >
        View my CV
      </a>
      <span className={styles.footerSep} aria-hidden>
        ·
      </span>
      <KoalendarLink
        className={`${styles.footerLink} ${styles.footerLinkAccent}`}
      >
        Book a consultation
      </KoalendarLink>
      <span className={styles.footerSep} aria-hidden>
        ·
      </span>
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footerLink}
      >
        Chat on WhatsApp
      </a>
    </nav>
  );
}
