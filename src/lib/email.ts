import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  await resend.emails.send({
    from: "DevConnect <onboarding@resend.dev>", // Resend's shared test sender — fine for dev, a real domain comes later
    to,
    subject,
    text,
  });
}