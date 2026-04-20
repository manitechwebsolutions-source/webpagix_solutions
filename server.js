/**
 * server.js — Custom Next.js server with WebSocket support
 *
 * WHY THIS FILE EXISTS:
 * Twilio Media Streams require a WebSocket endpoint (/media-stream).
 * Standard Next.js API routes don't support raw WebSockets, so we use
 * a custom HTTP/WS server that also serves the Next.js app.
 *
 * HOW TO RUN:
 *   Development : node server.js          (or npm run dev:server)
 *   Production  : node server.js          (after `npm run build`)
 *
 * ARCHITECTURE:
 *   Browser form → POST /api/request-call → Twilio dials visitor
 *   Visitor picks up → Twilio calls POST /api/twilio/voice → TwiML returned
 *   TwiML opens WS to /media-stream on this server
 *   This server bridges audio: Twilio ↔ OpenAI Realtime API
 *   OpenAI Realtime sends AI voice back → Twilio plays to visitor
 */

require('dotenv').config({ path: '.env.local' });

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocket = require('ws');
const OpenAI = require('openai').default;

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev });
const handle = app.getRequestHandler();

// ── OpenAI Realtime model ──────────────────────────────────────────────────
const OPENAI_MODEL = 'gpt-4o-realtime-preview-2024-10-01';

// ── AI Agent System Prompt ─────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Alex, a strategic AI assistant at Webpagix — a premium AI automation and web development agency. 

Your goal is to have a warm, professional conversation with the caller to:
1. Understand their business and current challenges
2. Learn what they want to build or automate
3. Understand their timeline and budget range
4. Position Webpagix as the ideal partner

Keep responses concise (under 3 sentences each). Be conversational, friendly, and genuinely curious. 
Do not use filler phrases like "Certainly!" or "Absolutely!".
Listen carefully and ask follow-up questions.
After 3-4 exchanges, wrap up by saying the human team will follow up within 24 hours with a tailored proposal.`;

// ── Twilio audio format ────────────────────────────────────────────────────
const TWILIO_SAMPLE_RATE = 8000; // Twilio uses 8kHz mulaw

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // ── WebSocket Server ───────────────────────────────────────────────────
  const wss = new WebSocket.Server({ server, path: '/media-stream' });

  wss.on('connection', async (twilioWs, req) => {
    console.log('🔗 Twilio connected to /media-stream');

    // Parse caller context from query params (set in TwiML)
    const url = new URL(req.url, `http://localhost:${port}`);
    const callerName = url.searchParams.get('name') || 'there';
    const callerRole = url.searchParams.get('role') || 'business owner';

    let streamSid = null;
    let openaiWs = null;
    let isOpenAIReady = false;
    const audioQueue = [];

    // ── Connect to OpenAI Realtime API ──────────────────────────────────
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      openaiWs = new WebSocket(
        `wss://api.openai.com/v1/realtime?model=${OPENAI_MODEL}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'OpenAI-Beta': 'realtime=v1',
          },
        }
      );

      openaiWs.on('open', () => {
        console.log('✅ Connected to OpenAI Realtime API');

        // Configure the session
        openaiWs.send(
          JSON.stringify({
            type: 'session.update',
            session: {
              turn_detection: { type: 'server_vad' },
              input_audio_format: 'g711_ulaw',
              output_audio_format: 'g711_ulaw',
              input_audio_transcription: { model: 'whisper-1' },
              voice: 'alloy',
              instructions: `${SYSTEM_PROMPT}\n\nYou are speaking with ${callerName}, who is a ${callerRole}.`,
              modalities: ['text', 'audio'],
              temperature: 0.8,
            },
          })
        );

        isOpenAIReady = true;

        // Flush queued audio
        while (audioQueue.length > 0) {
          openaiWs.send(audioQueue.shift());
        }
      });

      // ── OpenAI → Twilio (AI voice back to caller) ────────────────────
      openaiWs.on('message', (data) => {
        try {
          const event = JSON.parse(data.toString());

          if (event.type === 'response.audio.delta' && event.delta) {
            // Forward AI audio chunk to Twilio
            if (streamSid && twilioWs.readyState === WebSocket.OPEN) {
              const twilioMsg = JSON.stringify({
                event: 'media',
                streamSid,
                media: { payload: event.delta },
              });
              twilioWs.send(twilioMsg);
            }
          }

          if (event.type === 'response.audio_transcript.done') {
            console.log('🤖 AI said:', event.transcript);
          }

          if (event.type === 'conversation.item.input_audio_transcription.completed') {
            console.log('👤 Caller said:', event.transcript);
          }

          if (event.type === 'error') {
            console.error('❌ OpenAI error:', event.error);
          }
        } catch (e) {
          console.error('Failed to parse OpenAI message:', e);
        }
      });

      openaiWs.on('error', (err) => {
        console.error('❌ OpenAI WebSocket error:', err.message);
      });

      openaiWs.on('close', () => {
        console.log('OpenAI WebSocket closed');
      });
    } catch (err) {
      console.error('❌ Failed to connect to OpenAI:', err);
    }

    // ── Twilio → OpenAI (caller's voice to AI) ──────────────────────────
    twilioWs.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());

        switch (msg.event) {
          case 'start':
            streamSid = msg.start.streamSid;
            console.log(`📞 Call stream started: ${streamSid}`);
            break;

          case 'media':
            // Forward caller's audio to OpenAI
            if (msg.media?.payload) {
              const audioMsg = JSON.stringify({
                type: 'input_audio_buffer.append',
                audio: msg.media.payload,
              });

              if (isOpenAIReady && openaiWs?.readyState === WebSocket.OPEN) {
                openaiWs.send(audioMsg);
              } else {
                audioQueue.push(audioMsg);
              }
            }
            break;

          case 'stop':
            console.log('📵 Call stream stopped');
            break;
        }
      } catch (e) {
        console.error('Failed to parse Twilio message:', e);
      }
    });

    twilioWs.on('close', () => {
      console.log('🔌 Twilio disconnected from /media-stream');
      if (openaiWs) openaiWs.close();
    });

    twilioWs.on('error', (err) => {
      console.error('❌ Twilio WebSocket error:', err.message);
    });
  });

  server.listen(port, () => {
    console.log(`\n🚀 Webpagix server running on http://localhost:${port}`);
    console.log(`🤖 AI WebSocket bridge active at ws://localhost:${port}/media-stream`);
    console.log(`📞 Twilio webhook: ${process.env.NEXT_PUBLIC_BASE_URL}/api/twilio/voice\n`);
  });
});
