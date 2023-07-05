/** @format */
import * as Express from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../types";
import { itemsPool } from "../data/connectDB";
import { findUser, insertUser } from "./userController";
import { UserBearer } from "../types";
import { encode } from "../middleware/authmiddleware";
import * as bcrypt from "bcrypt";

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

export const signUp = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  const password = await hashPassword(req.body.userpassword)
    .then((value) => {
      console.log(value);
      return value;
    })
    .catch((error) => {
      throw new Error(error);
    });
  const data: User = {
    userid: req.body.userid,
    username: req.body.username,
    email: req.body.emailid,
    dob: new Date(req.body.dateofbirth),
    passwordhash: password,

    accesslevel: req.body.accesslevel,
  };
  if (data) {
    findUser(data.userid, data.email, (error, results, doesExist) => {
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

async function hashPassword(userPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(userPassword, salt);
  return pass;
}
