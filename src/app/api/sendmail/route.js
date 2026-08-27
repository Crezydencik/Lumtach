import { NextResponse } from 'next/server';
import { z } from 'zod';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map();

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120, 'Name is too long'),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?[0-9]{1,4})?[0-9]{8,15}$/, 'Invalid phone number'),
  email: z.string().trim().email('Invalid email address'),
  message: z.string().trim().min(1, 'Message is required').max(5000, 'Message is too long'),
});

function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const recentRequests = (requestLog.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return false;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildEmailHtml({ name, phone, email, message }) {
  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

  return `
    <div style="margin:0;padding:32px 16px;font-family:Arial,sans-serif;color:#ffffff;">
      <div style="max-width:640px;margin:0 auto;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;background:#111114;">
        <div style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.08);background:linear-gradient(180deg,#131318 0%,#111114 100%);">
          <div style="font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#a6eb53;margin-bottom:14px;">Lumtach Contact Form</div>
          <div style="font-size:32px;line-height:1.15;font-weight:700;color:#ffffff;margin:0 0 10px;">New project inquiry</div>
          <div style="font-size:15px;line-height:1.6;color:rgba(255,255,255,0.68);margin:0;">
            A new message has arrived from the website contact form.
          </div>
        </div>

        <div style="padding:32px;">
          <div style="margin-bottom:24px;padding:24px;border:1px solid rgba(255,255,255,0.08);border-radius:20px;background:#0d0d11;">
            <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#a6eb53;margin-bottom:18px;">Contact details</div>
            <table role="presentation" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:0 0 12px;vertical-align:top;font-size:13px;color:rgba(255,255,255,0.45);width:120px;">Name</td>
                <td style="padding:0 0 12px;vertical-align:top;font-size:16px;color:#ffffff;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:0 0 12px;vertical-align:top;font-size:13px;color:rgba(255,255,255,0.45);width:120px;">Phone</td>
                <td style="padding:0 0 12px;vertical-align:top;font-size:16px;color:#ffffff;">${safePhone}</td>
              </tr>
              <tr>
                <td style="padding:0;vertical-align:top;font-size:13px;color:rgba(255,255,255,0.45);width:120px;">Email</td>
                <td style="padding:0;vertical-align:top;font-size:16px;">
                  <a href="mailto:${safeEmail}" style="color:#a6eb53;text-decoration:none;">${safeEmail}</a>
                </td>
              </tr>
            </table>
          </div>

          <div style="padding:24px;border:1px solid rgba(255,255,255,0.08);border-radius:20px;background:#0d0d11;">
            <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#a6eb53;margin-bottom:16px;">Message</div>
            <div style="font-size:16px;line-height:1.75;color:#ffffff;">${safeMessage}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const ip = getClientIp(request);

  if (typeof body?.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return NextResponse.json(
      {
        error: 'Please check the form fields.',
        fieldErrors: {
          name: fieldErrors.name?.[0],
          phone: fieldErrors.phone?.[0],
          email: fieldErrors.email?.[0],
          message: fieldErrors.message?.[0],
        },
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: 'Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL.' },
      { status: 500 }
    );
  }

  const { name, phone, email, message } = parsed.data;
  const html = buildEmailHtml({ name, phone, email, message });
  const text = `LUMTACH CONTACT FORM\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`;

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Lumtach inquiry from ${name}`,
      html,
      text,
    }),
    cache: 'no-store',
  });

  const resendPayload = await resendResponse.json().catch(() => null);

  if (!resendResponse.ok) {
    return NextResponse.json(
      { error: resendPayload?.message || 'Failed to send email.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
