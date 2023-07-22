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
exports.getUserQuery = exports.getSearchQuery = exports.searchAPI = void 0;
const connectDB_1 = require("../../data/connectDB");
const searchAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchQuery } = req.body;
    const search = yield (0, exports.getSearchQuery)(searchQuery);
    const userSearch = yield (0, exports.getUserQuery)(searchQuery);
    res.status(201).send({ tweetQuery: search, userQuery: userSearch });
});
exports.searchAPI = searchAPI;
const getSearchQuery = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResult = yield connectDB_1.itemsPool.query(`SELECT * FROM usertweets WHERE tweetwritten ILIKE '%'|| $1 || '%'`, [searchQuery]);
    return searchResult.rows;
});
exports.getSearchQuery = getSearchQuery;
const getUserQuery = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResult = yield connectDB_1.itemsPool.query(`SELECT * FROM userdata WHERE description ILIKE '%'|| $1 || '%' or username ILIKE '%'|| $1 || '%' or userid ILIKE '%'|| $1 || '%'`, [searchQuery]);
    return searchResult.rows;
});
exports.getUserQuery = getUserQuery;
