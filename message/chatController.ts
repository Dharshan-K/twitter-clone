/** @format */

import { Server } from "socket.io";
const express = require("express");

import { createServer } from "http";
import { itemsPool } from "../data/connectDB";
const cors = require("cors");
export const connectSocket = (inputServer: Express.Application) => {
  const io = new Server(inputServer, {
    cors: {
      origin: "http://localhost:5000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`connected to ${socket.id}`);
    socket.on("chat message", (msg, userFrom, userTo) => {
      console.log("message: " + msg);
      storeMessage(userFrom, userTo, msg);
    });
  });
};

export const storeMessage = (from: string, to: string, message: string) => {
  itemsPool.query("insert into chatdata($1,$2,$3,$4", [
    from,
    to,
    message,
    new Date(),
  ]);
};

export const getMessages = async (req: any, res: any) => {
  const { from, to } = req.body;
  const messages = await itemsPool.query(
    "select * from chatdata where user_from=$1 and user_to=$2 orderby postedat asc"
  );
  return messages.rows;
};
