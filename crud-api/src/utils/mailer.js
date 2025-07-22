const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true si usa 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendTemporaryPassword(toEmail, tempPassword) {
  const mailOptions = {
    from: `"Tu App" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Recuperación de contraseña",
    html: `
      <h2>Has solicitado recuperar tu contraseña</h2>
      <p>Tu nueva contraseña temporal es:</p>
      <h3 style="color: #333;">${tempPassword}</h3>
      <p>Por favor, inicia sesión y cámbiala lo antes posible.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado a:", toEmail);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
}

module.exports = { sendTemporaryPassword };
