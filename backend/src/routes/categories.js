import express from "express";
const router = express.Router();
import categoriesController from '../controllers/categoriesController.js';

router.route("/")
  .get(categoriesController.getcategories)
  .post(categoriesController.createCategories);

router.route("/:id")
  .get(categoriesController.getCategorie)
  .put(categoriesController.updateCategories)
  .delete(categoriesController.deletecategories);

export default router;