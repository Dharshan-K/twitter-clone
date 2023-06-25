"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsPool = void 0;
// const {Pool}= require("pg");
const pg_1 = require("pg");
require("dotenv").config();
exports.itemsPool = new pg_1.Pool({
    connectionString: process.env.POSTGRESQL_EXTERNAL_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
