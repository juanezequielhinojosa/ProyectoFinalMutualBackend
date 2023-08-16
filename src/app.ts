import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from "./routes/user.router";
import passportMiddleware from './middlewares/passport';
import passport from 'passport'
import passportLocal from "passport-local";
//configuracion
const app = express()
//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
passport.use(passportMiddleware);
//rutas
app.use("/api", userRoutes);


export default app;