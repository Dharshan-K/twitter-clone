"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require("cors");
// const { itemsPool } = require("./data/connectDB");
const connectDB_1 = require("./data/connectDB");
const userController_1 = require("./user/userController");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB_1.itemsPool;
app.post("/insert", userController_1.insertUser);
app.post("/delete", userController_1.deleteUser);
app.listen(5000, console.log("running on ort 5000"));
