/** @format */

import mongoose from "mongoose";
import { Pool } from "pg";
require("dotenv").config();

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
    console.log(connection.connection.host);
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
