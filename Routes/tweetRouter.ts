/** @format */

import * as Express from "express";
import {
  createTweet,
  getTweet,
  getTweets,
  postLike,
} from "../tweets/tweetController";
import { authUser } from "../middleware/authmiddleware";
import {
  addCommentsToTweet,
  addCommentToComment,
  getComment,
  getNestedComments,
} from "../tweets/commentController";
import { searchAPI } from "../tweets/utils/searchAPI";
import { getMessages, getUsers } from "../message/chatController";
import { getHashTag, getHashTags } from "../tweets/hashtag/hashtagController";
import { uploadImage, upload } from "../middleware/FileMiddleware";
import { getImage } from "../data/connectDB";

const tweetRouter = Express.Router();

tweetRouter.route("/insertTweet").post(authUser, createTweet);
tweetRouter.route("/addComment").post(authUser, addCommentsToTweet);
tweetRouter.route("/addToComment").post(authUser, addCommentToComment);
tweetRouter.route("/search").post(searchAPI);
tweetRouter.route("/home/:id").get(getTweets);
tweetRouter.route("/messages").post(authUser, getMessages);
tweetRouter.route("/hashtag").post(getHashTags);
tweetRouter.route("/friends").get(getUsers);
tweetRouter.route("/like/:id").post(authUser, postLike);
tweetRouter.route("/:id").get(getComment);
tweetRouter.route("/comment/:id").get(getNestedComments);
tweetRouter.route("/tweet/:id").get(getTweet);
tweetRouter.route("/upload").post(upload.single("file"), uploadImage);
tweetRouter.route("/getImage/:id").get(getImage);

export { tweetRouter };
