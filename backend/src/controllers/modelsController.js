const modelsController = {};
import modelsModel from "../models/Models.js";

// READ: Selecciona todos los modelos
modelsController.getModels = async (req, res) => {
  try {
    const models = await modelsModel.find();
    res.json(models);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving models", error: error.message });
  }
};

// READ: Selecciona un modelo específico
modelsController.getModel = async (req, res) => {
  try {
    const model = await modelsModel.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.json(model);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving the model", error: error.message });
  }
};

// CREATE: Crea un nuevo modelo
modelsController.createModels = async (req, res) => {
  const { name, ...otherFields } = req.body;
  try {
    const newModel = new modelsModel({
      name: name,
      ...otherFields,
    });
    await newModel.save();
    res.json({ message: ["Model saved"] });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating model", error: error.message });
  }
};

// UPDATE: Actualiza un modelo
modelsController.updateModels = async (req, res) => {
  const { name, ...otherFields } = req.body;
  try {
    const updatedModel = await modelsModel.findByIdAndUpdate(
      req.params.id,
      { name: name, ...otherFields },
      { new: true }
    );
    if (!updatedModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.json({ message: ["Model updated"] });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating model", error: error.message });
  }
};

// DELETE: Elimina un modelo por su ID
modelsController.deleteModels = async (req, res) => {
  try {
    const deletedModel = await modelsModel.findByIdAndDelete(req.params.id);
    if (!deletedModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.json({ message: ["Model deleted"] });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting model", error: error.message });
  }
};

export default modelsController;
