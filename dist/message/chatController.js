"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server();
io.on("connection", (socket) => {
    console.log("connection established..");
});
// const connectSocket = (
// )
