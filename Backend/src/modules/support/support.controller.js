import asyncHandler from "../../utils/asyncHandler.js";
import * as supportService from "./support.service.js";
import { sendEmail } from "../../utils/sendEmail.js";

export const submitSupportMessage = asyncHandler(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const ticket = await supportService.createTicket({
    name,
    email,
    subject,
    message,
  });

  const emailHtml = `
    <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h3>مرحباً ${name}،</h3>
      <p>لقد استلمنا رسالتك بنجاح بخصوص: <b>${subject}</b></p>
      <p>فريق الدعم الفني لدينا يقوم بمراجعة طلبك وسنقوم بالرد عليك في أقرب وقت ممكن.</p>
      <hr>
      <p><b>نسخة من رسالتك:</b></p>
      <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${message}</p>
      <br>
      <p>مع تحيات،<br>فريق عمل Aly Shope</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: `تأكيد استلام رسالتك: ${subject}`,
    html: emailHtml,
  });

  res.status(201).json({
    success: true,
    message: "Message received and confirmation email sent!",
    data: ticket,
  });
});
