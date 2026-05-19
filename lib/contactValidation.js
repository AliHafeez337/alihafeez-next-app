const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;

export function sanitizeText(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export function validateContactPayload(body) {
  const errors = {};
  const name = sanitizeText(body?.name, MAX_NAME);
  const email = sanitizeText(body?.email, MAX_EMAIL);
  const message = sanitizeText(body?.message, MAX_MESSAGE);

  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!email || !EMAIL_RE.test(email)) {
    errors.email = 'A valid email address is required.';
  }

  if (!message || message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: { name, email, message },
  };
}
