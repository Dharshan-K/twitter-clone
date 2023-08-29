/** @format */

import * as Express from "express";
import { queryUser } from "../user/userController";
import { login, signUp } from "../user/authController";
import { authUser } from "../middleware/authmiddleware";

const userRouter = Express.Router();

userRouter.route("/getUser").get(authUser, queryUser);
userRouter.route("/signUp").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/auth").post(authUser);

export { userRouter };
