import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, phone, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail", // Например, Gmail
      auth: {
        user: "your-email@gmail.com", // Ваш email
        pass: "your-email-password", // Ваш пароль или приложение пароль
      },
    });

    const mailOptions = {
      from: email,
      to: "recipient-email@gmail.com", // Кому отправлять
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
     res.status(405).json({ error: "Method not allowed" });
  }
}
