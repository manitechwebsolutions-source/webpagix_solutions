import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body;

    // Basic server-side validation
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!toEmail || !fromEmail) {
      console.error('CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set');
      return NextResponse.json({ error: 'Email service not configured properly.' }, { status: 500 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
    }
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: `Webpagix Contact <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[Webpagix] New enquiry from ${name} — ${service}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Contact Form Submission</title>
          </head>
          <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="background:linear-gradient(135deg,#0FADA8 0%,#0d8f8a 100%);padding:36px 40px;">
                        <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                          🚀 New Contact Form Submission
                        </h1>
                        <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">
                          Someone wants to work with Webpagix!
                        </p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:36px 40px;">

                        <!-- Field rows -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:0 0 20px 0;">
                              <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Full Name</p>
                              <p style="margin:0;font-size:16px;font-weight:600;color:#111827;">${name}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:0 0 20px 0;border-top:1px solid #f0f0f0;padding-top:20px;">
                              <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Email</p>
                              <a href="mailto:${email}" style="margin:0;font-size:16px;font-weight:600;color:#0FADA8;text-decoration:none;">${email}</a>
                            </td>
                          </tr>
                          ${
                            company
                              ? `<tr>
                            <td style="padding:0 0 20px 0;border-top:1px solid #f0f0f0;padding-top:20px;">
                              <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Company</p>
                              <p style="margin:0;font-size:16px;font-weight:600;color:#111827;">${company}</p>
                            </td>
                          </tr>`
                              : ''
                          }
                          <tr>
                            <td style="padding:0 0 20px 0;border-top:1px solid #f0f0f0;padding-top:20px;">
                              <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Service Requested</p>
                              <span style="display:inline-block;background:#E6FAFA;color:#0FADA8;font-size:13px;font-weight:700;padding:4px 12px;border-radius:20px;">${service}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="border-top:1px solid #f0f0f0;padding-top:20px;">
                              <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Message</p>
                              <div style="background:#f9fafb;border-left:4px solid #0FADA8;border-radius:0 8px 8px 0;padding:16px 20px;">
                                <p style="margin:0;font-size:15px;line-height:1.7;color:#374151;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                              </div>
                            </td>
                          </tr>
                        </table>

                        <!-- CTA -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                          <tr>
                            <td align="center">
                              <a href="mailto:${email}?subject=Re: Your enquiry to Webpagix"
                                style="display:inline-block;background:linear-gradient(135deg,#0FADA8,#0d8f8a);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 32px;border-radius:50px;">
                                Reply to ${name} →
                              </a>
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
                        <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                          This email was sent from the contact form at <strong>webpagix.ai</strong>
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
