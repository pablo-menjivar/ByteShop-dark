/*
 * Este archivo define los controladores para gestionar las operaciones CRUD
 * (Crear, Leer, Actualizar y Eliminar) de la colección "categories" en MongoDB.
 *
 * Se utilizan métodos de Mongoose para interactuar con la base de datos.
 * Cada función está asociada con un endpoint o ruta,
 * de tal manera que si visito localhost:4000/categories/ con POST y le envío datos, se ejecutará createCategories
 *
 * TODO: Implementar validaciones de datos y manejo de errores más robusto en las operaciones.
 */

const categoriesController = {};
import categoriesModel from "../models/Categories.js";

// READ: Select a todas las categorias
categoriesController.getcategories = async (req, res) => {
  const categories = await categoriesModel.find();
  res.json(categories);
};

// READ: Select a una categoria en especifico
categoriesController.getCategorie = async (req, res) => {
  const categorie = await categoriesModel.findById(req.params.id);
  console.log(categorie);
  res.json(categorie);
};

// CREATE: crea una categoria nueva
categoriesController.createCategories = async (req, res) => {
  const { name, description, ...otherFields } = req.body;
  const newCategorie = new categoriesModel({
    name: name,
    description: description,
    ...req.body,
  });
  await newCategorie.save();
  res.json({ message: ["Categories saved"] });
};

// UPDATE: actualiza una categoria
categoriesController.updateCategories = async (req, res) => {
  const { name, description } = req.body;
  await categoriesModel.findByIdAndUpdate(req.params.id, {
    name: name,
    description: description,
  });
  res.json({ message: ["Categories updated"] });
};

// DELETE: Borra una categoria en base al id que me envien
categoriesController.deletecategories = async (req, res) => {
  await categoriesModel.findByIdAndDelete(req.params.id);
  res.json({ message: ["Categories deleted"] });
};

export default categoriesController;
