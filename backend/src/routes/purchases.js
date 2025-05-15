import express from "express";
const router = express.Router();
import purchasesController from '../controllers/purchasesController.js';

router.route("/")
  .get(purchasesController.getPurchases)
  .post(purchasesController.createPurchases);

router.route("/:id")
  .get(purchasesController.getPurchase)
  .put(purchasesController.updatePurchases)
  .delete(purchasesController.deletePurchases);

export default router;