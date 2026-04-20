import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, role, email } = await req.json();

    // Validate required fields
    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BLAND_AI_API_KEY;
    const agentId = process.env.BLAND_AI_AGENT_ID; // optional: use a pre-built agent

    if (!apiKey || apiKey === 'your_bland_ai_api_key_here') {
      console.error('❌ BLAND_AI_API_KEY is missing or still set to placeholder. Please add your real key to .env.local');
      return NextResponse.json(
        { error: 'Call service not configured. Please contact us directly.' },
        { status: 500 }
      );
    }

    // Build the request body for Bland AI
    const task = `You are a friendly AI strategy consultant for Webpagix, a growing AI automation and web development startup. 
You are calling ${name || 'a potential client'} who is a ${role || 'business owner'} ${email ? `(email: ${email})` : ''}.
Start by greeting them by name, briefly introduce Webpagix, and ask about their biggest digital challenge right now.
Keep the conversation warm, concise, and helpful. Offer to schedule a follow-up with the human team if they show interest.`;

    const blandPayload: Record<string, unknown> = {
      phone_number: phone,
      task,                       // always required by Bland AI
      voice: 'maya',
      language: 'en',
      max_duration: 5,            // minutes
      answered_by_enabled: true,
      wait_for_greeting: true,
      record: true,
      metadata: {
        name: name || '',
        email: email || '',
        role: role || '',
        source: 'webpagix-cta',
      },
    };

    // If a pre-built agent is configured, add it alongside task (Bland AI still requires task)
    if (agentId) {
      blandPayload.agent_id = agentId;
      blandPayload.request_data = {
        name: name || 'there',
        role: role || 'business owner',
        email: email || '',
      };
    }

    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: apiKey,
      },
      body: JSON.stringify(blandPayload),
    });

    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      const errMsg = data.message || data.error || 'Bland AI call failed.';
      console.error('❌ Bland AI error:', errMsg);
      return NextResponse.json({ error: errMsg }, { status: 500 });
    }

    console.log(`✅ Bland AI call initiated: ${data.call_id} → ${phone}`);

    return NextResponse.json({
      success: true,
      callId: data.call_id,
      message: 'Call initiated successfully.',
    });
  } catch (err: unknown) {
    console.error('❌ Failed to initiate Bland AI call:', err);
    const message =
      err instanceof Error ? err.message : 'Failed to initiate call.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
