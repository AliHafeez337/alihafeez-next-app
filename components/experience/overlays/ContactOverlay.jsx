import { useState } from 'react';
import { profile } from '@/content/profile';
import { useExperienceStore } from '@/store/useExperienceStore';
import styles from './Overlays.module.scss';
import panelStyles from './ContactOverlay.module.scss';

export default function ContactOverlay() {
  const section = useExperienceStore((s) => s.section);
  const isReady = useExperienceStore((s) => s.isReady);
  const visible = isReady && section === 'contact';

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setFeedback(data.error || 'Please check your inputs.');
        return;
      }
      setStatus('success');
      setFeedback(data.message || 'Message received!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setFeedback('Network error — try WhatsApp below.');
    }
  };

  return (
    <section
      id="contact"
      className={`${styles.overlay} ${panelStyles.panel} ${visible ? styles.visible : ''}`}
      aria-hidden={!visible}
    >
      <div className={panelStyles.inner}>
        <h2 className={panelStyles.title}>
          Let&apos;s work
          <br />
          together!
        </h2>
        <ul className={panelStyles.social}>
          {profile.social.map((link) => (
            <li key={link.id}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <form className={panelStyles.form} onSubmit={onSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Send'}
          </button>
          {feedback && (
            <p className={status === 'success' ? panelStyles.ok : panelStyles.err}>
              {feedback}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
