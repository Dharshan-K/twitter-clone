/** @format */

const express = require("express");
const app = express();
const cors = require("cors");

import { itemsPool, connectMongo } from "./data/connectDB";
import { queryUser, insertUser, deleteUser } from "./user/userController";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

itemsPool;
connectMongo();
app.post("/insert", insertUser);
app.post("/delete", deleteUser);
app.listen(5000, console.log("running on ort 5000"));
