/** @format */

import * as Express from "express";
import { queryUser } from "../user/userController";
import { signUp } from "../user/authController";

const userRouter = Express.Router();

userRouter.route("/getUser").get(queryUser);
userRouter.route("/signUp").post(signUp);

export { userRouter };
