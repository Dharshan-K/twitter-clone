/** @format */

import * as mongoose from "mongoose";
import * as Express from "express";
import { generateUUID } from "./tweetController";
import { commentModel, nestedCommentModel } from "../data/commentSchema";

export const addCommentsToTweet = async (
  req: Express.Request,
  res: Express.Response
) => {
  console.log("commenting started................");
  const { commentData, tweetID, userID } = req.body;
  if (!commentData || (!tweetID && !userID)) {
    res.status(201).json({ message: "user credentials missing" });
    return;
  }

  if (tweetID) {
    const commentObject = await commentModel.create({
      commentID: generateUUID().toString(),
      commentData: commentData,
      userID: userID,
      like: 0,
      replies: [],
    });
    await nestedCommentModel.create({
      tweetID: tweetID,
      Comment: [],
    });
    res.status(401).json({ message: "commented on the post" });
    return;
  } else if (userID) {
  }
};

export const addCommentToComment = (
  req: Express.Request,
  res: Express.Response
) => {
  const { tweetID, userID, comment } = req.body;
  if (!comment || !tweetID || !userID) {
    res.status(201).json({ message: "user credentials missing" });
    return;
  }
};
