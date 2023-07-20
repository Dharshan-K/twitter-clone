/** @format */

import { Server } from "socket.io";
const express = require("express");

import { createServer } from "http";
import { itemsPool } from "../data/connectDB";
const cors = require("cors");
export const connectSocket = (inputServer: Express.Application) => {
  const io = new Server(inputServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`connected to ${socket.id}`);
    socket.on("chat message", (userTo, userFrom, msg) => {
      console.log("message: " + msg);
      storeMessage(userFrom, userTo, msg);
    });
  });
};

export const storeMessage = async (
  from: string,
  to: string,
  message: string
) => {
  console.log(from, to, message);
  await itemsPool.query("insert into chatdata values ($1,$2,$3,$4);", [
    from,
    to,
    message,
    new Date(),
  ]);
  console.log("chat registered");
};

export const getMessages = async (req: any, res: any) => {
  const { from, to } = req.body;
  console.log(from, to);
  if (to) {
    var messages = await itemsPool.query(
      "select * from chatdata where user_from=$1 and user_to=$2 order by posted_at asc",
      [from, to]
    );
  } else {
    messages = await itemsPool.query(
      "select * from chatdata where user_from=$1 or user_to=$2 order by posted_at asc",
      [from, to]
    );
  }
  console.log("messages", messages.rows);
  res.status(201).send(messages.rows);
};
