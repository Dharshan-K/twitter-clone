/** @format */

// const {Pool}= require("pg");
import { Pool } from "pg";
require("dotenv").config();

export const itemsPool = new Pool({
  connectionString: process.env.POSTGRESQL_EXTERNAL_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
