export const WELCOME_MESSAGE =
  'Hi, I am Ali. Ask anything about me, my work, projects, education, or experience.';

export const CHAT_LIMITS = {
  maxMessageChars: Number(process.env.CHAT_MAX_MESSAGE_CHARS) || 280,
  minMessageChars: 2,
  maxHistoryTurns: 10,
  maxHistoryChars: 4000,
  topK: 5,
  minSimilarity: 0.32,
};

export const CONTACT = {
  email: process.env.CONTACT_EMAIL || 'alihafeez337@gmail.com',
  whatsappUrl:
    process.env.WHATSAPP_URL || 'https://wa.me/+923125925295',
  koalendarUrl:
    process.env.KOALENDAR_URL || 'https://koalendar.com/u/ali-hafeez',
};

export const BLOCKED_USER_MESSAGE =
  'I can only answer questions about my professional background, projects, and experience. Ask me about those—or use WhatsApp if you need something else.';
