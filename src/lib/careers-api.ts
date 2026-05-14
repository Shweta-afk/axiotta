import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export interface ApplicationPayload {
  name: string;
  email: string;
  phone: string;
  position: string;
  linkedin?: string;
  message: string;
  resumeBase64?: string;
  resumeName?: string;
  resumeMime?: string;
}

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: ApplicationPayload) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Email service not configured. Please set RESEND_API_KEY.");
    }

    const resend = new Resend(apiKey);

    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
    if (data.resumeBase64 && data.resumeName && data.resumeMime) {
      attachments.push({
        filename: data.resumeName,
        content: Buffer.from(data.resumeBase64, "base64"),
        contentType: data.resumeMime,
      });
    }

    const html = `
      <h2 style="color:#1a1a2e">New Job Application — Axiotta</h2>
      <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="color:#666;width:140px"><b>Name</b></td><td>${data.name}</td></tr>
        <tr><td style="color:#666"><b>Email</b></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="color:#666"><b>Phone</b></td><td>${data.phone}</td></tr>
        <tr><td style="color:#666"><b>Position</b></td><td>${data.position}</td></tr>
        ${data.linkedin ? `<tr><td style="color:#666"><b>LinkedIn/Portfolio</b></td><td><a href="${data.linkedin}">${data.linkedin}</a></td></tr>` : ""}
        <tr><td style="color:#666;vertical-align:top"><b>Cover Letter</b></td><td style="white-space:pre-wrap">${data.message}</td></tr>
        <tr><td style="color:#666"><b>Resume</b></td><td>${data.resumeName ? `Attached (${data.resumeName})` : "Not provided"}</td></tr>
      </table>
    `;

    const result = await resend.emails.send({
      from: "Axiotta Careers <careers@axiotta.com>",
      to: ["hr@axiotta.com"],
      replyTo: data.email,
      subject: `New Application: ${data.position} — ${data.name}`,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    if (result.error) throw new Error(result.error.message);
    return { ok: true };
  });
