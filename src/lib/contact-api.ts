import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: ContactPayload) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY is not set");
      throw new Error("We couldn't send your message right now. Please reach us directly at partners@verisolve.in or call +91 91522 85233.");
    }

    const resend = new Resend(apiKey);

    const html = `
      <h2 style="color:#1a1a2e;font-family:sans-serif">New Consultation Request — Axiotta</h2>
      <table cellpadding="6" cellspacing="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="color:#666;width:140px"><b>Name</b></td><td>${data.name}</td></tr>
        <tr><td style="color:#666"><b>Company</b></td><td>${data.company}</td></tr>
        <tr><td style="color:#666"><b>Email</b></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="color:#666"><b>Phone</b></td><td>${data.phone}</td></tr>
        ${data.message ? `<tr><td style="color:#666;vertical-align:top"><b>Message</b></td><td style="white-space:pre-wrap">${data.message}</td></tr>` : ""}
      </table>
    `;

    const result = await resend.emails.send({
      from: "Axiotta Website <website@axiotta.com>",
      to: ["partners@verisolve.in"],
      replyTo: data.email,
      subject: `New Consultation Request — ${data.name} (${data.company})`,
      html,
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error.message);
      throw new Error("We couldn't send your message right now. Please reach us directly at partners@verisolve.in or call +91 91522 85233.");
    }

    return { ok: true };
  });
