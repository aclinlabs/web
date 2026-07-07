import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendFormEmail({
  subject,
  fields,
  replyTo,
  attachments,
}: {
  subject: string;
  fields: { label: string; value: string }[];
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}) {
  const html = `
    <table style="font-family: Arial, sans-serif; font-size: 14px; border-collapse: collapse;">
      ${fields
        .filter((f) => f.value)
        .map(
          (f) => `
        <tr>
          <td style="padding: 6px 12px; font-weight: bold; color: #087849; vertical-align: top;">${f.label}</td>
          <td style="padding: 6px 12px; white-space: pre-line;">${f.value}</td>
        </tr>`
        )
        .join("")}
    </table>
  `;

  await getTransporter().sendMail({
    from: `"Sitio web Aclin" <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO,
    replyTo,
    subject,
    html,
    attachments,
  });
}
