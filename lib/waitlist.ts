export type WaitlistResult = { ok: true } | { ok: false; error: string };

export async function submitWaitlist(email: string): Promise<WaitlistResult> {
  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) return { ok: true };

    const body = await res.json().catch(() => null);
    return { ok: false, error: body?.error ?? 'unknown_error' };
  } catch {
    return { ok: false, error: 'network_error' };
  }
}
