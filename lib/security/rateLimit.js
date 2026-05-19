import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const perMin = Number(process.env.CHAT_RATE_LIMIT_PER_MIN) || 10;
const perDay = Number(process.env.CHAT_RATE_LIMIT_PER_DAY) || 80;

let upstashLimiter = null;

function getUpstashLimiter() {
  if (upstashLimiter) return upstashLimiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  upstashLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(perMin, '1 m'),
    analytics: false,
    prefix: 'chat-min',
  });
  return upstashLimiter;
}

const memoryBuckets = new Map();

function memoryRateLimit(identifier) {
  const now = Date.now();
  const key = identifier;
  let bucket = memoryBuckets.get(key);
  if (!bucket) {
    bucket = { minute: [], day: [] };
    memoryBuckets.set(key, bucket);
  }

  bucket.minute = bucket.minute.filter((t) => now - t < 60_000);
  bucket.day = bucket.day.filter((t) => now - t < 86_400_000);

  if (bucket.minute.length >= perMin || bucket.day.length >= perDay) {
    return { success: false };
  }

  bucket.minute.push(now);
  bucket.day.push(now);
  return { success: true };
}

export async function checkChatRateLimit(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded) ||
    req.socket?.remoteAddress ||
    'anonymous';
  const identifier = String(ip).trim();

  const limiter = getUpstashLimiter();
  if (limiter) {
    const { success } = await limiter.limit(identifier);
    if (!success) {
      return {
        ok: false,
        userMessage: 'Too many messages. Please wait a minute and try again.',
      };
    }
    return { ok: true };
  }

  const { success } = memoryRateLimit(identifier);
  if (!success) {
    return {
      ok: false,
      userMessage: 'Too many messages. Please wait a minute and try again.',
    };
  }

  return { ok: true };
}
