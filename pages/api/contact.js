import { validateContactPayload } from '@/lib/contactValidation';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { valid, errors, data } = validateContactPayload(req.body ?? {});

  if (!valid) {
    return res.status(400).json({ error: 'Validation failed', errors });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          source: 'portfolio-contact',
        }),
      });

      if (!response.ok) {
        return res.status(502).json({
          error: 'Unable to deliver message. Please try email or WhatsApp.',
        });
      }
    } catch {
      return res.status(502).json({
        error: 'Unable to deliver message. Please try email or WhatsApp.',
      });
    }
  }

  return res.status(200).json({
    ok: true,
    message: webhook
      ? 'Message sent successfully.'
      : 'Message received. Configure CONTACT_WEBHOOK_URL for email delivery.',
  });
}
