import { useEffect, useState } from 'react';
import CareerChat from './CareerChat';
import styles from './CareerChatShell.module.css';

export default function CareerChatShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  if (isMobile) {
    return (
      <>
        <button
          type="button"
          className={styles.fab}
          onClick={() => setMobileOpen(true)}
          aria-label="Open chat with Ali"
        >
          <span className={styles.fabIcon} aria-hidden>
            💬
          </span>
          <span className={styles.fabPulse} aria-hidden />
          <span className={styles.fabLabel}>AI</span>
        </button>

        {mobileOpen && (
          <div className={styles.sheetBackdrop} role="presentation">
            <button
              type="button"
              className={styles.sheetBackdropHit}
              aria-label="Close chat"
              onClick={() => setMobileOpen(false)}
            />
            <div className={styles.sheet} role="dialog" aria-label="Chat with Ali">
              <div className={styles.sheetHandle} />
              <button
                type="button"
                className={styles.sheetClose}
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
              <CareerChat className={styles.sheetChat} />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <aside className={styles.desktopPanel} aria-label="Chat with Ali">
      <CareerChat />
    </aside>
  );
}
