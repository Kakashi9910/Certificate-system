import nodemailer from "nodemailer";

export const sendEmail = async ({ email, name, pdfPath, jpgPath }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Certificate System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Certificate",
    text: `Hello ${name},\n\nYour certificate is attached.`,
    attachments: [
      { filename: "certificate.pdf", path: pdfPath },
      { filename: "certificate.jpg", path: jpgPath }
    ]
  });
};
