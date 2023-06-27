"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const Express = require("express");
const userController_1 = require("../user/userController");
const authController_1 = require("../user/authController");
const userRouter = Express.Router();
exports.userRouter = userRouter;
userRouter.route("/getUser").get(userController_1.queryUser);
userRouter.route("/signUp").post(authController_1.signUp);
