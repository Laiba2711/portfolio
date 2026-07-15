import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to: process.env.CONTACT_EMAIL || "laiba@example.com",
    replyTo: email,
    subject: `[Portfolio Contact] ${subject}`,
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #020209; color: white; padding: 40px; border-radius: 16px; border: 1px solid rgba(124, 58, 237, 0.3);">
        <div style="margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 700; margin: 0; background: linear-gradient(135deg, #c084fc, #7c3aed, #2563eb); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            New Contact Message
          </h1>
          <p style="color: rgba(255,255,255,0.5); margin-top: 8px; font-size: 14px;">From your portfolio website</p>
        </div>
        
        <div style="background: rgba(124, 58, 237, 0.08); border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: rgba(255,255,255,0.5); font-size: 13px; width: 80px;">Name</td>
              <td style="padding: 8px 0; color: white; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Email</td>
              <td style="padding: 8px 0; color: #c084fc; font-weight: 600;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Subject</td>
              <td style="padding: 8px 0; color: white; font-weight: 600;">${subject}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px;">
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
          <p style="color: white; line-height: 1.7; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
        </div>
        
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);">
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">
            Sent from laibarashid.dev portfolio
          </p>
        </div>
      </div>
    `,
  });

  if (error) throw new Error(error.message);
  return data;
}
