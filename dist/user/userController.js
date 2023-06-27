"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.insertUser = exports.queryUser = void 0;
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
        console.log("Query results:", results.rows);
        res.status(400).send(results);
    });
};
exports.queryUser = queryUser;
const insertUser = (user) => {
    console.log(user);
    const { userID, userName, email, DOB, passwordHash, AccessLevel } = user;
    connectDB_1.itemsPool.query(`insert into userData values($1,$2,$3,$4,$5,$6)`, [userID, userName, email, DOB, passwordHash, AccessLevel], (error, results) => {
        if (error) {
            console.error("Error executing query", error);
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
