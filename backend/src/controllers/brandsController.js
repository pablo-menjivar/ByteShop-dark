const brandsController = {};
import brandsModel from "../models/Brands.js";

// READ: Select a todas las marcas
brandsController.getBrands = async (req, res) => {
  const brands = await brandsModel.find();
  res.json(brands);
};

// READ: Select a una marca específica
brandsController.getBrand = async (req, res) => {
  const brand = await brandsModel.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }
  res.json(brand);
};

// CREATE: Crea una nueva marca
brandsController.createBrands = async (req, res) => {
  const { name, ...otherFields } = req.body;
  try {
    const newBrand = new brandsModel({
      name: name,
      ...otherFields,
    });
    await newBrand.save();
    res.json({ message: ["Brand saved"] });
  } catch (error) {
    res.status(400).json({ message: "Error creating brand", error: error.message });
  }
};

// UPDATE: Actualiza una marca
brandsController.updateBrands = async (req, res) => {
  const { name, ...otherFields } = req.body;
  try {
    const updatedBrand = await brandsModel.findByIdAndUpdate(
      req.params.id,
      { name: name, ...otherFields },
      { new: true }
    );
    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json({ message: ["Brand updated"] });
  } catch (error) {
    res.status(400).json({ message: "Error updating brand", error: error.message });
  }
};

// DELETE: Borra una marca en base al id que me envíen
brandsController.deleteBrands = async (req, res) => {
  try {
    const deletedBrand = await brandsModel.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json({ message: ["Brand deleted"] });
  } catch (error) {
    res.status(400).json({ message: "Error deleting brand", error: error.message });
  }
};

export default brandsController;
