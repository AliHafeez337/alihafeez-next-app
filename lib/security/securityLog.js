import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const MAX_PER_IP_HOUR = 3;
const MAX_GLOBAL_DAY = 20;

function hashIp(ip) {
  return crypto.createHash('sha256').update(String(ip)).digest('hex').slice(0, 16);
}

export async function logSecurityConcern({ req, reason, snippet }) {
  if (process.env.ENABLE_SECURITY_LOG !== 'true') return;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;

  try {
    const redis = new Redis({ url, token });
    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded) ||
      'anonymous';
    const ipHash = hashIp(ip);
    const hourKey = `sec:ip:${ipHash}:${new Date().toISOString().slice(0, 13)}`;
    const dayKey = `sec:day:${new Date().toISOString().slice(0, 10)}`;

    const ipCount = await redis.incr(hourKey);
    if (ipCount === 1) await redis.expire(hourKey, 3600);

    const dayCount = await redis.incr(dayKey);
    if (dayCount === 1) await redis.expire(dayKey, 86400);

    if (ipCount > MAX_PER_IP_HOUR || dayCount > MAX_GLOBAL_DAY) return;

    await redis.lpush(
      'sec:events',
      JSON.stringify({
        ts: new Date().toISOString(),
        ipHash,
        reason,
        snippet: String(snippet).slice(0, 120),
      })
    );
    await redis.ltrim('sec:events', 0, 99);
  } catch {
    // non-fatal
  }
}
