/*
 * Este archivo define el esquema (schema) y el modelo de Mongoose para la colección "Categories" en MongoDB.
 * Un esquema de Mongoose es un objeto que define la estructura de los documentos en una colección.
 * En este caso, estamos definiendo cómo serán los documentos de categorías, que incluyen un nombre, descripción y una imagen.
 * También se configura el campo `timestamps` para agregar automáticamente las marcas de tiempo de creación y actualización de los documentos.
 */

/*
        Campos:
            name
            description
    */

import { Schema, model } from "mongoose";

const categoriesSchema = new Schema(
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
    description: {
      type: String,
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

export default model("Categories", categoriesSchema);
