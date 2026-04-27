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

    const { VAPI_API_KEY, VAPI_ASSISTANT_ID, VAPI_PHONE_NUMBER_ID } = process.env;

    if (!VAPI_API_KEY || !VAPI_ASSISTANT_ID || !VAPI_PHONE_NUMBER_ID) {
      console.error('❌ Vapi credentials missing. Please add VAPI_API_KEY, VAPI_ASSISTANT_ID, and VAPI_PHONE_NUMBER_ID to .env.local');
      return NextResponse.json(
        { error: 'Call service not configured. Please contact us directly.' },
        { status: 500 }
      );
    }

    const payload = {
      assistantId: VAPI_ASSISTANT_ID,
      phoneNumberId: VAPI_PHONE_NUMBER_ID,
      customer: {
        number: phone,
        name: name || undefined,
      },
    };

    // Send the data to Vapi
    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`❌ Vapi Webhook error: ${response.status} ${response.statusText}`, errorData);
      return NextResponse.json({ error: 'Failed to initiate call.' }, { status: 500 });
    }

    console.log(`✅ Vapi call initiated for → ${phone}`);

    return NextResponse.json({
      success: true,
      message: 'Request received successfully. Our agent will call you shortly.',
    });
  } catch (err: unknown) {
    console.error('❌ Failed to trigger Vapi call:', err);
    const message =
      err instanceof Error ? err.message : 'Failed to process request.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
