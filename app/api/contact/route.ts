import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import { contactSubmissions } from "@/lib/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  referralSource?: unknown;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = clean(body.name);
    const email = clean(body.email);
    const message = clean(body.message);
    const referralSource = clean(body.referralSource);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await getDb().insert(contactSubmissions).values({
      name,
      email,
      message,
      referralSource: referralSource || null,
    });

    await sendContactNotification({
      name,
      email,
      message,
      referralSource: referralSource || null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed", error);

    return NextResponse.json(
      { error: "We could not submit your message. Please try again later." },
      { status: 500 }
    );
  }
}
