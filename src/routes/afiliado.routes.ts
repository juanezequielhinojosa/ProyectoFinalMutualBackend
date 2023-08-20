import { Router } from "express";
import {
  createAfiliado,
  getAfiliados,
  getAfiliado,
  updateAfiliado,
  deleteAfiliado,
} from "../controllers/afiliado.controller";
import { protectedEndpoint, refresh } from '../controllers/user.controller'
const router = Router();


/* El código está definiendo varias rutas para manejar operaciones relacionadas con el usuario en un
Aplicación Express.js. Aquí hay un desglose de lo que hace cada ruta: */
router.get("/comercios", getAfiliados);
router.get("/comercios/:id", getAfiliado);
router.post("/comercios", createAfiliado);
router.delete("/comercios/:id", deleteAfiliado);
router.put("/comercios/:id", updateAfiliado);



export default router;