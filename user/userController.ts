/** @format */
import { itemsPool } from "../data/connectDB";
import { Request, Response } from "express";
require("dotenv").config();
const database_name = "userData";

const createTable = () => {};

export const queryUser = () => {
  itemsPool.query(
    `SELECT * FROM ${database_name}`,
    (error: any, results: any) => {
      if (error) {
        console.error("Error executing query", error);
        return;
      }
      console.log("Query results:", results.rows);
    }
  );
};

export const insertUser = (req: Request, res: Response) => {
  const {
    userid,
    username,
    userpassword,
    emailid,
    twitteruserid,
    dateofbirth,
  } = req.body;
  itemsPool.query(
    `insert into userData values($1,$2,$3,$4,$5,$6)`,
    [userid, username, userpassword, emailid, twitteruserid, dateofbirth],
    (error: any, results: any) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(400).json({ message: "error occured" });
        return;
      }

      console.log("inserted values");
      res.status(201).json({ message: "inserted values" });
    }
  );
};

export const deleteUser = (req: Request, res: Response) => {
  const userID = req.body.userid;
  itemsPool.query(
    `delete from ${database_name} where userid=$1;`,
    ["4567"],
    (error: any, results: any) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(400).json({ message: "error occured" });
        return;
      }

      console.log("deleted values");
      res.status(201).json({ message: `deleted values ${userID}` });
    }
  );
};
