import { profile } from '@/content/profile';
import styles from './Header.module.scss';

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.brand}>
          <span className={styles.brandName}>{profile.name}</span>
          <span className={styles.brandTitle}>— {profile.title}</span>
        </a>
        <nav className={styles.nav} aria-label="Main navigation">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
