const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const app = express();
app.use(cors());
app.use(express.json());

// Configuramos el transporte usando las variables de entorno
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para puerto 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Ruta de prueba para el navegador
app.get('/', (req, res) => {
  res.send('El servidor de contacto está funcionando correctamente 🚀');
});

app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio: ${subject}`,
    text: `De: ${name} <${email}>\n\nMensaje:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: '¡Correo enviado con éxito!' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));