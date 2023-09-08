import { DataSource } from "typeorm";
import { User } from "./entities/User";

import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from "./config";
import { Rol } from "./entities/Rol";
import { Orden } from "./entities/Orden";
import { Afiliado } from "./entities/Afiliado";
import { Domicilio } from "./entities/Domicilio";
import { Comercio } from "./entities/Comercio";
import { Cuota } from "./entities/Cuota";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: 3306,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  // logging: true, // muestra peticiones a la bd
  synchronize: true,
  entities: [User, Rol, Orden, Afiliado, Domicilio, Comercio, Cuota ],
});