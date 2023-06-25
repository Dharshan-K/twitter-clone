/** @format */

import { Request, Response } from "express";
import { Mongoose } from "mongoose";

export const createTweet = (req: Request, res: Response): void => {
  const { content, writtenBy, userName, name, timestamp } = req.body;
  if (content! || writtenBy! || userName! || name! || timestamp) {
    res.status(412).json({ message: "dont have required values" });
    console.log("dont have required values");
    return;
  } else {
  }
};
