/*
  Campos:
    name
    desciption
    price
    idCategory
    stock
    image
    idBrand
    idModel
    discount
 */

import { Schema, model } from "mongoose";

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: [
        /^[^\s].+[^\s]$/, // Evita nombres que sean solo espacios
        "El nombre del producto no puede ser solo espacios",
      ],
    },
    description: {
      type: String,
      required: true,
      minlength: [5, "La descripción debe tener al menos 10 caracteres"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    idCategory: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      required: false,
    },
    idBrand: {
      type: Schema.Types.ObjectId,
      ref: "Brands",
      required: true,
    },
    idModel: {
      type: Schema.Types.ObjectId,
      ref: "Models",
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      min: [0, "El descuento no puede ser menor que 0"],
      max: [100, "El descuento no puede exceder el 100%"],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Products", productsSchema);
