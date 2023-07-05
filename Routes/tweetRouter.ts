/** @format */

import * as Express from "express";
import { createTweet } from "../tweets/tweetController";
// import { login, signUp } from "../user/authController";
import { authUser } from "../middleware/authmiddleware";

const tweetRouter = Express.Router();

tweetRouter.route("/insertTweet").post(authUser, createTweet);

export { tweetRouter };
