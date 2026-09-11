import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_LIST_ID = 3;

export async function POST(request: Request) {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'invalid_request', message: 'Invalid request.' },
      { status: 400 }
    );
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'invalid_email', message: 'Invalid email address.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY is not configured');
    return NextResponse.json(
      { error: 'server_misconfigured', message: 'Service temporarily unavailable.' },
      { status: 500 }
    );
  }

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true, // an already-registered email gets added to the list instead of erroring
      }),
    });

    // 201 = new contact created, 204 = existing contact updated (already on the list)
    if (brevoRes.status === 201 || brevoRes.status === 204) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const errorBody = await brevoRes.json().catch(() => null);
    console.error('Brevo API error', brevoRes.status, errorBody);
    return NextResponse.json(
      { error: 'brevo_error', message: "Couldn't save your email right now. Please try again later." },
      { status: 502 }
    );
  } catch (err) {
    console.error('Brevo request failed', err);
    return NextResponse.json(
      { error: 'network_error', message: "Couldn't save your email right now. Please try again later." },
      { status: 502 }
    );
  }
}
