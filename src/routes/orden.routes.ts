import { Router } from "express";
import {
  getOrdenes,
  getOrden,
  createOrden,
  pagarOrden,
  deleteOrden,
  getOrdenesByAfiliado,
} from "../controllers/orden.controller";
import passport from 'passport'

const router = Router();
/* Estas líneas de código definen las rutas para manejar las solicitudes HTTP relacionadas con las ordenes. Cada
ruta está asociada con un método HTTP específico (GET, POST, PUT, DELETE) y un método HTTP correspondiente
función del controlador. */
router.get("/ordenes", getOrdenes);
router.get("/ordenes/:id", getOrden);
router.post("/ordenes", createOrden);
router.put("/ordenes/:id", pagarOrden);
router.delete("/ordenes/:id", deleteOrden);
router.get("/ordenes/afiliado/:id", getOrdenesByAfiliado);

export default router;