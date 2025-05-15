import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config.js";
import clientsModel from "../models/Client.js";
import nodemailer from "nodemailer"; // Para el envío de correos electrónicos
import crypto from "crypto"; // Para generar un código aleatorio

const registerClientController = {};

// CREATE: Registra un nuevo cliente y envía un código de verificación por correo
registerClientController.register = async (req, res) => {
  const { name, lastName, email, password, telephone, dui } = req.body;

  // Validación de campos requeridos
  if (!name || !lastName || !email || !password || !telephone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Verificar si el cliente ya existe
    const existingClient = await clientsModel.findOne({ email });
    if (existingClient) {
      return res.status(409).json({ message: "Client already exists" }); // Código 409: Conflicto
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newClient = new clientsModel({
      name,
      lastName,
      email,
      password: passwordHash,
      telephone,
      dui: dui || null, // Si no se envía DUI, se establece como null
    });

    await newClient.save();

    // Generar un código de verificación único
    const verificationCode = crypto.randomBytes(3).toString("hex"); // Código corto
    const expiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 horas de expiración

    // Crear un JWT con el código y su expiración
    const tokenCode = jwt.sign(
      {
        email,
        verificationCode,
        expiresAt,
      },
      config.jwt.secret,
      { expiresIn: "2h" } // El JWT expirará en 2 horas
    );

    // Guardar el token en una cookie
    res.cookie("verificationToken", tokenCode, {
      httpOnly: true, // La cookie no será accesible desde JavaScript
      secure: process.env.NODE_ENV === "production", // Solo se envía en HTTPS si estás en producción
      maxAge: 2 * 60 * 60 * 1000, // Duración de la cookie: 2 horas
    });

    // Enviar correo electrónico con el código de verificación (JWT)
    const transporter = nodemailer.createTransport({
      service: "gmail", // Usa tu servicio de correo preferido
      auth: {
        user: config.email.email, // Tu correo electrónico
        pass: config.email.password, // La contraseña de la aplicación (asegúrate de usar una contraseña de app si usas Gmail)
      },
    });

    const mailOptions = {
      from: config.email.username, // Tu correo electrónico
      to: email,
      subject: "Verificación de correo electrónico",
      text: `Para verificar tu cuenta, utiliza el siguiente código de verificación: ${verificationCode}\nEste código expirará en 2 horas.\nSi no solicitaste este registro, por favor ignora este correo.`,
    };

    // Enviar correo
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
    });

    // Enviar una respuesta con el código de verificación
    res.status(201).json({
      message:
        "Client registered. Please verify your email with the code sent.",
      token: tokenCode, // Devolver el token para verificación posterior
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// Verificación del correo electrónico al recibir el token
registerClientController.verifyCodeEmail = async (req, res) => {
  const { verificationCode } = req.body;
  const token = req.cookies.verificationToken; // Obtener el token de la cookie

  if (!token) {
    return res.status(401).json({ message: "No verification token provided" });
  }

  try {
    // Verificar y decodificar el JWT
    const decoded = jwt.verify(token, config.jwt.secret);
    const { email, verificationCode: storedCode } = decoded;

    // Comparar el código recibido con el almacenado en el JWT
    if (verificationCode !== storedCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Marcar al cliente como verificado
    const client = await clientsModel.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Actualizar el campo de verificación
    client.isVerified = true;
    await client.save();
    // Limpiar la cookie después de la verificación
    res.clearCookie("verificationToken");

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying email", error: error.message });
  }
};

export default registerClientController;
