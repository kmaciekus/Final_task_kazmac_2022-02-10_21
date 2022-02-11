import mysql from "mysql2/promise";
import { config } from "dotenv";
import { mysqlConfig } from "../utils/config.js";

config();

export const getConnection = async () => mysql.createConnection(mysqlConfig);
