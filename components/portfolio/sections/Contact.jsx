import { useState } from 'react';
import { profile } from '@/content/profile';
import styles from './Contact.module.scss';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors ?? { form: data.error });
        setStatus('error');
        setFeedback(data.error ?? 'Please fix the errors below.');
        return;
      }

      setStatus('success');
      setFeedback(data.message ?? 'Thank you! Your message was received.');
      setForm(initialForm);
    } catch {
      setStatus('error');
      setFeedback('Network error. Try WhatsApp or email instead.');
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <div data-animate="fade-up" className={styles.formCol}>
          <h2 className={styles.heading}>Contact</h2>
          <p className={styles.intro}>
            Have a project in mind? Send a message or reach out on social channels.
          </p>
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <label htmlFor="name">
              Name
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={onChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" className={styles.error} role="alert">
                  {errors.name}
                </span>
              )}
            </label>
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={onChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" className={styles.error} role="alert">
                  {errors.email}
                </span>
              )}
            </label>
            <label htmlFor="message">
              Message
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <span id="message-error" className={styles.error} role="alert">
                  {errors.message}
                </span>
              )}
            </label>
            {errors.form && (
              <p className={styles.error} role="alert">
                {errors.form}
              </p>
            )}
            <button
              type="submit"
              className={styles.submit}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </button>
            {feedback && (
              <p
                className={
                  status === 'success' ? styles.success : styles.error
                }
                role="status"
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
        <div data-animate="fade-up" className={styles.sideCol}>
          <div className={styles.envelope} aria-hidden="true">
            <span className={styles.envelopeIcon}>✉</span>
          </div>
          <ul className={styles.social}>
            {profile.social.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
