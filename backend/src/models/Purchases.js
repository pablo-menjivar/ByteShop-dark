/*
  Campos:
    idOrder
    address
*/

import { Schema, model } from "mongoose";

const purchaseSchema = new Schema(
  {
    idOrder: {
      type: Schema.Types.ObjectId,
      ref: "Orders",
      required: true,
    },

    address: {
      type: String,
      required: true,
      minlength: [10, "La dirección debe tener al menos 10 caracteres"],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Purchases", purchaseSchema);
