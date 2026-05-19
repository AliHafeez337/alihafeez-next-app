import { useCallback, useEffect, useRef, useState } from 'react';
import { WELCOME_MESSAGE, CHAT_LIMITS } from '@/lib/chat/constants';
import styles from './CareerChat.module.css';

export default function CareerChat({ className = '' }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    const userMsg = { role: 'user', content: trimmed };
    const history = messages.filter((m) => m.role !== 'system');
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.error || 'Could not get a reply. Please try again.',
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || '…' },
      ]);
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className={`${styles.chat} ${className}`}>
      <header className={styles.header}>
        <span className={styles.status} aria-hidden />
        <div className={styles.titleBlock}>
          <span className={styles.title}>Ali</span>
          <span className={styles.subtitle}>Ask anything about me</span>
        </div>
      </header>

      <div className={styles.messages} ref={listRef}>
        {messages.map((m, i) => (
          <ChatBubble
            key={`${i}-${m.role}-${m.content.slice(0, 12)}`}
            message={m}
          />
        ))}
        {loading && <ChatBubble typing />}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={onSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={CHAT_LIMITS.maxMessageChars}
          placeholder="Ask me about my work, projects, or background…"
          disabled={loading}
          aria-label="Message"
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>

      <p className={styles.disclaimer}>
        AI-generated replies may be incomplete. Use the links in the footer to
        reach me.
      </p>
    </div>
  );
}

function ChatBubble({ message, typing }) {
  const isUser = message?.role === 'user';
  return (
    <div
      className={`${styles.bubble} ${isUser ? styles.user : styles.assistant}`}
    >
      {!isUser && <span className={styles.avatar}>A</span>}
      <div className={styles.bubbleBody}>
        {typing ? (
          <span className={styles.typing}>
            <span />
            <span />
            <span />
          </span>
        ) : (
          message?.content
        )}
      </div>
    </div>
  );
}
