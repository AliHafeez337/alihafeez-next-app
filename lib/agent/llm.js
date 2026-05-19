import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import { TOOL_DECLARATIONS, runTool } from '@/lib/agent/tools';
import {
  extractLeakedFunctionNames,
  stripLeakedFunctionSyntax,
  polishReplyTone,
  appendToolLinks,
} from '@/lib/agent/sanitizeReply';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

function toGeminiTools() {
  return [
    {
      functionDeclarations: TOOL_DECLARATIONS.map((t) => ({
        name: t.name,
        description: t.description,
        parameters: t.parameters,
      })),
    },
  ];
}

function toGroqTools() {
  return TOOL_DECLARATIONS.map((t) => ({
    type: 'function',
    function: {
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    },
  }));
}

function mapHistoryForGemini(history) {
  return (history || []).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
}

function getGeminiFunctionCalls(response) {
  if (typeof response?.response?.functionCalls === 'function') {
    return response.response.functionCalls() || [];
  }

  const parts = response?.response?.candidates?.[0]?.content?.parts || [];
  return parts
    .filter((p) => p.functionCall)
    .map((p) => ({
      name: p.functionCall.name,
      args: p.functionCall.args || {},
    }));
}

function getGeminiRawText(response) {
  const parts = response?.response?.candidates?.[0]?.content?.parts || [];
  return parts
    .filter((p) => p.text)
    .map((p) => p.text)
    .join('')
    .trim();
}

function getGeminiText(response) {
  try {
    const text = response?.response?.text?.();
    if (text) return text;
  } catch {
    // text() throws when the turn is only function calls
  }
  return getGeminiRawText(response);
}

function collectCallsFromResponse(response) {
  const structured = getGeminiFunctionCalls(response);
  if (structured.length) return structured;

  const raw = getGeminiRawText(response);
  const leaked = extractLeakedFunctionNames(raw);
  return leaked.map((name) => ({ name, args: {} }));
}

async function chatWithGemini({ systemPrompt, history, userMessage }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    tools: toGeminiTools(),
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: mapHistoryForGemini(history),
  });

  let response = await chat.sendMessage(userMessage);
  let rounds = 0;
  const toolResults = [];

  while (rounds < 5) {
    const calls = collectCallsFromResponse(response);
    if (!calls.length) break;

    const functionResponses = calls.map((call) => {
      const result = runTool(call.name, call.args || {});
      toolResults.push(result);
      return {
        functionResponse: {
          name: call.name,
          response: result,
        },
      };
    });

    response = await chat.sendMessage(functionResponses);
    rounds += 1;
  }

  let text = stripLeakedFunctionSyntax(getGeminiText(response) || '');

  if (!text && toolResults.length) {
    text =
      'Here are the best ways to reach me directly.';
  }

  text = polishReplyTone(appendToolLinks(text, toolResults));

  if (text) return text;

  return 'I had trouble forming a reply. Please try rephrasing your question about my work or education.';
}

async function chatWithGroq({ systemPrompt, history, userMessage }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not set');

  const groq = new Groq({ apiKey });
  const messages = [
    { role: 'system', content: systemPrompt },
    ...(history || []).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    { role: 'user', content: userMessage },
  ];

  const toolResults = [];
  let rounds = 0;

  while (rounds < 5) {
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages,
      tools: toGroqTools(),
      tool_choice: 'auto',
    });

    const choice = completion.choices[0];
    const message = choice.message;

    if (choice.finish_reason !== 'tool_calls' || !message.tool_calls?.length) {
      let text = polishReplyTone(
        stripLeakedFunctionSyntax(message.content || '')
      );
      text = appendToolLinks(text, toolResults);
      return text;
    }

    messages.push(message);

    for (const toolCall of message.tool_calls) {
      const args = JSON.parse(toolCall.function.arguments || '{}');
      const result = runTool(toolCall.function.name, args);
      toolResults.push(result);
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }

    rounds += 1;
  }

  return 'Sorry, I could not complete that request. Please try again.';
}

export async function generateChatReply({ systemPrompt, history, userMessage }) {
  const provider = (process.env.LLM_PROVIDER || 'gemini').toLowerCase();

  try {
    if (provider === 'groq') {
      return await chatWithGroq({ systemPrompt, history, userMessage });
    }
    return await chatWithGemini({ systemPrompt, history, userMessage });
  } catch (primaryError) {
    if (provider === 'gemini' && process.env.GROQ_API_KEY) {
      return chatWithGroq({ systemPrompt, history, userMessage });
    }
    if (provider === 'groq' && process.env.GEMINI_API_KEY) {
      return chatWithGemini({ systemPrompt, history, userMessage });
    }
    throw primaryError;
  }
}
