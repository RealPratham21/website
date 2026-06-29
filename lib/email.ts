import nodemailer from "nodemailer";

type ContactNotification = {
  name: string;
  email: string;
  message: string;
  referralSource?: string | null;
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP configuration is incomplete");
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactNotification(data: ContactNotification) {
  const to = process.env.NOTIFICATION_EMAIL;
  const from = process.env.SMTP_USER;

  if (!to || !from) {
    throw new Error("Notification email configuration is incomplete");
  }

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br />");
  const safeReferral = escapeHtml(data.referralSource || "Not provided");

  await getTransporter().sendMail({
    from: `"Arealis Contact" <${from}>`,
    to,
    replyTo: data.email,
    subject: `New Arealis contact request from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New contact form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Referral Source:</strong> ${safeReferral}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `,
  });
}
