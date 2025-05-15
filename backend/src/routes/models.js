import express from "express";
const router = express.Router();

import modelsController from "../controllers/modelsController.js";

router.route("/")
  .get(modelsController.getModels)
  .post(modelsController.createModels);

router.route("/:id")
  .get(modelsController.getModel)
  .put(modelsController.updateModels)
  .delete(modelsController.deleteModels);

export default router;
