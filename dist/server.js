"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
let app;
app = Express();
const http = require("http");
const cors = require("cors");
const cookie = require("cookie-parser");
const userRouter_1 = require("./Routes/userRouter");
const connectDB_1 = require("./data/connectDB");
const tweetRouter_1 = require("./Routes/tweetRouter");
const chatController_1 = require("./message/chatController");
//Middleware
app.use(cookie());
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
//Database
connectDB_1.itemsPool;
(0, connectDB_1.connectMongo)();
//Socket server
const httpServer = http.createServer(app);
(0, chatController_1.connectSocket)(httpServer);
//Routes
app.use("/", userRouter_1.userRouter);
app.use("/tweet", tweetRouter_1.tweetRouter);
httpServer.listen(4000, () => {
    console.log("running on http port 3000");
});
