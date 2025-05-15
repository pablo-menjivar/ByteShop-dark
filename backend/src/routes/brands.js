import express from "express";
const router = express.Router();
import brandsController from '../controllers/brandsController.js';

router.route("/")
  .get(brandsController.getBrands)
  .post(brandsController.createBrands);

router.route("/:id")
  .get(brandsController.getBrand)
  .put(brandsController.updateBrands)
  .delete(brandsController.deleteBrands);

export default router;
