import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. تجهيز بيانات الإيميل
  const mailOptions = {
    from: `"Aly Shope Support" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  // 3. إرسال الإيميل
  await transporter.sendMail(mailOptions);
};
