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
router.get("/afiliados", getAfiliados);
router.get("/afiliados/:id", getAfiliado);
router.post("/afiliados", createAfiliado);
router.put("/afiliados/:id", updateAfiliado);
router.delete("/afiliados/:id", deleteAfiliado);




export default router;