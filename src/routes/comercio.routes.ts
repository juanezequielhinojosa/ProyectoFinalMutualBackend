import { Router } from "express";
import {
  createComercio,
  getComercios,
  getComercio,
  updateComercio,
  deleteComercio,
  getListPayByComercio,
  getMontoByComercio
} from "../controllers/comercio.controller";
import { protectedEndpoint, refresh } from '../controllers/user.controller'
const router = Router();


/* El código está definiendo varias rutas para manejar operaciones relacionadas con el usuario en un
Aplicación Express.js. Aquí hay un desglose de lo que hace cada ruta: */
router.get("/comercios", getComercios);
router.get("/comercios/:id", getComercio);
router.get("/comercios_montos/", getListPayByComercio);
router.get("/comercios_montos/:id", getMontoByComercio);
router.post("/comercios", createComercio);
router.delete("/comercios/:id", deleteComercio);
router.put("/comercios/:id", updateComercio);



export default router;