import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// import { appendToSheet } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, email, company, message } = body;

  // Validate required fields
  if (!fullName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  try {
    // Store in Google Sheet
    // await appendToSheet({ fullName, email, company, message });

    // Send Emails via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const adminMail = {
      from: `"Contact Form" <${process.env.EMAIL_USERNAME}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact from ${fullName}`,
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    const userMail = {
      from: `"Your Website" <${process.env.EMAIL_USERNAME}>`,
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
 