/*
    Campos:
        name
*/

import { Schema, model } from "mongoose";

const modelsSchema = new Schema(
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

export default model("Models", modelsSchema);
