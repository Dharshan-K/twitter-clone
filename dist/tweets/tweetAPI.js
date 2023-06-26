"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTweet = void 0;
const createTweet = (req, res) => {
    const { content, writtenBy, userName, name, timestamp } = req.body;
    if (content || writtenBy || userName || name || timestamp) {
        res.status(412).json({ message: "dont have required values" });
        console.log("dont have required values");
        return;
    }
    else {
    }
};
exports.createTweet = createTweet;
