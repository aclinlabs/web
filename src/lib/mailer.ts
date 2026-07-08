import MailComposer from "nodemailer/lib/mail-composer";
import { google } from "googleapis";

function getGmailClient() {
  const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return google.gmail({ version: "v1", auth });
}

async function buildRawMessage(opts: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  attachments?: { filename: string; content: Buffer }[];
}) {
  const mail = new MailComposer(opts);
  const message = await mail.compile().build();
  return message.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
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

  const raw = await buildRawMessage({
    from: `"Sitio web Aclin" <${process.env.GMAIL_SENDER}>`,
    to: process.env.MAIL_TO!,
    replyTo,
    subject,
    html,
    attachments,
  });

  await getGmailClient().users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}
