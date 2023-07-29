/** @format */

import mongoose from "mongoose";
import { Pool } from "pg";
require("dotenv").config();
export let gfs: mongoose.mongo.GridFSBucket;
import * as Express from "express";

export const itemsPool = new Pool({
  connectionString: process.env.POSTGRESQL_EXTERNAL_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectMongo = async () => {
  const MONGODB_URL = process.env.MONGODB_URL || "";
  console.log("runnning connectMongo");
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(MONGODB_URL);
    console.log("mongoDB connected");
    const conn = mongoose.connection;
    gfs = await new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const getImage = async (req: Express.Request, res: Express.Response) => {
  console.log("getting the image 1");
  const files = await gfs.find({ tweetID: req.body.tweetID }).toArray();
  console.log(files, files);
  if (!files[0] || files.length === 0) {
    console.log("error......");
    res.status(401).send("error");
  } else if (files[0]) {
    const imageFile = files[0];
    gfs.openDownloadStream(imageFile._id).pipe(res);
    res.status(201).send("image relayed");
  }
};
