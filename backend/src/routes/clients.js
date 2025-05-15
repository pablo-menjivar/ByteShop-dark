import express from "express";
const router = express.Router();

import clientsController from "../controllers/clientsController.js";

router.route("/").get(clientsController.getClients);

router
  .route("/:id")
  .get(clientsController.getClient)
  .put(clientsController.updateClients)
  .delete(clientsController.deleteClients);

export default router;
