import { Router } from "express";
import UserController from "../controllers/users.controller.js";

const userRouter = Router();
const controller = new UserController();

userRouter.get("/users", (req, res) => {
  controller.getUsers(req, res);
});

userRouter.get("/user/:id", (req, res) => {
  controller.getUser(req, res);
});

userRouter.post("/user", (req, res) => {
  controller.newUser(req, res);
});

userRouter.put("/user/:id", (req, res) => {
  controller.UpdUser(req, res);
});

userRouter.delete("/user/:id", (req, res) => {
  controller.RemoveUser(req, res);
});

export default userRouter;
