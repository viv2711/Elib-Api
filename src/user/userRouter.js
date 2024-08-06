import express from "express";
import { createUser, loginUser} from "./userController.js";
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
export default userRouter;
