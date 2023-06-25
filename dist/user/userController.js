"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.insertUser = exports.queryUser = void 0;
/** @format */
const connectDB_1 = require("../data/connectDB");
require("dotenv").config();
const database_name = "userData";
const createTable = () => { };
const queryUser = () => {
    connectDB_1.itemsPool.query(`SELECT * FROM ${database_name}`, (error, results) => {
        if (error) {
            console.error("Error executing query", error);
            return;
        }
        console.log("Query results:", results.rows);
    });
};
exports.queryUser = queryUser;
const insertUser = (req, res) => {
    const { userid, username, userpassword, emailid, twitteruserid, dateofbirth, } = req.body;
    connectDB_1.itemsPool.query(`insert into userData values($1,$2,$3,$4,$5,$6)`, [userid, username, userpassword, emailid, twitteruserid, dateofbirth], (error, results) => {
        if (error) {
            console.error("Error executing query", error);
            res.status(400).json({ message: "error occured" });
            return;
        }
        console.log("inserted values");
        res.status(201).json({ message: "inserted values" });
    });
};
exports.insertUser = insertUser;
const deleteUser = (req, res) => {
    const userID = req.body.userid;
    connectDB_1.itemsPool.query(`delete from ${database_name} where userid=$1;`, ["4567"], (error, results) => {
        if (error) {
            console.error("Error executing query", error);
            res.status(400).json({ message: "error occured" });
            return;
        }
        console.log("deleted values");
        res.status(201).json({ message: `deleted values ${userID}` });
    });
};
exports.deleteUser = deleteUser;
