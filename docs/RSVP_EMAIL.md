# RSVP email notifications (Nodemailer)

Every RSVP submission (new or updated) is sent as an email to one address.

## Environment variables

Add these to `.env.local` (and to your host’s env, e.g. Vercel):

| Variable | Description |
|----------|-------------|
| `SMTP_USER` | Your email (e.g. Gmail address). |
| `SMTP_APP_PASSWORD` | App password for that account (not your normal password). |
| `RSVP_NOTIFY_EMAIL` | Email where **all** RSVP responses are sent (can be same as `SMTP_USER`). |

Optional:

| Variable | Default | Description |
|----------|---------|-------------|
| `SMTP_HOST` | `smtp.gmail.com` | Use for other providers (e.g. Outlook). |
| `SMTP_PORT` | `587` | SMTP port. |
| `SMTP_FROM` | same as `SMTP_USER` | “From” address shown in the notification email. |

## Gmail

1. Turn on 2-Step Verification for your Google account.
2. Go to [App passwords](https://myaccount.google.com/apppasswords).
3. Create an app password and use it as `SMTP_APP_PASSWORD`.

## Other providers

- **Outlook / Microsoft 365:** `SMTP_HOST=smtp.office365.com`, port 587, use your Microsoft account and an app password if required.
- **Yahoo:** `SMTP_HOST=smtp.mail.yahoo.com`, use an app password.

If any of these env vars are missing, RSVPs are still saved to the database; only the notification email is skipped.
