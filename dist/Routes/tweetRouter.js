"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetRouter = void 0;
const Express = require("express");
const tweetController_1 = require("../tweets/tweetController");
// import { login, signUp } from "../user/authController";
const authmiddleware_1 = require("../middleware/authmiddleware");
const tweetRouter = Express.Router();
exports.tweetRouter = tweetRouter;
tweetRouter.route("/insertTweet").post(authmiddleware_1.authUser, tweetController_1.createTweet);
