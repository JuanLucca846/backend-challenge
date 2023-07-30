import express from "express";
import {
  clientRisk,
  createClient,
  deleteClient,
  findAllClients,
  findClientById,
  updateClient,
} from "../controllers/client.controller";
import { createValidator } from "express-joi-validation";
import { createClientSchema } from "../validate/createClient.validation";
import { updateClientSchema } from "../validate/updateClient.validation";

const clientRoutes = express.Router();
const validator = createValidator();

clientRoutes.get("/clients", findAllClients);
clientRoutes.get("/client/:id", findClientById);
clientRoutes.post("/client", validator.body(createClientSchema), createClient);
clientRoutes.put(
  "/client/:id",
  validator.body(updateClientSchema),
  updateClient
);
clientRoutes.delete("/client/:id", deleteClient);
clientRoutes.get("/clients/sorted", clientRisk);

export default clientRoutes;
