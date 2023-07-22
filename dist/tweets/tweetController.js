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
exports.postLike = exports.createTweet = exports.getTweet = exports.getTweets = exports.generateUUID = void 0;
const connectDB_1 = require("../data/connectDB");
const uuid_1 = require("uuid");
const commentSchema_1 = require("../data/commentSchema");
const generateUUID = () => {
    return (0, uuid_1.v4)();
};
exports.generateUUID = generateUUID;
const getTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweets = yield connectDB_1.itemsPool.query("select * from usertweets order by createdAt asc");
    res.status(201).send(tweets.rows);
});
exports.getTweets = getTweets;
const getTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetID = req.params.id;
    const tweet = yield connectDB_1.itemsPool.query("select * from userTweets where tweetID=$1", [tweetID]);
    res.status(201).send(tweet.rows);
});
exports.getTweet = getTweet;
const createTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tweet } = req.body;
    const hashTags = getHastags(tweet);
    const users = getUsers(tweet);
    const { userid, username } = req.User;
    const tweetID = (0, exports.generateUUID)();
    yield connectDB_1.itemsPool.query(`insert into usertweets values($1,$2,$3,$4,$5,$6,$7,$8,$9)`, [tweetID, tweet, username, 0, 0, new Date(), hashTags, users, userid], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            console.log("Error executing query", error);
            res.status(400).json({ message: "erro" });
            return;
        }
        yield commentSchema_1.nestedCommentModel.create({
            tweetID: tweetID,
            Comment: [],
        });
        res.status(201).json({ message: "inserted tweet" });
        console.log("inserted values");
    }));
});
exports.createTweet = createTweet;
function getHastags(tweetString) {
    const checkHashtag = /#\w+/g;
    const hashTags = tweetString.match(checkHashtag);
    tweetString.replace(checkHashtag, "<Link href={https://twitter-backend-c831.onrender.com/search/`${}`}>#</Link>");
    return hashTags;
}
function getUsers(tweetString) {
    const checkUser = /@\w+/g;
    const users = tweetString.match(checkUser);
    return users;
}
const postLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield connectDB_1.itemsPool.query("update usertweets set likes=likes+1 where tweetid=$1;", [id]);
    const likesCount = yield connectDB_1.itemsPool.query("select likes from usertweets where tweetid=$1", [id]);
    res.status(201).send(likesCount);
});
exports.postLike = postLike;
