import { Router } from "express";
import {
  getCuotas,
  getCuota,
  pagarCuota,
  deleteCuota,
  getCuotasByAfiliadoId
 //createCuota,
 //updateCuota

} from "../controllers/cuota.controller";
import passport from 'passport'

const router = Router();
/* Estas líneas de código definen las rutas para manejar las solicitudes HTTP relacionadas con las cuotas. Cada
ruta está asociada con un método HTTP específico (GET, POST, PUT, DELETE) y un método HTTP correspondiente
función del controlador. */
router.get("/cuotas", getCuotas);
router.get("/cuotas/:id", getCuota);
router.put("/cuotas/:id", pagarCuota);
router.delete("/cuotas/:id", deleteCuota);
//router.post("/cuotas", createCuota);
//router.put("/cuotas/:id", updateCuota);

router.get("/cuotas/afiliado/:id", getCuotasByAfiliadoId);

export default router;