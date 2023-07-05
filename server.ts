/** @format */

import * as Express from "express";
let app: Express.Application;
app = Express();
const cors = require("cors");
import { userRouter } from "./Routes/userRouter";
import { itemsPool, connectMongo } from "./data/connectDB";
import { queryUser, insertUser, deleteUser } from "./user/userController";
import { tweetRouter } from "./Routes/tweetRouter";
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

itemsPool;
// connectMongo();
// app.post("/insert", insertUser);
// app.post("/delete", deleteUser);
app.use("/", userRouter);
app.use("/tweet", tweetRouter);
app.listen(3000, () => {
  console.log("running on ort 5000");
});
