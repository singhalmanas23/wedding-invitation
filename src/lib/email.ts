import nodemailer from "nodemailer";

/**
 * RSVP notification email.
 * Set env: SMTP_USER (your email), SMTP_APP_PASSWORD (app password), RSVP_NOTIFY_EMAIL (recipient for all RSVPs).
 * Gmail: use an App Password from https://myaccount.google.com/apppasswords
 */
function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user, pass },
  });
}

export interface RsvpPayload {
  name: string;
  email: string;
  phone?: string;
  attending: string;
  eventsAttending?: string[];
  dietaryRestrictions?: string;
  plusOne?: boolean;
  plusOneName?: string;
  notes?: string;
  isUpdate?: boolean;
}

export async function sendRsvpNotification(payload: RsvpPayload): Promise<boolean> {
  const to = process.env.RSVP_NOTIFY_EMAIL;
  if (!to) {
    console.warn("RSVP email skip: RSVP_NOTIFY_EMAIL not set");
    return false;
  }

  const transporter = getTransporter();
  if (!transporter) {
    console.warn("RSVP email skip: SMTP_USER or SMTP_APP_PASSWORD not set");
    return false;
  }

  const subject = payload.isUpdate
    ? `RSVP Updated: ${payload.name}`
    : `New RSVP: ${payload.name}`;

  const eventsList = Array.isArray(payload.eventsAttending) && payload.eventsAttending.length > 0
    ? payload.eventsAttending.join(", ")
    : "—";

  const html = `
    <h2>${payload.isUpdate ? "Updated" : "New"} RSVP</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone || "—"}</p>
    <p><strong>Attending:</strong> ${payload.attending}</p>
    <p><strong>Events:</strong> ${eventsList}</p>
    <p><strong>Dietary:</strong> ${payload.dietaryRestrictions || "—"}</p>
    <p><strong>Plus one:</strong> ${payload.plusOne ? "Yes" : "No"}${payload.plusOneName ? ` (${payload.plusOneName})` : ""}</p>
    ${payload.notes ? `<p><strong>Notes:</strong> ${payload.notes}</p>` : ""}
    <p><em>Sent at ${new Date().toISOString()}</em></p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error("RSVP notification email error:", err);
    return false;
  }
}
