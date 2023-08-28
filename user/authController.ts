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
  if ((userid! || emailid!) && userpassword) {
    findUser(userid, emailid, async (error, results, doesExist) => {
      if (error) {
        console.log(error);
        return;
      } else if (doesExist === false) {
        console.log("try another username");
        res.status(201).json({ message: "try another username" });
        return;
      } else if (doesExist === true) {
        if (
          results &&
          (await bcrypt.compare(userpassword, results.userpassword))
        ) {
          const bearerType: UserBearer = {
            userID: results.userid,
            email: results.emailid,
            AccessLevel: results.accesslevel,
          };
          if (bearerType) {
            const token = encode(bearerType);
            req.headers.authorization = token;
            res.status(200).json({
              userID: results.userid,
              userName: results.username,
              userEmail: results.emailid,
              token: token,
            });
            return;
          }
        }
        console.log("wrong Password");
        res.status(401).json({ message: "wrong Password" });
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
  const { userid, username, emailid, dateofbirth, userpassword, accesslevel } =
    req.body;
  if (
    !userid ||
    !username ||
    !emailid ||
    !dateofbirth ||
    !userpassword ||
    !accesslevel
  ) {
    res.status(400).json({ message: "user credentials missing" });
    return;
  }
  const password = await hashPassword(userpassword)
    .then((value) => {
      console.log(value);
      return value;
    })
    .catch((error) => {
      throw new Error(error);
    });
  const data: User = {
    userid: userid,
    username: username,
    email: emailid,
    dob: new Date(dateofbirth.startDate),
    passwordhash: password,
    accesslevel: accesslevel,
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
        res.status(200).json({ message: "user created" });
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
