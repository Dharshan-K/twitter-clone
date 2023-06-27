/** @format */
import * as Express from "express";
import { User } from "../types";
import { itemsPool } from "../data/connectDB";
import { insertUser } from "./userController";
import { UserBearer } from "../types";
import { encode } from "../middleware/authmiddleware";

// export const login = async (req: Express.Request, res: Express.Response): void => {
//   const { username, password } = req.body;
//   const token = req.
//   const bearerType: UserBearer = {
//     userID: userid,
//     email: emailid,
//     AccessLevel: accessLevel,
//   };

//   const authToken = await encode(bearerType);
//   req.headers.authorization = authToken;
// };

export const signUp = (req: Express.Request, res: Express.Response): void => {
  const data: User = {
    userID: req.body.userid,
    userName: req.body.username,
    passwordHash: req.body.userpassword,
    email: req.body.emailid,
    DOB: req.body.dateofbirth,
    AccessLevel: req.body.accesslevel,
  };
  console.log(data);

  if (data) {
    insertUser(data);
    console.log("user created");
    res.status(400).json({ message: "user created" });
    return;
  } else {
    throw new Error("enter all the credentials");
  }
};
