import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('A valid email is required'),
  occupation: z.string().optional(),
  organization: z.string().optional(),
  purpose: z.string().optional(),
  message: z.string().min(1, 'Message cannot be empty'),
  bot_field: z.string().optional(),
});

// Simple in-memory rate limiter (Note: state resets on serverless cold starts)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (now - record.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  record.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      const firstIssue = result.error.issues?.[0];
      const errorMsg = firstIssue ? firstIssue.message : 'Invalid input data';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, occupation, organization, purpose, message, bot_field } = result.data;

    // Anti-spam Honeypot Check
    if (bot_field) {
      return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
    }

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.warn("SMTP credentials not configured. Returning success for demonstration.");
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json(
        { message: 'Message "sent" successfully (SMTP not configured)' },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const sanitizeOpts = { allowedTags: [], allowedAttributes: {} };
    const safeName = sanitizeHtml(name.trim(), sanitizeOpts);
    const safeEmail = sanitizeHtml(email.trim(), sanitizeOpts);
    const safeOccupation = sanitizeHtml(occupation?.trim() || 'Not specified', sanitizeOpts);
    const safeOrganization = sanitizeHtml(organization?.trim() || 'Not specified', sanitizeOpts);
    const safePurpose = sanitizeHtml(purpose?.trim() || 'Not specified', sanitizeOpts);
    
    let safeMessage = sanitizeHtml(message.trim(), { 
      allowedTags: ['b', 'i', 'em', 'strong', 'br'],
      allowedAttributes: {}
    });
    safeMessage = safeMessage.replace(/\n/g, '<br/>');

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-w-2xl; margin: 0 auto; padding: 20px; background-color: #f9f9f9; color: #333;">
        <div style="background-color: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
          <h2 style="margin-top: 0; color: #111; font-size: 24px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;">
            New Portfolio Transmission 🚀
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; width: 120px;"><strong>Name</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 500;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666;"><strong>Email</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${safeEmail}" style="color: #0066cc; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666;"><strong>Occupation</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${safeOccupation}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666;"><strong>Organization</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${safeOrganization}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666;"><strong>Purpose</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${safePurpose}</td>
            </tr>
          </table>

          <h3 style="color: #444; font-size: 16px; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; font-size: 15px; line-height: 1.6; border-left: 4px solid #333;">
            ${safeMessage}
          </div>
          
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
            This email was automatically generated from your portfolio contact form.
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      replyTo: safeEmail,
      subject: `Portfolio Inquiry from ${safeName}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
