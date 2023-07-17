/** @format */

import * as Express from "express";
let app: Express.Application;
app = Express();
const http = require("http");
const cors = require("cors");
import { Server, Socket } from "socket.io";
import { userRouter } from "./Routes/userRouter";
import { itemsPool, connectMongo } from "./data/connectDB";
import { queryUser, insertUser, deleteUser } from "./user/userController";
import { tweetRouter } from "./Routes/tweetRouter";
import { connectSocket } from "./message/chatController";

//Middleware
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

//Database
itemsPool;
connectMongo();

//Socket server
const httpServer = http.createServer(app);
connectSocket(httpServer);

//Routes
app.use("/", userRouter);
app.use("/tweet", tweetRouter);

httpServer.listen(4000, () => {
  console.log("running on http port 3000");
});
