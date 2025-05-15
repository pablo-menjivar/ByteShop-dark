/*
    Campos:
        Nombre
*/

import { Schema, model } from "mongoose";

const brandsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[A-Za-z\s]+$/,
        "El nombre solo puede contener letras y espacios",
      ], // Solo letras y espacios
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Brands", brandsSchema);
