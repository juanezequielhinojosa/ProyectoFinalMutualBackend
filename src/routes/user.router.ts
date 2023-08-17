import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import {signIn, protectedEndpoint, refresh } from '../controllers/user.controller'
import passport from 'passport'
const router = Router();


/* El código está definiendo varias rutas para manejar operaciones relacionadas con el usuario en un
Aplicación Express.js. Aquí hay un desglose de lo que hace cada ruta: */
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users/signup", createUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.post('/users/signin', signIn);
router.post('/token', refresh);


export default router;