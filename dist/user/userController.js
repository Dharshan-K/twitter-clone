"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.deleteUser = exports.insertUser = exports.queryUser = void 0;
/** @format */
const connectDB_1 = require("../data/connectDB");
require("dotenv").config();
const database_name = "userData";
// const createTable = () => {};
const queryUser = (req, res) => {
    connectDB_1.itemsPool.query(`SELECT * FROM ${database_name}`, (error, results) => {
        if (error) {
            res.status(200).json({ message: "error in credentials" });
            console.error("Error executing query", error);
            return;
        }
        res.status(400).send(results);
    });
};
exports.queryUser = queryUser;
const insertUser = (user) => {
    const { userid, username, email, dob, passwordhash, accesslevel } = user;
    connectDB_1.itemsPool.query(`insert into userData values($1,$2,$3,$4,$5,$6)`, [userid, username, passwordhash, email, dob, accesslevel], (error, results) => {
        if (error) {
            console.log("Error executing query", error);
            return;
        }
        console.log("inserted values");
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
const findUser = (userID, emailid, callback) => {
    connectDB_1.itemsPool.query(`select * from userdata where userid=$1 or emailid=$2;`, [userID, emailid], (error, results) => {
        if (error) {
            callback(error, null, null);
            return;
        }
        else if (results.rows.length > 0) {
            console.log("user already exist");
            callback(null, results.rows[0], true);
            return;
        }
        else if (results.rows.length === 0) {
            console.log("user does not exist");
            callback(null, null, false);
            return;
        }
    });
};
exports.findUser = findUser;
