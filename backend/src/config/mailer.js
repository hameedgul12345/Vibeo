import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 🧩 Setup Transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // ✅ fix typo: EMIAL → EMAIL
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ✅ Send Mail Function
const sendMail = async (to, otp) => {
  try {
    const mailOptions = {
      from: `"VIBEO Support" <${process.env.EMAIL}>`,
      to,
      subject: "Your VIBEO OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #222;">
          <h2 style="color: #000;">VIBEO Account Verification</h2>
          <p>Hi there 👋,</p>
          <p>Use the OTP code below to verify your email or reset your password:</p>
          <div style="
            background: #000;
            color: #fff;
            font-size: 24px;
            letter-spacing: 3px;
            padding: 10px 20px;
            display: inline-block;
            border-radius: 8px;
            margin: 10px 0;
          ">
            ${otp}
          </div>
          <p>This code will expire in <strong>5 minutes</strong>.</p>
          <p>If you didn’t request this, please ignore this message.</p>
          <p style="margin-top: 30px;">— The <strong>VIBEO</strong> Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent:", info.response);
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false;
  }
};

export default sendMail;
