// routes/payment.js
import express from "express";
import paymentController from "../controllers/paymentController.js";

const router = express.Router();

// Ruta para crear un pago
router.post("/create-payment", paymentController.createPayment);

// Ruta para capturar el pago
router.post("/capture-payment", paymentController.capturePayment);

export default router;
