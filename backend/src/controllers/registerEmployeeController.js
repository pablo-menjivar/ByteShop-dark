const registerEmployeeController = {};
import employeesModel from "../models/Employees.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

registerEmployeeController.register = async (req, res) => {
  const {
    name,
    lastName,
    email,
    password,
    telephone,
    dui,
    address,
    birthdate,
    hireDate,
    isssNumber,
  } = req.body;

  // Validación de campos requeridos para empleados
  if (
    !name ||
    !lastName ||
    !email ||
    !password ||
    !telephone ||
    !address ||
    !birthdate ||
    !hireDate ||
    !isssNumber
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Verificar si el empleado ya existe
    const existingClient = await employeesModel.findOne({ email });
    if (existingClient) {
      return res.status(409).json({ message: "Client already exists" }); // Código 409: Conflicto
    }
    // Validación extra: formato de teléfono y DUI
    if (!/^\d{8}$/.test(telephone)) {
      return res
        .status(400)
        .json({ message: "Invalid telephone format. Must be 8 digits." });
    }

    if (!/^\d{8}-\d$/.test(dui)) {
      return res
        .status(400)
        .json({ message: "Invalid DUI format. Must follow XXXXXXXX-X." });
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear un nuevo empleado
    const newEmployee = new employeesModel({
      name,
      lastName,
      email,
      password: passwordHash,
      telephone,
      dui,
      address,
      birthdate,
      hireDate,
      isssNumber,
    });

    await newEmployee.save();

    // Generar un token JWT
    jwt.sign(
      { id: newEmployee._id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
      (err, token) => {
        if (err) console.log(err);
        res.cookie("authToken", token);
        res.status(201).json({ message: "Employee registered successfully" });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering employee", error: error.message });
  }
};

export default registerEmployeeController;
