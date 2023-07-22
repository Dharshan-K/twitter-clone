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
exports.getHashTags = exports.getHashTag = void 0;
const connectDB_1 = require("../../data/connectDB");
const getHashTag = (req, res) => {
    const { hashTag } = req.body;
    if (hashTag) {
        try {
            const queryhash = queryHashTag(hashTag);
            res.status(201).send(queryhash);
        }
        catch (error) {
            console.log(error);
            res.status(400).send("error");
        }
    }
};
exports.getHashTag = getHashTag;
const getHashTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { hashTag } = req.body;
    hashTag = "#" + hashTag;
    const queryResult = yield connectDB_1.itemsPool.query("select * from usertweets where $1 = any(hashtags)", [hashTag]);
    res.status(201).send(queryResult.rows);
    return;
});
exports.getHashTags = getHashTags;
function queryHashTag(tagNumber) {
    const hashQuery = connectDB_1.itemsPool.query("select * from hashData where tag=$1", [
        tagNumber,
    ]);
    return hashQuery;
}
