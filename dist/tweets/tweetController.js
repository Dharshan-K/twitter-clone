"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.comment = exports.createTweet = exports.generateUUID = void 0;
const connectDB_1 = require("../data/connectDB");
const uuid_1 = require("uuid");
const generateUUID = () => {
    return (0, uuid_1.v4)();
};
exports.generateUUID = generateUUID;
const createTweet = (req, res) => {
    const { tweet } = req.body;
    const { userid, username } = req.User;
    const tweetID = (0, exports.generateUUID)();
    console.log("processing the tweets.........");
    connectDB_1.itemsPool.query(`insert into usertweets values($1,$2,$3,$4,$5,$6)`, [tweetID, tweet, userid, 0, 0, new Date()], (error, results) => {
        if (error) {
            console.log("Error executing query", error);
            res.status(400).json({ message: "erro" });
            return;
        }
        res.status(201).json({ message: "inserted tweet" });
        console.log("inserted values");
    });
};
exports.createTweet = createTweet;
const comment = (req, res) => {
    const { commentBody, tweetid } = req.body;
};
exports.comment = comment;
