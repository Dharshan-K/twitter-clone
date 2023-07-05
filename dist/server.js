"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
let app;
app = Express();
const cors = require("cors");
const userRouter_1 = require("./Routes/userRouter");
const connectDB_1 = require("./data/connectDB");
const tweetRouter_1 = require("./Routes/tweetRouter");
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
connectDB_1.itemsPool;
(0, connectDB_1.connectMongo)();
app.use("/", userRouter_1.userRouter);
app.use("/tweet", tweetRouter_1.tweetRouter);
app.listen(3000, () => {
    console.log("running on ort 5000");
});
