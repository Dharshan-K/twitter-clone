/** @format */
import * as Express from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../types";
import { itemsPool } from "../data/connectDB";
import { findUser, insertUser } from "./userController";
import { UserBearer } from "../types";
import { encode } from "../middleware/authmiddleware";

export const login = (req: Express.Request, res: Express.Response): void => {
  const { userid, emailid, userpassword } = req.body;
  if (userid! && emailid! && userpassword!) {
    console.log("loggin process started....");
    findUser(userid, emailid, (error, results, doesExist) => {
      console.log("results", results);
      if (error) {
        console.log(error);
        return;
      } else if (doesExist === false) {
        console.log("enter the correct credentials");
        res.status(201).json({ message: "try another username" });

        return;
      } else if (doesExist === true) {
        console.log("user exist");
        console.log(error, results, doesExist);
        const bearerType: UserBearer = {
          userID: results.userid,
          email: results.emailid,
          AccessLevel: results.accesslevel,
        };
        if (bearerType) {
          const token = encode(bearerType);
          console.log(token);
          req.headers.authorization = token;
          res.status(400).json({ message: "user logged in" });
          return;
        }

        return;
      } else {
        console.log("data not found");
        res.status(400).json({ message: "data not found" });
        return;
      }
    });
  }
};

export const signUp = (req: Express.Request, res: Express.Response): void => {
  const data: User = {
    userID: req.body.userid,
    userName: req.body.username,
    email: req.body.emailid,
    DOB: new Date(req.body.dateofbirth),
    passwordHash: req.body.userpassword,
    AccessLevel: req.body.accesslevel,
  };
  if (data) {
    findUser(data.userID, data.email, (error, results, doesExist) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: "error created" });
        return;
      } else if (doesExist === false) {
        insertUser(data);
        console.log("user created");
        res.status(400).json({ message: "user created" });
        return;
      } else if (doesExist === true) {
        console.log("user already exist");
        res.status(201).json({ message: "try another username" });
        return;
      }
    });
  } else {
    throw new Error("enter all the credentials");
  }
};
