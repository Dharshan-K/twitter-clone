/** @format */

import * as Express from "express";
import { createTweet } from "../tweets/tweetController";
// import { login, signUp } from "../user/authController";
import { authUser } from "../middleware/authmiddleware";
import {
  addCommentsToTweet,
  addCommentToComment,
} from "../tweets/commentController";
import { searchAPI } from "../tweets/utils/searchAPI";

const tweetRouter = Express.Router();

tweetRouter.route("/insertTweet").post(authUser, createTweet);
tweetRouter.route("/addComment").post(authUser, addCommentsToTweet);
tweetRouter.route("/addToComment").post(authUser, addCommentToComment);
tweetRouter.route("/search").post(searchAPI);

export { tweetRouter };
