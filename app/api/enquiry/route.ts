import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { EnquirySubmission } from '@/lib/types';

const ENQUIRIES_FILE = path.join(process.cwd(), 'data', 'enquiries.json');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, city, teamOrDesign, quantity, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter a valid full name.' }, { status: 400 });
    }

    const cleanPhone = (phone || '').replace(/[^\d+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit phone number.' }, { status: 400 });
    }

    const parsedQty = parseInt(quantity, 10);
    if (isNaN(parsedQty) || parsedQty < 1) {
      return NextResponse.json({ error: 'Please enter a valid quantity of jerseys (minimum 1).' }, { status: 400 });
    }

    const newEnquiry: EnquirySubmission = {
      id: `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: name.trim(),
      phone: cleanPhone,
      city: (city || '').trim(),
      teamOrDesign: (teamOrDesign || '').trim(),
      quantity: parsedQty,
      message: (message || '').trim(),
      submittedAt: new Date().toISOString(),
    };

    // Store in JSON file (SQLite-compatible schema)
    let enquiries: EnquirySubmission[] = [];
    if (fs.existsSync(ENQUIRIES_FILE)) {
      try {
        const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
        enquiries = JSON.parse(raw);
      } catch (_err) {
        enquiries = [];
      }
    }
    enquiries.unshift(newEnquiry);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');

    // Optional webhook forwarding
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEnquiry),
        });
      } catch (webhookErr) {
        console.warn('Webhook forwarding failed:', webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been received! Our Mahe team will contact you on WhatsApp/phone shortly.',
        enquiryId: newEnquiry.id,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('Enquiry API Error:', err);
    return NextResponse.json({ error: 'Failed to process enquiry. Please try again or WhatsApp us directly.' }, { status: 500 });
  }
}
