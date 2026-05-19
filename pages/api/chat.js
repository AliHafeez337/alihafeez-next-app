import { z } from 'zod';
import { validateChatRequest } from '@/lib/security/requestGate';
import { checkChatRateLimit } from '@/lib/security/rateLimit';
import { logSecurityConcern } from '@/lib/security/securityLog';
import {
  retrieveContext,
  formatContextForPrompt,
} from '@/lib/rag/retriever';
import { buildSystemPrompt } from '@/lib/agent/systemPrompt';
import { generateChatReply } from '@/lib/agent/llm';

const bodySchema = z.object({
  message: z.string(),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })
    )
    .optional()
    .default([]),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GEMINI_API_KEY && !process.env.GROQ_API_KEY) {
    return res.status(503).json({
      error: 'Chat is not configured. Add GEMINI_API_KEY or GROQ_API_KEY.',
    });
  }

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const { message, history } = parsed.data;

  const rate = await checkChatRateLimit(req);
  if (!rate.ok) {
    return res.status(429).json({ error: rate.userMessage });
  }

  const gate = validateChatRequest({ message, history });
  if (!gate.ok) {
    if (gate.code === 'blocked_content' || gate.code === 'off_topic') {
      await logSecurityConcern({
        req,
        reason: gate.code,
        snippet: message,
      });
    }
    return res.status(403).json({ error: gate.userMessage, code: gate.code });
  }

  try {
    const { chunks, lowConfidence } = await retrieveContext(message);
    const contextBlock = formatContextForPrompt(chunks);
    const systemPrompt = buildSystemPrompt({ contextBlock, lowConfidence });

    const reply = await generateChatReply({
      systemPrompt,
      history,
      userMessage: message,
    });

    const sources = chunks.map((c) => ({
      file: c.meta?.file,
      section: c.meta?.section,
    }));

    return res.status(200).json({ reply, sources, lowConfidence });
  } catch (err) {
    console.error('chat api error', err);
    return res.status(500).json({
      error: 'Something went wrong. Please try again in a moment.',
    });
  }
}
