import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const DB_Client = new pg.Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

export default DB_Client;
