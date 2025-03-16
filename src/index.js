import express from "express";
import allRoutes from "./routes/all.routes.js";
import DB_Client from "./database/db_connection.js";

const exp = express();

exp.use(express.json());
exp.use("/api", allRoutes());
exp.use("*", (req, res) => {
  res.status(404).send("PAGE NOT FOUND");
});

async function intiServer() {
  await DB_Client.connect();
  exp.listen(
    process.env.SERVER_PORT,
    console.log(`Server is running on ${process.env.SERVER_PORT} port`)
  );
}

intiServer();
