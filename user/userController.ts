/** @format */
import { itemsPool } from "../data/connectDB";
import { Request, Response } from "express";
import { User, UserBearer } from "../types";
require("dotenv").config();
const database_name = "userData";

// const createTable = () => {};

export const queryUser = (req: Request, res: Response) => {
  itemsPool.query(
    `SELECT * FROM ${database_name}`,
    (error: any, results: any) => {
      if (error) {
        res.status(200).json({ message: "error in credentials" });
        console.error("Error executing query", error);
        return;
      }

      console.log("Query results:", results.rows);
      res.status(400).send(results);
    }
  );
};

export const insertUser = (user: User): void => {
  const { userID, userName, email, DOB, passwordHash, AccessLevel } = user;
  itemsPool.query(
    `insert into userData values($1,$2,$3,$4,$5,$6)`,
    [userID, userName, passwordHash, email, DOB, AccessLevel],
    (error: any, results: any) => {
      if (error) {
        console.log("Error executing query", error);
        return;
      }
      console.log("inserted values");
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

export const findUser = (
  userID: string,
  emailid: string,
  callback: (error: any, results: any, doesExist: any) => void
): any => {
  itemsPool.query(
    `select * from ${database_name} where userid=$1 or emailid=$2;`,
    [userID, emailid],
    (error: any, results: any) => {
      if (error) {
        callback(error, null, null);
        return;
      } else if (results.rows.length > 0) {
        console.log("user already exist");
        console.log(results.rows);
        callback(null, results.rows[0], true);
        return;
      } else if (results.rows.length === 0) {
        console.log("user does not exist");
        callback(null, null, false);
        return;
      }
    }
  );
};
