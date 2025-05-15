/**
    Campos:
        idClient
        Products
            idProduct
            quantity
            subtotal
        total
        status
 */

import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    idClient: {
      type: Schema.Types.ObjectId,
      ref: "Clients", // Referencia a la colección de clientes
      required: [true, "El ID del cliente es obligatorio"],
    },
    products: [
      {
        idProduct: {
          type: Schema.Types.ObjectId,
          ref: "Products", // Referencia a la colección de productos
          required: true,
        },
        quantity: {
          type: Number,
          min: [1, "La cantidad debe ser al menos 1"], // Cantidad mínima
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
          min: [0, "El subtotal no puede ser negativo"],
        },
      },
    ],
    total: {
      type: Number, // Total del pedido (suma de los subtotales de los productos)
      required: true,
      min: [0, "El total no puede ser negativo"],
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "Paid"],
        message: "El estado del pedido debe ser 'Pending' o 'Paid'",
      },
      default: "Pending",
    },
  },
  {
    timestamps: true, // Campos createdAt y updatedAt
  }
);

export default model("Orders", orderSchema);
