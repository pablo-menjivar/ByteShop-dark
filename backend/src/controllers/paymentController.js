// controllers/paymentController.js
import paypal from "@paypal/checkout-server-sdk";
import { config } from "../config.js";

// Configuración de PayPal
const clientId = config.paypal.clientId;
const clientSecret = config.paypal.clientSecret;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Crear el objeto del controlador
const paymentController = {};

// Función para crear un pago
paymentController.createPayment = async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "1.00", // Cambia por la cantidad deseada
        },
      },
    ],
    application_context: {
      locale: "es-SV", // Idioma español con configuración de El Salvador
      shipping_preference: "NO_SHIPPING", // Desactiva la solicitud de dirección de envío
    },
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear el pago");
  }
};

// Función para capturar el pago
paymentController.capturePayment = async (req, res) => {
  const { orderID } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.json({ status: capture.result.status });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al capturar el pago");
  }
};

// Exportar el controlador
export default paymentController;
