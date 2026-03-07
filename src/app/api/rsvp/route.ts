import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { sendRsvpNotification } from "@/lib/email";
import Rsvp from "@/models/Rsvp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, phone, attending, eventsAttending, dietaryRestrictions, plusOne, plusOneName, notes } = body;

    if (!name || !email || !attending) {
      return NextResponse.json(
        { error: "Name, email, and attendance status are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await Rsvp.findOne({ email: email.toLowerCase() });

    if (existing) {
      existing.name = name;
      existing.phone = phone || "";
      existing.attending = attending;
      existing.eventsAttending = eventsAttending || [];
      existing.dietaryRestrictions = dietaryRestrictions || "";
      existing.plusOne = plusOne || false;
      existing.plusOneName = plusOneName || "";
      existing.notes = notes || "";
      existing.submittedAt = new Date();
      await existing.save();

      sendRsvpNotification({
        name,
        email,
        phone,
        attending,
        eventsAttending,
        dietaryRestrictions,
        plusOne,
        plusOneName,
        notes,
        isUpdate: true,
      }).catch(() => {});

      return NextResponse.json(
        { message: "RSVP updated successfully", rsvp: existing },
        { status: 200 }
      );
    }

    const rsvp = await Rsvp.create({
      name,
      email,
      phone: phone || "",
      attending,
      eventsAttending: eventsAttending || [],
      dietaryRestrictions: dietaryRestrictions || "",
      plusOne: plusOne || false,
      plusOneName: plusOneName || "",
      notes: notes || "",
    });

    sendRsvpNotification({
      name,
      email,
      phone,
      attending,
      eventsAttending,
      dietaryRestrictions,
      plusOne,
      plusOneName,
      notes,
      isUpdate: false,
    }).catch(() => {});

    return NextResponse.json(
      { message: "RSVP submitted successfully", rsvp },
      { status: 201 }
    );
  } catch (error) {
    console.error("RSVP submission error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to submit RSVP: ${message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const rsvps = await Rsvp.find().sort({ submittedAt: -1 }).lean();
    return NextResponse.json({ rsvps }, { status: 200 });
  } catch (error) {
    console.error("RSVP fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVPs" },
      { status: 500 }
    );
  }
}
