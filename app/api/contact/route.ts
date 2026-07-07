import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, occupation, organization, purpose, message } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    // Check if credentials exist
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.warn("SMTP credentials not configured. Returning success for demonstration.");
      // Add a slight delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json(
        { message: 'Message "sent" successfully (SMTP not configured)' },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Standard configuration for Gmail
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeOccupation = occupation?.trim() || 'Not specified';
    const safeOrganization = organization?.trim() || 'Not specified';
    const safePurpose = purpose?.trim() || 'Not specified';
    const safeMessage = message.trim().replace(/\n/g, '<br/>');

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
      to: process.env.SMTP_EMAIL, // Send to yourself
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
