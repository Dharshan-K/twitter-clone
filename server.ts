/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
// const { itemsPool } = require("./data/connectDB");
import { itemsPool } from "./data/connectDB";
import { queryUser, insertUser, deleteUser } from "./user/userController";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

itemsPool;
app.post("/insert", insertUser);
app.post("/delete", deleteUser);
app.listen(5000, console.log("running on ort 5000"));
