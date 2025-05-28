import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, email, company, message } = body;

  // Validate required fields
  if (!fullName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  try {
    // Send Emails via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.DABIBLE_GMAIL_ADDRESS,
        pass: process.env.DABIBLE_GMAIL_PASSWORD,
      },
    });

    const adminMail = {
      from: `"Contact Form" <${process.env.DABIBLE_GMAIL_ADDRESS}>`,
      to: process.env.DABIBLE_ADMIN_EMAIL,
      subject: `New Contact from ${fullName}`,
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    const userMail = {
      from: `"Your Website" <${process.env.DABIBLE_GMAIL_ADDRESS}>`,
      to: email,
      subject: 'Thanks for contacting us!',
      html: `
        <p>Hi ${fullName},</p>
        <p>Thanks for your message. Here’s what you submitted:</p>
        <blockquote>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        </blockquote>
        <p>We’ll be in touch soon.</p>
        <p>— Your Team</p>
      `,
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 500 });
  }
}
 