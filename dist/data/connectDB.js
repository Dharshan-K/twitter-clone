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
exports.getImage = exports.connectMongo = exports.itemsPool = exports.gfs = void 0;
const mongoose_1 = require("mongoose");
const pg_1 = require("pg");
require("dotenv").config();
exports.itemsPool = new pg_1.Pool({
    connectionString: process.env.POSTGRESQL_EXTERNAL_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGODB_URL = process.env.MONGODB_URL || "";
    console.log("runnning connectMongo");
    try {
        mongoose_1.default.set("strictQuery", false);
        const connection = yield mongoose_1.default.connect(MONGODB_URL);
        console.log("mongoDB connected");
        const conn = mongoose_1.default.connection;
        exports.gfs = yield new mongoose_1.default.mongo.GridFSBucket(conn.db, {
            bucketName: "uploads",
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
exports.connectMongo = connectMongo;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting the image 1");
    const files = yield exports.gfs.find({ tweetID: req.body.tweetID }).toArray();
    console.log(files, files);
    if (!files[0] || files.length === 0) {
        console.log("error......");
        res.status(401).send("error");
    }
    else if (files[0]) {
        const imageFile = files[0];
        exports.gfs.openDownloadStream(imageFile._id).pipe(res);
        res.status(201).send("image relayed");
    }
});
exports.getImage = getImage;
