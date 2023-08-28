"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const Express = require("express");
const userController_1 = require("../user/userController");
const authController_1 = require("../user/authController");
const authmiddleware_1 = require("../middleware/authmiddleware");
const userRouter = Express.Router();
exports.userRouter = userRouter;
userRouter.route("/getUser").get(authmiddleware_1.authUser, userController_1.queryUser);
userRouter.route("/signUp").post(authController_1.signUp);
userRouter.route("/login").post(authController_1.login);
userRouter.route("/auth").post(authmiddleware_1.authUser);
