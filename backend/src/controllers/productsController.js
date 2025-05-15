/*
* Este archivo define los controladores para gestionar las operaciones CRUD
* (Crear, Leer, Actualizar y Eliminar) de productos en la base de datos.
* 
* Se utilizan los métodos de Mongoose para interactuar con la base de datos MongoDB.
* Las operaciones están asociadas a endpoints o rutas
*
* TODO: Validar que el id de la categoría exista antes de guardar un producto.
*/

const productsController = {};
import productsModel from "../models/Product.js";

// SELECT ALL PRODUCTS
productsController.getProducts = async (req, res) => {
  const products = await productsModel.find().populate('idCategory').populate('idBrand').populate('idModel');
  res.json(products);
};

// SELECT PRODUCT BY ID
productsController.getProduct = async (req, res) => {
  const product = await productsModel.findById(req.params.id).populate('idCategory').populate('idBrand').populate('idModel');
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.json(product);
};

// CREATE PRODUCT
productsController.createProducts = async (req, res) => {
  const { name, description, price, idCategory, stock, image, idBrand, idModel, discount } = req.body;
  const newProduct = new productsModel({
    name,
    description,
    price,
    idCategory,
    stock: stock || 0,
    image,
    idBrand,
    idModel,
    discount: discount || 0,
  });

  await newProduct.save();
  res.status(201).json({ message: "Producto creado con éxito"});
};

// UPDATE PRODUCT
productsController.updateProducts = async (req, res) => {
  const { name, description, price, idCategory, stock, image, idBrand, idModel, discount } = req.body;
  const updatedProduct = await productsModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      idCategory,
      stock: stock || 0,
      image,
      idBrand,
      idModel,
      discount: discount || 0,
    },
    { new: true }
  );
  if (!updatedProduct) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.json({ message: "Producto actualizado con éxito" });
};

// DELETE PRODUCT
productsController.deleteProducts = async (req, res) => {
  const deletedProduct = await productsModel.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.json({ message: "Producto eliminado con éxito" });
};

export default productsController;
