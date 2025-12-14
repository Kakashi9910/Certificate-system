import { Resend } from "resend";
import fs from "fs";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, name, pdfPath, jpgPath }) => {
  await resend.emails.send({
    from: "Certificate System <onboarding@resend.dev>",
    to: email,
    subject: "Your Certificate 🎉",
    html: `<p>Hello <strong>${name}</strong>,<br/>Your certificate is attached.</p>`,
    attachments: [
      {
        filename: "certificate.pdf",
        content: fs.readFileSync(pdfPath),
      },
      {
        filename: "certificate.jpg",
        content: fs.readFileSync(jpgPath),
      },
    ],
  });
};
