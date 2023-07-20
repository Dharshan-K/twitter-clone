"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.storeMessage = exports.connectSocket = void 0;
const socket_io_1 = require("socket.io");
const express = require("express");
const connectDB_1 = require("../data/connectDB");
const cors = require("cors");
const connectSocket = (inputServer) => {
    const io = new socket_io_1.Server(inputServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log(`connected to ${socket.id}`);
        socket.on("chat message", (userTo, userFrom, msg) => {
            console.log("message: " + msg);
            (0, exports.storeMessage)(userFrom, userTo, msg);
        });
    });
};
exports.connectSocket = connectSocket;
const storeMessage = (from, to, message) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(from, to, message);
    yield connectDB_1.itemsPool.query("insert into chatdata values ($1,$2,$3,$4);", [
        from,
        to,
        message,
        new Date(),
    ]);
    console.log("chat registered");
});
exports.storeMessage = storeMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = req.body;
    console.log(from, to);
    if (to) {
        var messages = yield connectDB_1.itemsPool.query("select * from chatdata where user_from=$1 and user_to=$2 order by posted_at asc", [from, to]);
    }
    else {
        messages = yield connectDB_1.itemsPool.query("select * from chatdata where user_from=$1 or user_to=$2 order by posted_at asc", [from, to]);
    }
    console.log("messages", messages.rows);
    res.status(201).send(messages.rows);
});
exports.getMessages = getMessages;
