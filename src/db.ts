import { DataSource } from "typeorm";
import { Usuario } from "./entities/Usuario";

import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from "./config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: 3306,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  // logging: true, // muestra peticiones a la bd
  synchronize: true,
  entities: [Usuario],
});