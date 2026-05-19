import { CHAT_LIMITS, BLOCKED_USER_MESSAGE } from '@/lib/chat/constants';
import {
  hasInjectionPattern,
  hasCodePattern,
  countUrls,
  symbolRatio,
  looksOffTopic,
  hasRepeatedChars,
} from '@/lib/security/patterns';

function historyCharCount(history) {
  if (!Array.isArray(history)) return 0;
  return history.reduce((sum, m) => sum + (m.content?.length || 0), 0);
}

export function validateChatRequest({ message, history }) {
  const text = typeof message === 'string' ? message.trim() : '';

  if (text.length < CHAT_LIMITS.minMessageChars) {
    return {
      ok: false,
      code: 'too_short',
      userMessage: 'Please type a short question.',
    };
  }

  if (text.length > CHAT_LIMITS.maxMessageChars) {
    return {
      ok: false,
      code: 'too_long',
      userMessage: `Please keep messages under ${CHAT_LIMITS.maxMessageChars} characters.`,
    };
  }

  if (Array.isArray(history) && history.length > CHAT_LIMITS.maxHistoryTurns * 2) {
    return {
      ok: false,
      code: 'history_limit',
      userMessage: 'This chat is getting long. Refresh the page to start fresh.',
    };
  }

  if (historyCharCount(history) > CHAT_LIMITS.maxHistoryChars) {
    return {
      ok: false,
      code: 'history_limit',
      userMessage: 'This chat is getting long. Refresh the page to start fresh.',
    };
  }

  if (
    hasInjectionPattern(text) ||
    hasCodePattern(text) ||
    countUrls(text) > 3 ||
    symbolRatio(text) > 0.45 ||
    hasRepeatedChars(text)
  ) {
    return {
      ok: false,
      code: 'blocked_content',
      userMessage: BLOCKED_USER_MESSAGE,
    };
  }

  if (looksOffTopic(text)) {
    return {
      ok: false,
      code: 'off_topic',
      userMessage: BLOCKED_USER_MESSAGE,
    };
  }

  return { ok: true };
}
