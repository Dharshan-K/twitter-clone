/** @format */

import * as mongoose from "mongoose";
import * as Express from "express";
import { commentModel, nestedCommentModel } from "../data/commentSchema";

const addComments = (req: Express.Request, res: Express.Response) => {
  const { commentData, tweetID } = req.body;
};
